package main

import (
	"fmt"
	"log"
	"net/http"

	"golangstore/handlers"
	"golangstore/utils"

	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func main() {
	db, err := utils.ConnectToPostgres()
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}

	r := gin.Default()

	// Add db object to context
	r.Use(func(c *gin.Context) {
		c.Set("db", db)
		c.Next()
	})

	r.POST("/admin", handlers.CreateAdminUser)

	port := ":8080"
	fmt.Printf("Server listening on port %s\n", port)
	err = http.ListenAndServe(port, r)
	if err != nil {
		fmt.Println(err)
	}
}
