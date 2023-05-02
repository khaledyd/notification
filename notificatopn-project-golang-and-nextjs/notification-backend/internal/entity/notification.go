package entity

import (
	"context"
	"time"
)

// Notification represents a notification.
type Notification struct {
	ID        int64     `json:"id"`
	Recipient string    `json:"recipient"`
	Message   string    `json:"message"`
	IsRead    bool      `json:"is_read"`
	Timestamp time.Time `json:"timestamp"`
}

// Repository  interface for notification repository.
type Repository interface {
	// GetByID returns a notification by ID.
	GetByID(ctx context.Context, id int64) (*Notification, error)
	// Save saves a notification.
	Save(ctx context.Context, notification *Notification) error
	// Delete deletes a notification by ID.
	Delete(ctx context.Context, id int64) error
	// ListByRecipient lists all notifications for a given recipient.
	ListByRecipient(ctx context.Context, recipient string) ([]*Notification, error)
	// StreamNotifications streams notifications in real-time.
	StreamNotifications(ctx context.Context, recipient string, notifications chan<- *Notification) error
	// StopStreaming stops the real-time notification streaming.
	StopStreaming(recipient string) error
}

// Service interface for notification service.
type Service interface {
	// GetByID returns a notification by ID.
	GetNotificationrByID(ctx context.Context, id int64) (*Notification, error)
	// Save saves a notification.
	SaveNotification(ctx context.Context, notification *Notification) error
	// Delete deletes a notification by ID.
	DeleteNotification(ctx context.Context, id int64) error
	// ListByRecipient lists all notifications for a given recipient.
	ListNotificationsByRecipient(ctx context.Context, recipient string) ([]*Notification, error)
	// StreamNotifications streams notifications in real-time.
	StreamNotificationsUsecase(ctx context.Context, recipient string) (<-chan *Notification, error)
	// StopStreaming stops the real-time notification streaming.
	StopStreaming(recipient string) error
}
