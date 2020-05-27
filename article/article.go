package article

import (
	"github.com/life-assistant-go/base"
)

// Article article object
type Article struct {
	base.Database
	base.File
	Title string `gorm:"size:10;not null;comment:'文章标题'" json:"title"`
	Tags  string `gorm:"size:30;not null;comment:'文章标签'" json:"tags"`
	Path  string `gorm:"size:100;unique;not null;comment:'文章路径'" json:"path"`
}

// TableName for article
func (Article) TableName() string {
	return "articles"
}
