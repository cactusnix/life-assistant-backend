package routers

import (
	"github.com/fund-go/handlers"
	"github.com/gin-gonic/gin"
)

// InitFundRouter 初始化fund
func InitFundRouter(router *gin.Engine) {
	r := router.Group("/fund")
	{
		r.GET("/getFund", handlers.GetFund)
		r.GET("/getFunds", handlers.GetFunds)
		r.POST("/addFund", handlers.AddFund)
	}
}
