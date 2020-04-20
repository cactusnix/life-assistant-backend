package fund

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/life-assistant-go/base"
	"github.com/life-assistant-go/utils"
)

// GetFund get fund
func GetFund(c *gin.Context) {
	var funds []Fund
	if id, err := strconv.ParseUint(c.Query("id"), 10, 64); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code": -1,
			"msg":  err.Error(),
		})
	} else {
		query := Fund{Model: base.Model{ID: uint(id)}}
		if err := utils.DB().Where(query).Find(&funds).Error; err != nil {
			c.JSON(http.StatusOK, gin.H{
				"code": 0,
				"msg":  err,
			})
		} else {
			c.JSON(http.StatusOK, gin.H{
				"code": 0,
				"data": funds[0],
			})
		}
	}
}

// GetFunds get fund list
func GetFunds(c *gin.Context) {
	var query Fund
	var funds []Fund
	if err := c.ShouldBind(&query); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code": -1,
			"msg":  err.Error(),
		})
		return
	}
	if err := utils.DB().Where(query).Find(&funds); err != nil {
		c.JSON(200, gin.H{
			"code": 1,
			"msg":  err,
		})
	} else {
		c.JSON(200, gin.H{
			"code": 0,
			"list": funds,
		})
	}
}

// AddFund add fund
func AddFund(c *gin.Context) {
	var fund Fund
	if err := c.ShouldBind(&fund); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code": -1,
			"msg":  err.Error(),
		})
		return
	}
	if err := utils.DB().Create(&fund).Error; err != nil {
		c.JSON(http.StatusOK, gin.H{
			"code": 1,
			"msg":  err,
		})
	} else {
		c.JSON(200, gin.H{
			"code": 0,
			"data": fund,
		})
	}
}

// AddBuyRecord handle add fund record
func AddBuyRecord(c *gin.Context) {
	var order Order
	if err := c.ShouldBind(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code": -1,
			"msg":  err.Error(),
		})
		return
	}
	if err := utils.DB().Create(&order).Error; err != nil {
		c.JSON(http.StatusOK, gin.H{
			"code": 1,
			"msg":  err,
		})
	} else {
		c.JSON(200, gin.H{
			"code": 0,
			"data": order,
		})
	}
}
