package utils

import (
	"fmt"

	"github.com/jinzhu/gorm"

	// mysql 驱动
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// DB 初始化数据库
func DB() *gorm.DB {
	v := Viper("db")
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
