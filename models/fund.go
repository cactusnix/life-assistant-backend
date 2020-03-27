package models

// Fund 基金记录对象
type Fund struct {
	Base
	Name                  string  `gorm:"not null;comment:'基金名称'" form:"name" json:"name" binding:"required"`
	Code                  string  `gorm:"size:6;not null;comment:'基金代码'" form:"code" json:"code" binding:"required"`
	HoldingDays           uint    `gorm:"default:0;not null;comment:'基金持有天数'" form:"holdingDays" json:"holdingDays"`
	Status                uint    `gorm:"default:0;not null;comment:'基金交易状态标志位/0-买入中 1-撤销中 2-确认完成 3-撤销成功 4-卖出中 5-到账成功'" form:"status" json:"status"`
	IsFinish              uint    `gorm:"default:0;not null;comment:'基金记录是否结束/0-进行 1-完成'" form:"isFinish" json:"isFinish"`
	PurchaseServiceCharge float64 `gorm:"type:decimal(5,4);default:0.0000;not null;comment:'基金购入手续费率'" form:"purchaseServiceCharge" json:"purchaseServiceCharge"`
	SellServiceCharge     float64 `gorm:"type:decimal(5,4);default:0.0000;not null;comment:'基金卖出手续费率'" form:"sellServiceCharge" json:"sellServiceCharge"`
	PurchaseServicePrice  float64 `gorm:"type:decimal(10,2);not null;comment:'基金购入手续费'" form:"purchaseServicePrice" json:"purchaseServicePrice" binding:"required"`
	SellServicePrice      float64 `gorm:"type:decimal(10,2);not null;comment:'基金卖出手续费'" form:"sellServicePrice" json:"sellServicePrice" binding:"required"`
	Amount                float64 `gorm:"type:decimal(10,2);not null;comment:'基金份额'" form:"amount" json:"amount" binding:"required"`
	PurchasePrice         float64 `gorm:"type:decimal(10,2);not null;comment:'基金购入成本'" form:"purchasePrice" json:"purchasePrice" binding:"required"`
	CostPrice             float64 `gorm:"type:decimal(10,4);not null;comment:'基金购入(卖出)单位成本价'" form:"costPrice" json:"costPrice" binding:"required"`
}
