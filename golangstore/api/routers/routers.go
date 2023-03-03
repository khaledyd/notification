package routers

import (
	"golangstore/handlers"

	"github.com/gin-gonic/gin"

	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func Routes() {

	r := gin.Default()
	r.Use(func(c *gin.Context) {
		c.Next()
	})

	r.POST("/admin", handlers.CreateAdminUser)
}
