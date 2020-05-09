package crawler

import (
	"strconv"
	"strings"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/gocolly/colly"
	"github.com/life-assistant-go/base"
	"github.com/life-assistant-go/fund"
	"github.com/life-assistant-go/utils"
)

// ForFund init
func ForFund() {
	log := utils.Logger()
	c := utils.Crawler()
	c.OnHTML("tr", func(e *colly.HTMLElement) {
		log.Info(e.Text)
	})
	c.Visit("http://fundf10.eastmoney.com/jjjz_000962.html")
}

// ForWorth init
func ForWorth(fundCode string) error {
	log := utils.Logger()
	var page base.Pagination
	page.PageNo = 1
	page.PageSize = 20
	page.Total = 0
	var worths []fund.Worth
	_, total, _ := requestWorth(fundCode, strconv.Itoa(page.PageNo), strconv.Itoa(page.PageSize))
	for ; len(worths) < total; page.PageNo++ {
		results, _, err := requestWorth(fundCode, strconv.Itoa(page.PageNo), strconv.Itoa(page.PageSize))
		if err != nil {
			return err
		}
		worths = append(worths, results...)
	}

	for i, v := range worths {
		log.Println("Review", i, v.Unit, v.Total, v.DailyGrowThRate, v.Date)
		db := utils.DB()
		if err := db.Create(&v).Error; err != nil {
			return err
		}
		defer db.Close()
	}

	return nil
}

func requestWorth(fundCode string, pageNo string, pageSize string) ([]fund.Worth, int, error) {
	var worths []fund.Worth
	url := "http://fund.eastmoney.com/f10/F10DataApi.aspx"

	res, err := utils.HTTPGet(url, map[string]string{
		"type": "lsjz",
		"code": fundCode,
		"page": pageNo,
		"per":  pageSize,
	})
	if err != nil {
		return nil, 0, err
	}
	defer res.Body.Close()

	// body, _ := ioutil.ReadAll(res.Body)
	// log.Printf("%s", body)
	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		return nil, 0, err
	}

	bodyStr := doc.Find("body").Text()
	startIndex := strings.Index(bodyStr, "records:")
	endIndex := strings.Index(bodyStr, ",pages")
	records, err := strconv.Atoi(bodyStr[startIndex+8 : endIndex])
	if err != nil {
		return nil, 0, err
	}

	doc.Find("tbody>tr").Each(func(i int, s *goquery.Selection) {
		var temp fund.Worth
		temp.Unit = s.Find("td:nth-child(2)").Text()
		temp.Total = s.Find("td:nth-child(3)").Text()
		temp.DailyGrowThRate = s.Find("td:nth-child(4)").Text()
		date, _ := time.Parse("2006-01-02 15:04:05", s.Find("td:nth-child(1)").Text()+" 15:00:00")
		temp.Date = date
		worths = append(worths, temp)
	})
	return worths, records, nil
}
