package handlers

import (
	"golangstore/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateAdminUser(c *gin.Context) {

	db := c.MustGet("db").(*gorm.DB)

	var admin models.Admin
	if err := c.BindJSON(&admin); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	if err := db.Create(&admin).Error; err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "user created"})

}
