package fund

import (
	"time"

	"github.com/life-assistant-go/base"
)

// Order fund record model
type Order struct {
	base.Model
	OrderNo     string    `gorm:"size:20;not null;comment:'订单编号'" form:"orderNo" json:"orderNo" binding:"required"`
	Code        string    `gorm:"size:6;not null;comment:'基金代码'" form:"code" json:"code" binding:"required"`
	HoldingDays int       `gorm:"default:0;not null;comment:'基金持有天数'" form:"holdingDays" json:"holdingDays"`
	Status      int       `gorm:"default:0;not null;comment:'基金交易状态标志位/0-买入中 1-撤销中 2-确认完成 3-撤销成功 4-卖出中 5-卖出成功'" form:"status" json:"status"`
	Amount      float64   `gorm:"type:decimal(10,4);not null;comment:'基金购入份额'" form:"amount" json:"amount"`
	UnitCost    float64   `gorm:"type:decimal(5,4);not null;comment:'基金购入成本单价'" form:"unitCost" json:"unitCost" binding:"required"`
	CostPrice   float64   `gorm:"type:decimal(10,2);not null;comment:'基金购入成本'" form:"costPrice" json:"costPrice" binding:"required"`
	OrderTime   time.Time `gorm:"not null;comment:'基金购买日期'" form:"orderTime" time_format:"2006-01-02 15:04:05" json:"orderTime" binding:"required"`
}

// TableName set the database table name
func (Order) TableName() string {
	return "fund_orders"
}
