package fundhandle

import (
	"net/http"

	"github.com/fund-go/models/fundmodel"
	"github.com/fund-go/services/fundservice"
	"github.com/gin-gonic/gin"
)

// AddBuyRecord handle add fund record
func AddBuyRecord(c *gin.Context) {
	var buy fundmodel.Buy
	if err := c.ShouldBind(&buy); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code": -1,
			"msg":  err.Error(),
		})
		return
	}
	if err := fundservice.AddBuyRecord(&buy); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"code": 1,
			"msg":  err,
		})
	} else {
		c.JSON(200, gin.H{
			"code": 0,
			"data": buy,
		})
	}
}
