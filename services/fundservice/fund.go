package fundservice

import (
	"github.com/fund-go/db"
	"github.com/fund-go/models/fundmodel"
)

// GetFunds err funds 获取查询结果集
func GetFunds(query fundmodel.Fund) (funds []fundmodel.Fund, err error) {
	return funds, db.InitDB().Where(query).Find(&funds).Error
}

// AddFund err 添加记录
func AddFund(fund *fundmodel.Fund) error {
	return db.InitDB().Create(&fund).Error
}
