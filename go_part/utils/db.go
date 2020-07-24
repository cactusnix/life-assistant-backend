package utils

import (
	"fmt"

	"github.com/jinzhu/gorm"

	// mysql 驱动
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// DB global db
var DB *gorm.DB

// DB 初始化数据库
func init() {
	host := Config.GetString("db.host")
	user := Config.GetString("db.user")
	password := Config.GetString("db.password")
	database := Config.GetString("db.database")
	// user:password@(localhost)/dbName?charset=utf8&parseTime=True&loc=Local
	url := user + ":" + password + "@(" + host + ")/" + database + "?charset=utf8&parseTime=True&loc=Local"
	// url := "root" + ":" + "cactusnix-D-1" + "@(" + "127.0.0.1" + ")/" + "local_test" + "?charset=utf8&parseTime=True&loc=Local"
	customDB, err := gorm.Open("mysql", url)
	if err != nil {
		panic(fmt.Errorf("Fatal error mysql: %s", err))
	}
	customDB.LogMode(true)
	DB = customDB
}
