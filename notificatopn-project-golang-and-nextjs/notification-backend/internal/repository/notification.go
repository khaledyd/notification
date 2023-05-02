package repository

import (
	"context"
	"fmt"
	"log"
	"notification/internal/entity"
	"sync"
	"time"

	"gorm.io/gorm"
)

// RepositoryImpl is the implementation of the repository interface.
type RepositoryImpl struct {
	DB                *gorm.DB
	mu                sync.RWMutex
	streamingChannels map[string]chan *entity.Notification
}

// NewRepository returns a new repository.
func NewRepository(db *gorm.DB) *RepositoryImpl {
	return &RepositoryImpl{
		DB:                db,
		streamingChannels: make(map[string]chan *entity.Notification),
	}
}

// GetByID returns a notification by ID.
func (r *RepositoryImpl) GetByID(ctx context.Context, id int64) (*entity.Notification, error) {
	var notification entity.Notification
	err := r.DB.WithContext(ctx).First(&notification, id).Error
	return &notification, err
}

// Save saves a notification.
func (r *RepositoryImpl) Save(ctx context.Context, notification *entity.Notification) error {
	err := r.DB.WithContext(ctx).Save(notification).Error
	if err != nil {
		return err
	}

	// Send the notification to the streaming goroutine
	r.mu.RLock()
	ch, ok := r.streamingChannels[notification.Recipient]
	r.mu.RUnlock()
	if ok {
		go func() {
			select {
			case ch <- notification:
				{
					log.Printf("sent notification to recipient %s\n", notification.Recipient)
				}
			default:
				log.Printf("streaming channel for recipient %s is full, dropping notification\n", notification.Recipient)
			}
		}()
	}

	return nil
}

// Delete deletes a notification by ID.
func (r *RepositoryImpl) Delete(ctx context.Context, id int64) error {
	return r.DB.WithContext(ctx).Delete(&entity.Notification{}, id).Error
}

// ListByRecipient lists all notifications for a given recipient.
func (r *RepositoryImpl) ListByRecipient(ctx context.Context, recipient string) ([]*entity.Notification, error) {
	var notifications []*entity.Notification
	err := r.DB.WithContext(ctx).Where("recipient = ?", recipient).Find(&notifications).Error
	return notifications, err
}

// StreamNotifications streams notifications in real-time.
func (r *RepositoryImpl) StreamNotifications(ctx context.Context, recipient string, notifications chan<- *entity.Notification) error {
	// Check if the recipient already has a streaming channel
	r.mu.Lock()
	ch, ok := r.streamingChannels[recipient]
	if !ok {
		// Create a channel for the recipient if it doesn't exist
		ch = make(chan *entity.Notification, 1000) // buffer size of 1000

		r.streamingChannels[recipient] = ch
	}
	r.mu.Unlock()

	// Stream notifications to the channel
	rows, err := r.DB.WithContext(ctx).
		Model(&entity.Notification{}).
		Where("recipient = ?", recipient).
		Order("timestamp DESC").
		Select("id, recipient, message, is_read, timestamp").
		Rows()
	if err != nil {
		return err
	}
	defer rows.Close()

	// Create a context with a timeout of 30 seconds
	ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
	defer cancel()

	for rows.Next() {
		var notification entity.Notification
		if err := r.DB.ScanRows(rows, &notification); err != nil {
			return err
		}

		// Check if the notification is for the correct recipient
		if notification.Recipient == recipient {
			select {
			case notifications <- &notification:
				// Notification sent successfully
			case <-ctx.Done():
				// Timeout occurred
				return ctx.Err()
			}
		} else {
			log.Printf("notification recipient %s does not match streaming recipient %s\n", notification.Recipient, recipient)
		}
	}

	return nil
}

// StopStreaming stops the real-time notification streaming.
func (r *RepositoryImpl) StopStreaming(recipient string) error {
	// Look up the channel associated with the recipient
	r.mu.Lock()
	ch, ok := r.streamingChannels[recipient]
	r.mu.Unlock()
	if !ok {
		return fmt.Errorf("no streaming channel found for recipient %s", recipient)
	}

	// Close the channel to stop the streaming
	close(ch)

	// Remove the channel from the map
	r.mu.Lock()
	delete(r.streamingChannels, recipient)
	r.mu.Unlock()

	return nil
}
