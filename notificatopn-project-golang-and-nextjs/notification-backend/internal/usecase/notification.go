package usecase

import (
	"context"
	"fmt"
	"notification/internal/entity"
)

// ServiceImpl is the implementation of the service interface.
type ServiceImpl struct {
	Repository entity.Repository
}

// NewService returns a new service.
func NewService(r entity.Repository) *ServiceImpl {
	return &ServiceImpl{Repository: r}
}

// GetUserByID returns a notification by ID.
func (s *ServiceImpl) GetNotificationrByID(ctx context.Context, id int64) (*entity.Notification, error) {
	return s.Repository.GetByID(ctx, id)
}

// SaveNotification saves a notification.
func (s *ServiceImpl) SaveNotification(ctx context.Context, notification *entity.Notification) error {
	if notification.Recipient == "" {
		return fmt.Errorf("recipient cannot be empty")
	}
	if notification.Message == "" {
		return fmt.Errorf("message cannot be empty")
	}
	// other validation checks here
	if err := s.Repository.Save(ctx, notification); err != nil {
		return fmt.Errorf("failed to save notification: %w", err)
	}
	return nil
}

// DeleteNotification deletes a notification by ID.
func (s *ServiceImpl) DeleteNotification(ctx context.Context, id int64) error {
	return s.Repository.Delete(ctx, id)
}

// ListNotificationsByRecipient lists all notifications for a given recipient.
func (s *ServiceImpl) ListNotificationsByRecipient(ctx context.Context, recipient string) ([]*entity.Notification, error) {
	return s.Repository.ListByRecipient(ctx, recipient)
}

// StreamNotifications streams notifications in real-time.
func (s *ServiceImpl) StreamNotificationsUsecase(ctx context.Context, recipient string) (<-chan *entity.Notification, error) {
	notifications := make(chan *entity.Notification)
	err := s.Repository.StreamNotifications(ctx, recipient, notifications)
	if err != nil {
		return nil, err
	}
	return notifications, nil
}

// StopStreaming stops the real-time notification streaming.
func (s *ServiceImpl) StopStreaming(recipient string) error {
	return s.Repository.StopStreaming(recipient)
}
