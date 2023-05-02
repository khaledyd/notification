package logger

import (
	"log"
	"os"
)

type StdLogger struct {
	Logger *log.Logger
}

func (l *StdLogger) Infof(format string, v ...interface{}) {
	l.Logger.Printf("[INFO] "+format, v...)
}

func (l *StdLogger) Errorf(format string, v ...interface{}) {
	l.Logger.Printf("[ERROR] "+format, v...)
}

func NewStdLogger() *StdLogger {
	file, err := os.OpenFile("server.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Fatal(err)
	}
	return &StdLogger{Logger: log.New(file, "", log.LstdFlags)}
}
