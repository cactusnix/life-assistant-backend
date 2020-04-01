package fundservice

import (
	"github.com/fund-go/db"
	"github.com/fund-go/models/fundmodel"
)

// AddBuyRecord add fund record
func AddBuyRecord(buy *fundmodel.Buy) error {
	return db.InitDB().Create(&buy).Error
}
