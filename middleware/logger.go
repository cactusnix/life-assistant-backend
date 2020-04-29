package middleware

import (
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

// Logger log middleware
func Logger() gin.HandlerFunc {
	logger := logrus.New()
	logger.Out = os.Stdout
	logger.SetFormatter(&logrus.TextFormatter{
		TimestampFormat: "2006-01-02 15:04:05",
		FullTimestamp:   true,
	})
	return func(c *gin.Context) {
		t := time.Now()
		c.Next()
		latency := time.Since(t)
		status := c.Writer.Status()
		method := c.Request.Method
		uri := c.Request.RequestURI
		logger.Infof(" %s | %s | %d | %v |", uri, method, status, latency)
	}
}
