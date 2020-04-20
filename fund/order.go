package fund

import "github.com/life-assistant-go/base"

// Order fund record model
type Order struct {
	base.Model
	OrderNumber           string  `gorm:"size:20;not null;comment:'订单编号'" form:"orderNumber" json:"orderNumber" binding:"required"`
	Code                  string  `gorm:"size:6;not null;comment:'基金代码'" form:"code" json:"code" binding:"required"`
	HoldingDays           uint    `gorm:"default:0;not null;comment:'基金持有天数'" form:"holdingDays" json:"holdingDays"`
	Status                uint    `gorm:"default:0;not null;comment:'基金交易状态标志位/0-买入中 1-撤销中 2-确认完成 3-撤销成功'" form:"status" json:"status"`
	PurchaseServiceCharge float64 `gorm:"type:decimal(5,4);default:0.0000;not null;comment:'基金购入手续费率'" form:"purchaseServiceCharge" json:"purchaseServiceCharge"`
	SellServiceCharge     float64 `gorm:"type:decimal(5,4);default:0.0000;not null;comment:'基金卖出手续费率'" form:"sellServiceCharge" json:"sellServiceCharge"`
	PurchaseServicePrice  float64 `gorm:"type:decimal(10,2);not null;comment:'基金购入手续费'" form:"purchaseServicePrice" json:"purchaseServicePrice" binding:"required"`
	SellServicePrice      float64 `gorm:"type:decimal(10,2);not null;comment:'基金卖出手续费'" form:"sellServicePrice" json:"sellServicePrice" binding:"required"`
	Amount                float64 `gorm:"type:decimal(10,2);not null;comment:'基金份额'" form:"amount" json:"amount" binding:"required"`
	PurchasePrice         float64 `gorm:"type:decimal(10,2);not null;comment:'基金购入成本'" form:"purchasePrice" json:"purchasePrice" binding:"required"`
	CostPrice             float64 `gorm:"type:decimal(10,4);not null;comment:'基金购入单位成本价'" form:"costPrice" json:"costPrice" binding:"required"`
}

// TableName set the database table name
func (Order) TableName() string {
	return "fund_orders"
}
