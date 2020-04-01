package main

import (
	"github.com/fund-go/db"
	"github.com/fund-go/routers"
)

func main() {
	initDB := db.InitDB()
	db.CreateDBTable(initDB)
	routers.CustomHTTP()
}
