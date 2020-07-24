package crawler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/life-assistant-go/base"
	"github.com/life-assistant-go/utils"
)

// CrawlWorth crawl worth by fund code
func CrawlWorth(c *gin.Context) {
	if code := c.Query("code"); code != "" {
		if err := ForWorth(code); err != nil {
			c.JSON(
				http.StatusOK,
				utils.GenerateRes("executeError", map[string]interface{}{
					"error": err.Error(),
				}),
			)
		} else {
			c.JSON(
				http.StatusOK,
				utils.GenerateRes("success", map[string]interface{}{
					"msg": base.CrawlSuccess,
				}),
			)
		}
	} else {
		c.JSON(
			http.StatusBadRequest,
			utils.GenerateRes("paramError", map[string]interface{}{
				"error": base.InvalidError,
			}),
		)
	}
}
