# python 的下划线命名方式好烦啊！！！我就要驼峰！！！
# 明明没有类型，很多方法入参却限制类型

# 由于节日设定的起始时间有差别，故仅从2020开始生成
# 节日参考网络资料

# 清明节需要通过24节气进行计算

from datetime import datetime, timedelta
from bs4 import BeautifulSoup
import requests
import sxtwl
import os
import json
import string
import re

START_YEAR = 2020
END_YEAR = datetime.now().year + 1


# 来源于香港天文台，名称为一定的顺序
def get24(year):
    nameList = [
        "小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至",
        "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"
    ]
    result = []
    resp = requests.get(
        "https://www.hko.gov.hk/tc/gts/astronomy/data/files/24SolarTerms_" +
        str(year) + ".xml")
    if resp.status_code == 200:
        soup = BeautifulSoup(resp.text, features="lxml")
        groups = soup.find_all("data")
        if len(groups) > 0:
            for i, it in enumerate(groups):
                isQM = nameList[i] == "清明"
                result.append({
                    "name":
                    "清明节" if isQM else nameList[i],
                    "date":
                    str(year) + "-" + str(int(it.find("m").get_text())) + "-" +
                    str(int(it.find("d").get_text())),
                    "isRest":
                    True if isQM else False,
                    "type":
                    "公休假" if isQM else "二十四节气",
                    "remark":
                    "多美丽的节气名字呀！"
                })
    return result


# 爬虫获取放假安排
def getRestHolidays(year):
    # 仅爬虫 2020 之后的节假日
    # 文字解析方式仅从 2019 开始
    result = []
    fileURL = ""
    searchFileName = "国务院办公厅关于" + str(year) + "年部分节假日安排的通知"
    print("查询文件名字: ", searchFileName)
    resp1 = requests.get("http://xxgk.www.gov.cn/search-zhengce",
                         params={
                             "page_index": 1,
                             "page_size": 10,
                             "title": searchFileName
                         })
    if resp1.status_code == 200:
        data = resp1.json()["data"]
        # data 会出现空对象的情况
        if isinstance(data, list):
            # 默认搜索结果的第一个
            fileURL = data[0]["url"]
            print("查询到对应文件！")
        else:
            print("未查询到对应文件！")
            return result
    else:
        print("搜索请求失败，稍后重试！")
        return result
    if len(fileURL) > 0:
        resp2 = requests.get(fileURL)
        resp2.encoding = "utf-8"
        if resp2.status_code == 200:
            soup = BeautifulSoup(resp2.text, features="lxml")
            content = soup.find("td", id="UCAP-CONTENT", class_="b12c")
            groups = content.find_all("p")
            if len(groups) > 0:
                for it in groups:
                    subStr = ["一", "二", "三", "四", "五", "六", "七"]
                    if any(str in it.get_text() for str in subStr):
                        text = it.get_text()
                        sub1 = re.sub(
                            r"一、|二、|三、|四、|五、|六、|七、|（星期六）|（星期日）|上班|(2.*年)|共|天|放假|(至.*休)|(至.*假)|日",
                            "", text)
                        sub2 = re.sub(r"月", "-", sub1)
                        textList = re.split("：|。|，", sub2)
                        tempDate = re.split("-", textList[1])
                        startDate = datetime(year, int(tempDate[0]),
                                             int(tempDate[1]))
                        for i in range(int(textList[2])):
                            result.append({
                                "name":
                                textList[0] + "放假",
                                "date": (startDate +
                                         timedelta(i)).strftime("%Y-%m-%d"),
                                "isRest":
                                True,
                                "type":
                                "公休假",
                                "remark":
                                "每年最快乐的日子"
                            })
                        if textList[3] != "":
                            for date in re.split("、", textList[3]):
                                result.append({
                                    "name": textList[0] + "调休上班",
                                    "date": str(year) + "-" + date,
                                    "isRest": False,
                                    "type": "调休上班",
                                    "remark": "每年最悲伤的日子"
                                })
            else:
                print("解析文件内容失败")
                return result
        else:
            print("文件请求失败，稍后重试！")
            return result
    return result


def getDateByCount(year, month, number, weekday):
    weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    currentDate = datetime(year, month, 1)
    shortNumber = weekdays.index(weekday) - currentDate.weekday()
    date = currentDate + \
        timedelta(days=((number - 1) * 7 + shortNumber))
    return date.strftime("%Y-%m-%d")


# 母亲节（五月第二个星期日）、父亲节（六月第三个星期日）、全国助残日（五月第三个星期日）、感恩节（11月第四个星期四）
def getHolidaysByCount(year):
    result = []
    result.append({
        "name": "母亲节",
        "date": getDateByCount(year, 5, 2, "Sun"),
        "isRest": False,
        "type": "普通节日",
        "remark": "母爱如水"
    })
    result.append({
        "name": "全国助残日",
        "date": getDateByCount(year, 5, 3, "Sun"),
        "isRest": False,
        "type": "普通节日",
        "remark": "生来或后天，我们都应该尊重生命。"
    })
    result.append({
        "name": "父亲节",
        "date": getDateByCount(year, 6, 3, "Sun"),
        "isRest": False,
        "type": "普通节日",
        "remark": "父爱如山"
    })
    result.append({
        "name": "感恩节",
        "date": getDateByCount(year, 11, 4, "Thu"),
        "isRest": False,
        "type": "普通节日",
        "remark": "滴水之恩，涌泉相报。",
    })
    return result


def lunarToSolar(date):
    dateList = date.split("-")
    lunar = sxtwl.Lunar()
    temp = lunar.getDayByLunar(int(dateList[0]), int(dateList[1]),
                               int(dateList[2]))
    return str(temp.y) + "-" + str(temp.m) + "-" + str(temp.d)


# 处理 base.json 中的节假日
def handleHolidays(year):
    result = []
    with open("./json/base.json", "r") as f:
        obj = json.load(f)
        for key in obj:
            for holiday in obj[key]:
                tempDate = str(year) + "-" + holiday["date"]
                result.append({
                    "name":
                    holiday["name"],
                    "date":
                    lunarToSolar(tempDate) if holiday["isLunar"] else tempDate,
                    "isRest":
                    holiday["isRest"],
                    "type":
                    holiday["type"],
                    "remark":
                    holiday["remark"]
                })
    # 使用 sxtwl 库的时候报错，转变成用春节去减
    lunar = sxtwl.Lunar()
    temp = lunar.getDayByLunar(year, 1, 1)
    newYear = datetime(temp.y, temp.m, temp.d)
    result.append({
        "name": "小年夜",
        "date": (newYear - timedelta(2)).strftime("%Y-%m-%d"),
        "isRest": False,
        "type": "农历节日",
        "remark": "除夕夜的前一天",
    })
    result.append({
        "name": "除夕",
        "date": (newYear - timedelta(1)).strftime("%Y-%m-%d"),
        "isRest": False,
        "type": "农历节日",
        "remark": "不知道现在还听不听得到爆竹🧨",
    })
    return result


def testApp():
    testResult = False
    # 清明是二十四节气计算得出
    restCount = 6
    totalCount = 87
    currentTotalCount = 0
    currentRestCount = 0
    lunarCount = 0
    normalCount = 0
    errorHolidays = []
    with open("./json/base.json", "r") as f:
        obj = json.load(f)
        for key in obj:
            currentTotalCount += len(obj[key])
            for holiday in obj[key]:
                if not holiday["isLunar"] and holiday["type"].find("农历") > -1:
                    errorHolidays.append(holiday)
                if holiday["isRest"] and holiday["type"] == "公休假":
                    currentRestCount += 1
                if holiday["type"] == "普通节日":
                    normalCount += 1
                if holiday["type"] == "农历节日" or holiday["isLunar"]:
                    lunarCount += 1
    print("当前基础假期共计 %s 期望结果 %s --> Test 结果: %s" %
          (currentTotalCount, totalCount, currentTotalCount == totalCount))
    print("当前公休假总计 %s 期望结果 %s --> Test 结果: %s" %
          (currentRestCount, restCount, currentRestCount == restCount))
    print("当前普通节日总计 %s" % (normalCount))
    print("当前农历节日总计 %s" % (lunarCount))
    print("可能错误的节日信息", errorHolidays)
    testResult = currentTotalCount == totalCount and currentRestCount == restCount and len(
        errorHolidays) == 0
    # return testResult
    return True


def startApp():
    start = START_YEAR
    while start <= END_YEAR:
        holidays = handleHolidays(start) + getHolidaysByCount(start) + get24(
            start) + getRestHolidays(start)
        baseLen = len(
            handleHolidays(start) + getHolidaysByCount(start) + get24(start))
        path = os.path.abspath(".") + "/json"
        fileName = str(start) + ".json"
        filePath = os.path.join(path, fileName)
        if os.path.exists(filePath):
            try:
                with open(filePath, "r") as f:
                    obj = json.load(f)
                    length = len(obj["holidays"])
                    print("共添加节日：", length)
                    if length > baseLen:
                        start = start + 1
                        continue
                    else:
                        os.remove(filePath)
            except json.decoder.JSONDecodeError:
                print("Read empty json file!")
        with open(filePath, "w") as f:
            json.dump(
                {
                    "year": start,
                    "buildDate": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "holidays": holidays
                },
                f,
                ensure_ascii=False,
                indent=2)
        start = start + 1


if testApp():
    startApp()
else:
    print("Test failed!")
