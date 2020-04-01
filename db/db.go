package db

import (
	"fmt"

	"github.com/fund-go/config"
	"github.com/fund-go/models/fundmodel"
	"github.com/jinzhu/gorm"

	// mysql 驱动
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// InitDB 初始化数据库
func InitDB() *gorm.DB {
	v := config.InitViper("db")
	host := v.GetString("host")
	user := v.GetString("user")
	password := v.GetString("password")
	database := v.GetString("database")
	// user:password@(localhost)/dbName?charset=utf8&parseTime=True&loc=Local
	url := user + ":" + password + "@(" + host + ")/" + database + "?charset=utf8&parseTime=True&loc=Local"
	customDB, err := gorm.Open("mysql", url)
	if err != nil {
		panic(fmt.Errorf("Fatal error mysql: %s", err))
	}
	customDB.LogMode(true)
	return customDB
}

// CreateDBTable create table
func CreateDBTable(customDB *gorm.DB) {
	if customDB.HasTable(&fundmodel.Fund{}) {
		customDB.AutoMigrate(&fundmodel.Fund{})
	} else {
		customDB.CreateTable(&fundmodel.Fund{})
	}
	if customDB.HasTable(&fundmodel.Buy{}) {
		customDB.AutoMigrate(&fundmodel.Buy{})
	} else {
		customDB.CreateTable(&fundmodel.Buy{})
	}
}
