package tag

import (
	"github.com/life-assistant-go/base"
)

// Tag table name
type Tag struct {
	base.Database
	Name string `gorm:"size:10;not null;comment:'标签名称'" form:"name" json:"name" binding:"required"`
	Type int    `gorm:"not null;comment:'标签类型/0-账单类型 1-支付类型 2-博客类型'" form:"type" json:"type" binding:"required"`
}

// TableName return table name
func (Tag) TableName() string {
	return "tags"
}
