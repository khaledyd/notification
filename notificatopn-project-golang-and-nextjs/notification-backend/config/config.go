package config

import (
	"github.com/spf13/viper"
)

type Config struct {
	DBHost     string
	DBPort     string
	DBUser     string
	DBPassword string
	DBName     string
	HTTPPort   string // Add this field

}

func LoadConfig() (*Config, error) {
	viper.SetConfigFile(".env")

	var config Config

	err := viper.ReadInConfig()

	if err != nil {
		return nil, err
	}

	config.DBHost = viper.GetString("DB_HOST")
	config.DBPort = viper.GetString("DB_PORT")
	config.DBUser = viper.GetString("DB_USER")
	config.DBPassword = viper.GetString("DB_PASSWORD")
	config.DBName = viper.GetString("DB_NAME")
	config.HTTPPort = viper.GetString("HTTP_PORT") //

	return &config, nil
}
