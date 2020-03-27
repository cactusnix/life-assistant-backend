package main

import (
	"github.com/fund-go/db"
	"github.com/fund-go/routers"
)

func main() {
	customerDb := db.InitDB()
	defer customerDb.Close()
	r := routers.InitRouter()
	r.Run()
}
