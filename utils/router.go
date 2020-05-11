package utils

import (
	"github.com/gin-gonic/gin"
	"github.com/life-assistant-go/middleware"
)

// Router global use
var Router *gin.Engine

func init() {
	r := gin.New()
	r.Use(middleware.Logger())
	Router = r
}
