package base

import "time"

// Database model base
type Database struct {
	ID        int        `gorm:"primary_key;not null;comment:'主键'" json:"id"`
	CreatedAt time.Time  `gorm:"not null;comment:'记录创建日期'" json:"createdAt"`
	UpdatedAt time.Time  `gorm:"not null;comment:'记录更新日期'" json:"updatedAt"`
	DeletedAt *time.Time `gorm:"comment:'记录删除日期'" sql:"index" json:"deletedAt"`
}

// File base
type File struct {
	Name     string    `gorm:"size:20;not null;comment:'文件名字'" json:"name"`
	Size     string    `gorm:"size:10;not null;comment:'文件大小'" json:"size"`
	Created  time.Time `gorm:"not null;comment:'文件创建时间'" json:"created"`
	Modified time.Time `gorm:"not null;comment:'文件修改时间'" json:"modified"`
}
