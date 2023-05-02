package http

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"notification/config"
	"notification/internal/delivery/http/handler"
	"notification/internal/delivery/http/router"
	"notification/internal/repository"
	"notification/internal/usecase"
	"notification/migrations"
	"notification/pkg/database"
	"notification/pkg/logger"
)

func StartHTTPServer() error {
	// Load configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		return fmt.Errorf("failed to load configuration: %v", err)
	}

	// Create database connection
	db, err := database.NewDatabase(cfg)
	if err != nil {
		return fmt.Errorf("failed to connect to database: %v", err)
	}
	// Migrate database
	err = migrations.CreateNotificationTable(db)
	if err != nil {
		return fmt.Errorf("failed to migrate database: %v", err)
	}

	// Create logger
	logr := logger.NewStdLogger()
	logr.Infof("Starting HTTP server...")

	// Create repositories
	notificationRepo := repository.NewRepository(db)

	// Create use cases
	notificationUC := usecase.NewService(notificationRepo)

	// Create handlers
	notificationHandler := handler.NewNotificationHandler(notificationUC)

	// Create router
	r := router.NewRouter(notificationHandler)

	// Create server
	server := &http.Server{
		Addr:           fmt.Sprintf(":%s", cfg.HTTPPort),
		Handler:        r,
		ReadTimeout:    5 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,     // 1 MB
		ErrorLog:       logr.Logger, // set error log to use your logger
	}
	// Set gin's error logger to use your logger
	logr.Infof("HTTP server created on port %s", cfg.HTTPPort)

	// Start server
	log.Printf("starting server on port %s", cfg.HTTPPort)
	return server.ListenAndServe()

}
