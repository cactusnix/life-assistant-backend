package crawler

import (
	"strconv"
	"strings"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/gocolly/colly"
	"github.com/jinzhu/gorm"
	"github.com/life-assistant-go/base"
	"github.com/life-assistant-go/fund"
	"github.com/life-assistant-go/utils"
	log "github.com/sirupsen/logrus"
)

// ForFund init
func ForFund() {
	c := utils.Crawler()
	c.OnHTML("tr", func(e *colly.HTMLElement) {
		log.Info(e.Text)
	})
	c.Visit("http://fundf10.eastmoney.com/jjjz_000962.html")
}

// ForWorth init
func ForWorth(fundCode string) error {
	var page base.Pagination
	page.PageNo = 1
	page.PageSize = 20
	page.Total = 0
	var worths []fund.Worth
	var count int
	var worth fund.Worth
	if err := utils.DB.Where("code = ?", fundCode).Find(&worth).Count(&count).Error; gorm.IsRecordNotFoundError(err) {
		count = 0
	} else if err != nil {
		return err
	}
	if count > 0 {
		oneHour, _ := time.ParseDuration("24h")
		startDate := worth.Date.Add(oneHour)
		for _, total, _ := requestWorth(fundCode, strconv.Itoa(page.PageNo), strconv.Itoa(page.PageSize), startDate.Format("2006-01-02")); len(worths)+count < total; page.PageNo++ {
			results, _, err := requestWorth(fundCode, strconv.Itoa(page.PageNo), strconv.Itoa(page.PageSize), startDate.Format("2006-01-02"))
			if err != nil {
				return err
			}
			worths = append(results, worths...)
		}
	} else {
		for _, total, _ := requestWorth(fundCode, strconv.Itoa(page.PageNo), strconv.Itoa(page.PageSize), ""); len(worths) < total; page.PageNo++ {
			results, _, err := requestWorth(fundCode, strconv.Itoa(page.PageNo), strconv.Itoa(page.PageSize), "")
			if err != nil {
				return err
			}
			worths = append(results, worths...)
		}
	}

	for i, v := range worths {
		log.Println("Review", i, v.Unit, v.Total, v.DailyGrowThRate, v.Date)
		if err := utils.DB.Create(&v).Error; err != nil {
			return err
		}
	}

	return nil
}

func requestWorth(fundCode string, pageNo string, pageSize string, startDate string) ([]fund.Worth, int, error) {
	var worths []fund.Worth
	url := "http://fund.eastmoney.com/f10/F10DataApi.aspx"

	res, err := utils.HTTPGet(url, map[string]string{
		"type":  "lsjz",
		"code":  fundCode,
		"page":  pageNo,
		"per":   pageSize,
		"sdate": startDate,
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
		temp := make([]fund.Worth, 1)
		temp[0].Unit, _ = strconv.ParseFloat(s.Find("td:nth-child(2)").Text(), 64)
		temp[0].Total, _ = strconv.ParseFloat(s.Find("td:nth-child(3)").Text(), 64)
		rateText := s.Find("td:nth-child(4)").Text()
		if strings.Contains(rateText, "%") {
			rate, _ := strconv.ParseFloat(rateText[0:len(rateText)-1], 64)
			temp[0].DailyGrowThRate = rate / 100
		} else {
			temp[0].DailyGrowThRate = 0.0000
		}
		date, _ := time.ParseInLocation("2006-01-02 15:04:05", s.Find("td:nth-child(1)").Text()+" 15:00:00", time.Local)
		temp[0].Date = date
		temp[0].Code = fundCode
		worths = append(temp, worths...)
	})
	return worths, records, nil
}
