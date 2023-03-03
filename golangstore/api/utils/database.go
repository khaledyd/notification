package utils

import (
	"fmt"

	"golangstore/models"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// ConnectToPostgres creates a new connection to the PostgreSQL database.
func ConnectToPostgres() (*gorm.DB, error) {
	// Load database configuration
	// ...

	// Connect to the PostgreSQL database
	db, err := gorm.Open("postgres", "postgres://root:cusbo@localhost:5432/golangstote?sslmode=disable")
	if err != nil {
		return nil, fmt.Errorf("failed to connect to PostgreSQL: %v", err)
	} else {
		fmt.Println("Database connected successfully.")
	}
	db.AutoMigrate(models.Admin{}, models.Admin{})
	// Configure the connection
	// ...

	return db, nil
}
