package fund

import (
	"github.com/gin-gonic/gin"
	"github.com/life-assistant-go/utils"
)

// CreateFund create fund
func CreateFund(c *gin.Context) {
	var fund Fund
	utils.CreateObj(c, &fund)
}

// DeleteFund delete
func DeleteFund(c *gin.Context) {
	var fund Fund
	utils.DeleteObj(c, &fund)
}

// UpdateFund update
func UpdateFund(c *gin.Context) {
	var fund Fund
	form := []string{
		"name",
		"code",
	}
	utils.UpdateObj(c, form, &fund)
}

// GetFund get fund
func GetFund(c *gin.Context) {
	var fund Fund
	utils.GetObj(c, &fund)
}

// GetFunds get fund list
func GetFunds(c *gin.Context) {
	var funds []Fund
	query := []string{
		"name",
		"code",
	}
	utils.GetObjs(c, query, &funds)
}

// CreateOrder create order record
func CreateOrder(c *gin.Context) {
	var order Order
	utils.CreateObj(c, &order)
}

// DeleteOrder delete order record
func DeleteOrder(c *gin.Context) {
	var order Order
	utils.DeleteObj(c, &order)
}

// UpdateOrder update order record
func UpdateOrder(c *gin.Context) {
	var order Order
	form := []string{
		"code",
		"status",
		"amount",
		"unitCost",
		"costPrice",
		"orderTime",
	}
	utils.UpdateObj(c, form, &order)
}

// GetOrder get order record
func GetOrder(c *gin.Context) {
	var order Order
	utils.GetObj(c, &order)
}

// GetOrders get order records
func GetOrders(c *gin.Context) {
	var orders []Order
	query := []string{
		"code",
		"status",
		"amount",
		"unitCost",
		"costPrice",
		"orderTime",
	}
	utils.GetObjs(c, query, &orders)
}
