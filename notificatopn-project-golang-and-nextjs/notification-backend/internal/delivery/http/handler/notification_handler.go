package handler

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"

	"notification/internal/entity"

	"github.com/gin-gonic/gin"
)

// NotificationHandler represents the HTTP handler for notification.
type NotificationHandler struct {
	notificationUsecase entity.Service
}

// NewNotificationHandler returns a new NotificationHandler.
func NewNotificationHandler(u entity.Service) *NotificationHandler {
	return &NotificationHandler{notificationUsecase: u}
}

// SaveNotification handles the request to save a new notification.
func (h *NotificationHandler) SaveNotification(c *gin.Context) {
	var notification entity.Notification
	if err := c.BindJSON(&notification); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.notificationUsecase.SaveNotification(c.Request.Context(), &notification); err != nil {
		statusCode := http.StatusInternalServerError
		if strings.Contains(err.Error(), "recipient cannot be empty") || strings.Contains(err.Error(), "message cannot be empty") {
			statusCode = http.StatusBadRequest
		}
		c.JSON(statusCode, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"notification": notification})
}

// GetNotificationByID handles the request to get a notification by ID.
func (h *NotificationHandler) GetNotificationByID(c *gin.Context) {

	// Get the ID from the URL.
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Get the notification from the usecase.
	notification, err := h.notificationUsecase.GetNotificationrByID(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"notification": notification})
}

// DeleteNotification handles the request to delete a notification by ID.

func (h *NotificationHandler) DeleteNotification(c *gin.Context) {

	// Get the ID from the URL.
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Delete the notification.

	if err := h.notificationUsecase.DeleteNotification(c.Request.Context(), id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusNoContent, nil)
}

// ListNotificationsByRecipient handles the request to list all notifications for a given recipient.
func (h *NotificationHandler) ListNotificationsByRecipient(c *gin.Context) {

	// Get the recipient from the URL.
	recipient := c.Param("recipient")

	// Get the notifications from the usecase.
	notifications, err := h.notificationUsecase.ListNotificationsByRecipient(c.Request.Context(), recipient)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"notifications": notifications})
}

// StreamNotifications handles the request to stream notifications in real-time.
func (h *NotificationHandler) StreamNotificationshandler(c *gin.Context) {
	// Get the recipient from the URL.
	recipient := c.Param("recipient")

	// Set up the server-sent event stream.
	responseWriter := c.Writer
	responseWriter.Header().Set("Content-Type", "text/event-stream")
	responseWriter.Header().Set("Cache-Control", "no-cache")
	responseWriter.Header().Set("Connection", "keep-alive")
	//responseWriter.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")

	// Start streaming the notifications.
	notifications, err := h.notificationUsecase.StreamNotificationsUsecase(c.Request.Context(), recipient)
	if err != nil {
		log.Printf("failed to stream notifications for recipient %s: %v", recipient, err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Loop through the notifications and write them to the response.
	for notification := range notifications {
		data, err := json.Marshal(notification)
		if err != nil {
			// Log the error but don't stop the streaming.
			log.Printf("failed to marshal notification %v: %v", notification, err)
			continue
		}

		fmt.Fprintf(responseWriter, "data: %s\n\n", string(data))
		responseWriter.Flush()
		log.Printf("sent event to client: %s\n", string(data)) // add this line to log the payload
	}

	// When the loop ends, the channel has been closed, which means that the
	// streaming has stopped.
	log.Printf("streaming notifications for recipient %s stopped", recipient)
}

// StopStreamNotifications handles the request to stop streaming notifications in real-time.
func (h *NotificationHandler) StopStreamNotifications(c *gin.Context) {
	// Get the recipient from the URL.
	recipient := c.Param("recipient")

	// Stop streaming the notifications.
	err := h.notificationUsecase.StopStreaming(recipient)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Streaming stopped successfully"})
}
