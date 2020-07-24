package utils

import "github.com/gocolly/colly"

// Crawler obj
func Crawler() *colly.Collector {
	c := colly.NewCollector()
	c.UserAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36"
	c.DetectCharset = true
	return c
}
