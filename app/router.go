package app

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/life-assistant-go/fund"
	"github.com/life-assistant-go/middleware"
	"github.com/life-assistant-go/utils"
)

// Router init router
func Router() {
	r := gin.New()
	r.Use(middleware.Logger())
	v := utils.Viper("server")
	port := ":" + v.GetString("port")
	r1 := r.Group("/fund")
	{
		r1.POST("/createFund", fund.CreateFund)
		r1.DELETE("/deleteFund", fund.DeleteFund)
		r1.PATCH("/updateFund", fund.UpdateFund)
		r1.GET("/getFund", fund.GetFund)
		r1.GET("/getFunds", fund.GetFunds)
	}
	s := &http.Server{
		Addr:           port,
		Handler:        r,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	s.ListenAndServe()
}
