package app

import (
	"github.com/life-assistant-go/article"
	"github.com/life-assistant-go/fund"
	"github.com/life-assistant-go/tag"
	"github.com/life-assistant-go/utils"
)

// DBTable create table
func DBTable() {
	// fund table
	if utils.DB.HasTable(&fund.Fund{}) {
		utils.DB.AutoMigrate(&fund.Fund{})
	} else {
		utils.DB.CreateTable(&fund.Fund{})
	}

	// order table
	if utils.DB.HasTable(&fund.Order{}) {
		utils.DB.AutoMigrate(&fund.Order{})
	} else {
		utils.DB.CreateTable(&fund.Order{})
	}

	// worth table
	if utils.DB.HasTable(&fund.Worth{}) {
		utils.DB.AutoMigrate(&fund.Worth{})
	} else {
		utils.DB.CreateTable(&fund.Worth{})
	}

	// tag table
	if utils.DB.HasTable(&tag.Tag{}) {
		utils.DB.AutoMigrate(&tag.Tag{})
	} else {
		utils.DB.CreateTable(&tag.Tag{})
	}

	// article table
	if utils.DB.HasTable(&article.Article{}) {
		utils.DB.AutoMigrate(&article.Article{})
	} else {
		utils.DB.CreateTable(&article.Article{})
	}
}
