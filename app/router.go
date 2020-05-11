package app

import (
	"net/http"
	"time"

	"github.com/life-assistant-go/crawler"
	"github.com/life-assistant-go/fund"
	"github.com/life-assistant-go/utils"
)

// Router init router
func Router() {
	port := ":" + utils.Config.GetString("server.port")
	r1 := utils.Router.Group("/fund")
	{
		r1.POST("/createFund", fund.CreateFund)
		r1.DELETE("/deleteFund", fund.DeleteFund)
		r1.PATCH("/updateFund", fund.UpdateFund)
		r1.GET("/getFund", fund.GetFund)
		r1.GET("/getFunds", fund.GetFunds)
		r1.POST("/crawlWorth", crawler.CrawlWorth)
	}
	s := &http.Server{
		Addr:           port,
		Handler:        utils.Router,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	s.ListenAndServe()
}
