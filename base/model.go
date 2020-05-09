package base

import "time"

// Model model base
type Model struct {
	ID        int       `gorm:"primary_key;not null;comment:'主键'" json:"id"`
	CreatedAt time.Time  `gorm:"not null;comment:'记录创建日期'" json:"createdAt"`
	UpdatedAt time.Time  `gorm:"not null;comment:'记录更新日期'" json:"updatedAt"`
	DeletedAt *time.Time `gorm:"comment:'记录删除日期'" sql:"index" json:"deletedAt"`
}
