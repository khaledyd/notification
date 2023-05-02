package migrations

import (
	"notification/internal/entity"

	"gorm.io/gorm"
)

func CreateNotificationTable(db *gorm.DB) error {
	err := db.AutoMigrate(&entity.Notification{})
	if err != nil {
		return err
	}
	return nil
}
