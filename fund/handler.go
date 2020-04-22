package fund

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/life-assistant-go/base"
	"github.com/life-assistant-go/utils"
)

// GetFund get fund
func GetFund(c *gin.Context) {
	var fund Fund
	if id, err := strconv.ParseUint(c.Query("id"), 10, 64); err != nil {
		c.JSON(
			http.StatusBadRequest,
			base.GenerateRes("paramError", map[string]interface{}{"error": err.Error()}),
		)
	} else {
		query := Fund{Model: base.Model{ID: uint(id)}}
		if err := utils.DB().Where(query).First(&fund).Error; err != nil {
			c.JSON(
				http.StatusInternalServerError,
				base.GenerateRes("sqlError", map[string]interface{}{"error": err.Error()}),
			)
		} else {
			c.JSON(
				http.StatusOK,
				base.GenerateRes("success", map[string]interface{}{"data": fund}),
			)
		}
	}
}

// GetFunds get fund list
func GetFunds(c *gin.Context) {
	var query Fund
	var funds []Fund
	query.Name = c.Query("name")
	query.Code = c.Query("code")
	fmt.Println(query)
	if err := utils.DB().Where(query).Find(&funds).Error; err != nil {
		c.JSON(
			http.StatusOK,
			base.GenerateRes("sqlError", map[string]interface{}{"error": err.Error()}),
		)
	} else {
		c.JSON(
			http.StatusOK,
			base.GenerateRes("success", map[string]interface{}{"list": funds}),
		)
	}
}

// AddFund add fund
func AddFund(c *gin.Context) {
	var fund Fund
	if err := c.ShouldBind(&fund); err != nil {
		c.JSON(
			http.StatusBadRequest,
			base.GenerateRes("paramError", map[string]interface{}{"error": err.Error()}),
		)
	} else {
		if err := utils.DB().Create(&fund).Error; err != nil {
			c.JSON(
				http.StatusBadRequest,
				base.GenerateRes("paramError", map[string]interface{}{"error": err.Error()}),
			)
		} else {
			c.JSON(
				http.StatusOK,
				base.GenerateRes("success", map[string]interface{}{"data": fund}),
			)
		}
	}
}
