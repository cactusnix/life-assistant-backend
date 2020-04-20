package app

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/life-assistant-go/fund"
	"github.com/life-assistant-go/utils"
)

// Router init router
func Router() {
	r := gin.Default()
	v := utils.Viper("server")
	port := ":" + v.GetString("port")
	r1 := r.Group("/fund")
	{
		r1.GET("/getFund", fund.GetFund)
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
