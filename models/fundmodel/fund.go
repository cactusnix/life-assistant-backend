package fundmodel

import (
	"github.com/fund-go/models"
)

// Fund 基金记录对象
type Fund struct {
	models.Base
	Name string `gorm:"not null;comment:'基金名称'" form:"name" json:"name" binding:"required"`
	Code string `gorm:"size:6;unique;not null;comment:'基金代码'" form:"code" json:"code" binding:"required"`
}

// TableName set the database table name
func (Fund) TableName() string {
	return "funds"
}
