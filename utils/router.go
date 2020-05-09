package utils

import (
	"github.com/gin-gonic/gin"
	"github.com/life-assistant-go/middleware"
)

// Router init
func Router() *gin.Engine {
	r := gin.New()
	r.Use(middleware.Logger())
	return r
}
