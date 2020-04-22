package utils

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// AddObj get obj may be
func AddObj(c *gin.Context, query interface{}) {
	var result []interface{}
	if err := c.ShouldBind(&query); err != nil {
		c.JSON(
			http.StatusBadRequest,
			GenerateRes("paramError", map[string]interface{}{"error": err.Error()}),
		)
		return
	}
	if err := DB().Where(query).Find(&result).Error; err != nil {
		c.JSON(
			http.StatusBadRequest,
			GenerateRes("sqlError", map[string]interface{}{"error": err.Error()}),
		)
	} else {
		c.JSON(
			http.StatusOK,
			GenerateRes("success", map[string]interface{}{"list": result}),
		)
	}
}
