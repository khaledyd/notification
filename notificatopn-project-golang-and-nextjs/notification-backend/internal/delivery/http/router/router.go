package router

import (
	"notification/internal/delivery/http/handler"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// NewRouter returns a new router with all routes defined.
func NewRouter(notificationHandler *handler.NotificationHandler) *gin.Engine {
	r := gin.Default()

	// Add CORS middleware
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"} // replace with your frontend app URL
	r.Use(cors.New(config))

	// Define routes
	r.GET("/notifications/:id", notificationHandler.GetNotificationByID)
	r.POST("/notifications", notificationHandler.SaveNotification)
	r.DELETE("/notifications/:id", notificationHandler.DeleteNotification)
	r.GET("/notifications/recipient/:recipient", notificationHandler.ListNotificationsByRecipient)
	r.GET("/notifications/recipient/:recipient/stream", notificationHandler.StreamNotificationshandler)
	r.DELETE("/notifications/recipient/:recipient/stream", notificationHandler.StopStreamNotifications)

	return r
}
