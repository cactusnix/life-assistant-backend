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
	r1 := utils.Router.Group("/v1/funds")
	{
		r1.POST("/", fund.CreateFund)
		r1.DELETE("/:id", fund.DeleteFund)
		r1.PATCH("/:id", fund.UpdateFund)
		r1.GET("/:id", fund.GetFund)
		r1.GET("/", fund.GetFunds)
		r1.POST("/crawlWorth", crawler.CrawlWorth)
	}
	r2 := utils.Router.Group("/v1/orders")
	{
		r2.POST("/", fund.CreateOrder)
		r2.DELETE("/:id", fund.DeleteOrder)
		r2.PATCH("/:id", fund.UpdateOrder)
		r2.GET("/:id", fund.GetOrder)
		r2.GET("/", fund.GetOrders)
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
