package article

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/life-assistant-go/base"
	"github.com/life-assistant-go/utils"
)

// InitArticleDir init all articles
func InitArticleDir(c *gin.Context) {
	if c.PostForm("path") != "" {
		results, err := utils.GetFilesInfo(c.PostForm("path"))
		if err != nil {
			c.JSON(
				http.StatusBadRequest,
				utils.GenerateRes("executeError", map[string]interface{}{"error": err.Error()}),
			)
		}
		for _, v := range results {
			if err := utils.DB.Create(&Article{File: v, Title: "", Tags: ""}).Error; err != nil {
				c.JSON(
					http.StatusBadRequest,
					utils.GenerateRes("sqlError", map[string]interface{}{"error": err.Error()}),
				)
				return
			}
		}
		c.JSON(
			http.StatusOK,
			utils.GenerateRes("success", map[string]interface{}{
				"msg": base.ArticleDirSuccess,
			}),
		)
	} else {
		c.JSON(
			http.StatusBadRequest,
			utils.GenerateRes("paramError", map[string]interface{}{"error": base.InvalidError}),
		)
	}
}
