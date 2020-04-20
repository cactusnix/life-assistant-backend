package app

import (
	"github.com/life-assistant-go/fund"
	"github.com/life-assistant-go/utils"
)

// DBTable create table
func DBTable() {
	db := utils.DB()
	if db.HasTable(&fund.Fund{}) {
		db.AutoMigrate(&fund.Fund{})
	} else {
		db.CreateTable(&fund.Fund{})
	}
	if db.HasTable(&fund.Order{}) {
		db.AutoMigrate(&fund.Order{})
	} else {
		db.CreateTable(&fund.Order{})
	}
}
