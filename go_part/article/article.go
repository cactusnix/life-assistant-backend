package article

import (
	"errors"

	"github.com/life-assistant-go/base"
	"github.com/life-assistant-go/utils"
)

// Article article object
type Article struct {
	base.Database
	base.File
	Title string `gorm:"size:10;not null;comment:'文章标题'" json:"title"`
	Tags  string `gorm:"size:30;not null;comment:'文章标签'" json:"tags"`
}

// TableName for article
func (Article) TableName() string {
	return "articles"
}

// BeforeSave hook
func (a *Article) BeforeSave() error {
	if utils.SetEmptyStringNil(*a) {
		return errors.New("invalid error")
	}
	return nil
}
