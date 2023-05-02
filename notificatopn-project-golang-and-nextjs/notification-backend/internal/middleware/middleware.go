package middleware

import (
	"notification/pkg/logger"

	"github.com/gin-gonic/gin"
)

func LoggerMiddleware(logger *logger.StdLogger) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Log request
		logger.Infof("Started %s %s", c.Request.Method, c.Request.URL.Path)

		// Process request
		c.Next()

		// Log errors
		errors := c.Errors.ByType(gin.ErrorTypeAny)
		if len(errors) > 0 {
			for _, err := range errors {
				logger.Errorf("Error occurred: %s", err.Error())
			}
		}

		// Log response
		logger.Infof("Completed %s %s %d", c.Request.Method, c.Request.URL.Path, c.Writer.Status())
	}
}
