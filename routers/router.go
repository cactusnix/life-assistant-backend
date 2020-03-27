package routers

import "github.com/gin-gonic/gin"

// InitRouter 初始化路由
func InitRouter() *gin.Engine {
	r := gin.Default()
	InitFundRouter(r)
	return r
}
