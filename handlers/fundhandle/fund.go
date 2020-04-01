package fundhandle

import (
	"net/http"
	"strconv"

	"github.com/fund-go/models"
	"github.com/fund-go/models/fundmodel"
	"github.com/fund-go/services/fundservice"
	"github.com/gin-gonic/gin"
)

// GetFund get fund
func GetFund(c *gin.Context) {
	if id, err := strconv.ParseUint(c.Query("id"), 10, 64); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code": -1,
			"msg":  err.Error(),
		})
	} else {
		query := fundmodel.Fund{Base: models.Base{ID: uint(id)}}
		if funds, err := fundservice.GetFunds(query); err != nil {
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
	var query fundmodel.Fund
	if err := c.ShouldBind(&query); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code": -1,
			"msg":  err.Error(),
		})
		return
	}
	if funds, err := fundservice.GetFunds(query); err != nil {
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
	var fund fundmodel.Fund
	if err := c.ShouldBind(&fund); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code": -1,
			"msg":  err.Error(),
		})
		return
	}
	if err := fundservice.AddFund(&fund); err != nil {
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
