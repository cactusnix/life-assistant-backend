package bill

import (
	"github.com/life-assistant-go/base"
)

// Bill table struct
type Bill struct {
	base.Database
	billNo string
}

// TableName set the database table name
func (Bill) TableName() string {
	return "bills"
}