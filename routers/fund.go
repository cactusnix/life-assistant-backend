package routers

import (
	"github.com/fund-go/handlers/fundhandle"
	"github.com/gin-gonic/gin"
)

// InitFundRouter 初始化fund
func InitFundRouter(router *gin.Engine) {
	r := router.Group("/fund")
	{
		r.GET("/getFund", fundhandle.GetFund)
		r.GET("/getFunds", fundhandle.GetFunds)
		r.POST("/addFund", fundhandle.AddFund)
		r.POST("/addBuyRecord", fundhandle.AddBuyRecord)
	}
}
