package fund

import (
	"time"

	"github.com/life-assistant-go/base"
)

// Worth 基金记录对象
type Worth struct {
	base.Model
	Unit            string    `gorm:"not null;comment:'单位净值'" json:"unit"`
	Total           string    `gorm:"default:'0.00%';not null;comment:'累计净值'" json:"total"`
	DailyGrowThRate string    `gorm:"not null;comment:'日增长率'" json:"dailyGrowthRate"`
	Date            time.Time `gorm:"not null;comment:'净值日志'" json:"date"`
	Code            string    `gorm:"size:6;not null;comment:'基金代码'" json:"code"`
}

// TableName set the database table name
func (Worth) TableName() string {
	return "fund_worths"
}
