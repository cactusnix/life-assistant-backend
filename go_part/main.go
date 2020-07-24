package main

import (
	"github.com/life-assistant-go/utils"
)

func main() {
	type YY struct {
		Path string
	}
	type TestGorm struct {
		Title string `gorm:"not null;"`
		Tag   string
		YY
	}
	var test = TestGorm{
		Title: "",
		Tag:   "333",
	}
	utils.ValidateStruct(test)
	utils.DB.Create(&test)
	// app.DBTable()
	// app.Router()
}
