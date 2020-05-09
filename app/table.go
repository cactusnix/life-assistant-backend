package app

import (
	"github.com/life-assistant-go/fund"
	"github.com/life-assistant-go/utils"
)

// DBTable create table
func DBTable() {
	db := utils.DB()
	// fund table
	if db.HasTable(&fund.Fund{}) {
		db.AutoMigrate(&fund.Fund{})
	} else {
		db.CreateTable(&fund.Fund{})
	}

	// order table
	if db.HasTable(&fund.Order{}) {
		db.AutoMigrate(&fund.Order{})
	} else {
		db.CreateTable(&fund.Order{})
	}

	// worth table
	if db.HasTable(&fund.Worth{}) {
		db.AutoMigrate(&fund.Worth{})
	} else {
		db.CreateTable(&fund.Worth{})
	}
}
