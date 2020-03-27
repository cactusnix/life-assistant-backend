package db

import (
	"fmt"

	"github.com/fund-go/config"
	"github.com/fund-go/models"
	"github.com/jinzhu/gorm"

	// mysql 驱动
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// InitDB 初始化数据库
func InitDB() *gorm.DB {
	v := config.InitViper()
	host := v.GetString("host")
	user := v.GetString("user")
	password := v.GetString("password")
	database := v.GetString("database")
	// user:password@(localhost)/dbname?charset=utf8&parseTime=True&loc=Local
	url := user + ":" + password + "@(" + host + ")/" + database + "?charset=utf8&parseTime=True&loc=Local"
	customDB, err := gorm.Open("mysql", url)
	if err != nil {
		panic(fmt.Errorf("Fatal error mysql: %s", err))
	}
	customDB.LogMode(true)
	if customDB.HasTable(&models.Fund{}) {
		customDB.AutoMigrate(&models.Fund{})
	} else {
		customDB.CreateTable(&models.Fund{})
	}
	return customDB
}
