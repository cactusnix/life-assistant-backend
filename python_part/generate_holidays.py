# holiday 数据结构设计
# {
#     "name": "假期名字",
#     "date": "假期日期", # 2020-03-09 or 2020-03-09/2020-03-10
#     "isRest": True, # True 休息 False 不休息
#     "remark": "节日备注", # 法定节日 / 传统节日 / 纪念日
# }

# 由于节日设定的起始时间有差别，故仅从2020开始生成
# 节日参考百度百科

from datetime import datetime, timedelta
from bs4 import BeautifulSoup
import requests
import sxtwl
import os
import json
import string


def get_date_by_number(year, month, day, number, weekday):
    weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    current_date = datetime(year, month, day)
    short_number = weekdays.index(weekday) - current_date.weekday()
    result_date = current_date + \
        timedelta(days=((number - 1) * 7 + short_number))
    return result_date.strftime("%Y-%-m-%d")


def generate_base_holidays(year):
    year_str = str(year)
    lunar = sxtwl.Lunar()
    chinese_new_year = lunar.getDayByLunar(year, 1, 1, False)
    dragon_boat_festival = lunar.getDayByLunar(year, 5, 5, False)
    mid_autumn_festival = lunar.getDayByLunar(year, 8, 15, False)
    old_age = lunar.getDayByLunar(year, 9, 9, False)
    lantern_festival = lunar.getDayByLunar(year, 1, 15, False)
    dragon_head_up = lunar.getDayByLunar(year, 2, 2, False)
    qixi_festival = lunar.getDayByLunar(year, 7, 7, False)
    ghost_festival = lunar.getDayByLunar(year, 7, 15, False)
    double_ninth_festival = lunar.getDayByLunar(year, 9, 9, False)
    winter_clothes_festival = lunar.getDayByLunar(year, 10, 1, False)
    next_metaverse_festival = lunar.getDayByLunar(year, 10, 15, False)
    laba_festival = lunar.getDayByLunar(year, 12, 8, False)
    # 加减推算
    chinese_new_year_date = datetime(
        year, chinese_new_year.m, chinese_new_year.d)
    little_night_festival = chinese_new_year_date - timedelta(days=2)
    new_year_eve = chinese_new_year_date - timedelta(days=1)
    # 法定节日
    holidays = [
        {
            "name": "元旦",
            "date": year_str + "-" + "1-1",
            "isRest": True,
            "remark": "法定节日"
        },
        {
            "name": "中国人民警察节",
            "date": year_str + "-" + "1-10",
            "isRest": False,
            "remark": "法定节日"
        },
        {
            "name": "春节",
            "date": year_str + "-" + str(chinese_new_year.m) + "-" + str(chinese_new_year.d),
            "isRest": True,
            "remark": "法定节日"
        },
        {
            "name": "妇女节",
            "date": year_str + "-" + "3-8",
            "isRest": False,
            "remark": "法定节日"
        },
        {
            "name": "植树节",
            "date": year_str + "-" + "3-12",
            "isRest": False,
            "remark": "法定节日"
        },
        {
            "name": "清明节",
            "date": year_str + "-" + "4-5",
            "isRest": True,
            "remark": "法定节日"
        },
        {
            "name": "劳动节",
            "date": year_str + "-" + "5-1",
            "isRest": True,
            "remark": "法定节日"
        },
        {
            "name": "青年节",
            "date": year_str + "-" + "5-4",
            "isRest": False,
            "remark": "法定节日"
        },
        {
            "name": "护士节",
            "date": year_str + "-" + "5-12",
            "isRest": False,
            "remark": "法定节日"
        },
        {
            "name": "全国科技工作者日",
            "date": year_str + "-" + "5-30",
            "isRest": False,
            "remark": "法定节日"
        },
        {
            "name": "儿童节",
            "date": year_str + "-" + "6-1",
            "isRest": False,
            "remark": "法定节日"
        },
        {
            "name": "端午节",
            "date": year_str + "-" + str(dragon_boat_festival.m) + "-" + str(dragon_boat_festival.d),
            "isRest": True,
            "remark": "法定节日"
        },
        {
            "name": "建军节",
            "date": year_str + "-" + "8-1",
            "isRest": False,
            "remark": "法定节日"
        },
        {
            "name": "教师节",
            "date": year_str + "-" + "9-10",
            "isRest": False,
            "remark": "法定节日"
        },
        {
            "name": "中秋节",
            "date": year_str + "-" + str(mid_autumn_festival.m) + "-" + str(mid_autumn_festival.d),
            "isRest": True,
            "remark": "法定节日"
        },
        {
            "name": "国庆节",
            "date": year_str + "-" + "10-1",
            "isRest": True,
            "remark": "法定节日"
        },
        {
            "name": "老年节",
            "date": year_str + "-" + str(old_age.m) + "-" + str(old_age.d),
            "isRest": False,
            "remark": "法定节日"
        },
        {
            "name": "中国医师节",
            "date": year_str + "-" + "11-3",
            "isRest": False,
            "remark": "法定节日"
        },
        {
            "name": "记者节",
            "date": year_str + "-" + "11-8",
            "isRest": False,
            "remark": "法定节日"
        },
        # 纪念日
        {
            "name": "二七纪念日",
            "date": year_str + "-" + "2-7",
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "全民国家安全教育日",
            "date": year_str + "-" + "4-15",
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "中国航天日",
            "date": year_str + "-" + "4-24",
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "中国品牌日",
            "date": year_str + "-" + "5-10",
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "全国防灾减灾日",
            "date": year_str + "-" + "5-12",
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "中国旅游日",
            "date": year_str + "-" + "5-19",
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "全国助残日",
            "date":  get_date_by_number(year, 5, 1, 3, "Sun"),
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "五卅纪念日",
            "date": year_str + "-" + "5-30",
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "文化和自然遗产日",
            "date": get_date_by_number(year, 6, 1, 2, "Sat"),
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "全国土地日",
            "date": year_str + "-" + "6-25",
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "抗日战争纪念日",
            "date": year_str + "-" + "7-7",
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "中国航海日",
            "date": year_str + "-" + "7-11",
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "全民健身日",
            "date": year_str + "-" + "8-8",
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "残疾预防日",
            "date": year_str + "-" + "8-25",
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "抗日战争胜利纪念日",
            "date": year_str + "-" + "9-3",
            "isRest": False,
            "remark": "法定节日"
        },
        {
            "name": "九一八纪念日",
            "date": year_str + "-" + "9-18",
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "全民国防教育日",
            "date": get_date_by_number(year, 9, 1, 3, "Sat"),
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "烈士纪念日",
            "date": year_str + "-" + "9-30",
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "国家扶贫日",
            "date": year_str + "-" + "10-17",
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "全国交通安全日",
            "date": year_str + "-" + "12-2",
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "国家宪法日",
            "date": year_str + "-" + "12-4",
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "全国法制宣传日",
            "date": year_str + "-" + "12-4",
            "isRest": False,
            "remark": "纪念日"
        },
        {
            "name": "南京大屠杀公祭日",
            "date": year_str + "-" + "12-13",
            "isRest": False,
            "remark": "纪念日"
        },
        # 传统节日
        {
            "name": "元宵节",
            "date": year_str + "-" + str(lantern_festival.m) + "-" + str(lantern_festival.d),
            "isRest": False,
            "remark": "传统节日"
        },
        {
            "name": "龙抬头",
            "date": year_str + "-" + str(dragon_head_up.m) + "-" + str(dragon_head_up.d),
            "isRest": False,
            "remark": "传统节日"
        },
        {
            "name": "七夕节",
            "date": year_str + "-" + str(qixi_festival.m) + "-" + str(qixi_festival.d),
            "isRest": False,
            "remark": "传统节日"
        },
        {
            "name": "中元节",
            "date": year_str + "-" + str(ghost_festival.m) + "-" + str(ghost_festival.d),
            "isRest": False,
            "remark": "传统节日"
        },
        {
            "name": "重阳节",
            "date": year_str + "-" + str(double_ninth_festival.m) + "-" + str(double_ninth_festival.d),
            "isRest": False,
            "remark": "传统节日"
        },
        {
            "name": "寒衣节",
            "date": year_str + "-" + str(winter_clothes_festival.m) + "-" + str(winter_clothes_festival.d),
            "isRest": False,
            "remark": "传统节日"
        },
        {
            "name": "下元节",
            "date": year_str + "-" + str(next_metaverse_festival.m) + "-" + str(next_metaverse_festival.d),
            "isRest": False,
            "remark": "传统节日"
        },
        {
            "name": "腊八节",
            "date": year_str + "-" + str(laba_festival.m) + "-" + str(laba_festival.d),
            "isRest": False,
            "remark": "传统节日"
        },
        {
            "name": "小年夜",
            "date": little_night_festival.strftime("%Y-%-m-%d"),
            "isRest": False,
            "remark": "传统节日"
        },
        {
            "name": "除夕夜",
            "date": new_year_eve.strftime("%Y-%-m-%d"),
            "isRest": False,
            "remark": "传统节日"
        },
        {
            "name": "情人节",
            "date": year_str + "-" + "2-14",
            "isRest": False,
            "remark": "世界节日"
        },
        {
            "name": "白色情人节",
            "date": year_str + "-" + "3-14",
            "isRest": False,
            "remark": "世界节日"
        },
        {
            "name": "国际消费者权益日",
            "date": year_str + "-" + "3-15",
            "isRest": False,
            "remark": "世界节日"
        },
        {
            "name": "世界睡眠日",
            "date": year_str + "-" + "3-21",
            "isRest": False,
            "remark": "世界节日"
        },
        {
            "name": "愚人节",
            "date": year_str + "-" + "4-1",
            "isRest": False,
            "remark": "世界节日"
        },
        {
            "name": "世界卫生日",
            "date": year_str + "-" + "4-7",
            "isRest": False,
            "remark": "世界节日"
        },
        {
            "name": "世界地球日",
            "date": year_str + "-" + "4-22",
            "isRest": False,
            "remark": "世界节日"
        },
        {
            "name": "母亲节",
            "date": get_date_by_number(year, 5, 1, 2, "Sun"),
            "isRest": False,
            "remark": "世界节日"
        },
        {
            "name": "父亲节",
            "date": get_date_by_number(year, 6, 1, 3, "Sun"),
            "isRest": False,
            "remark": "世界节日"
        },
        {
            "name": "平安夜",
            "date": year_str + "-" + "12-24",
            "isRest": False,
            "remark": "世界节日"
        },
        {
            "name": "圣诞节",
            "date": year_str + "-" + "12-25",
            "isRest": False,
            "remark": "世界节日"
        }
    ]
    return holidays


# 爬虫获取放假安排
def fetch_rest_plan(year):
    # 仅爬虫 2020 之后的节假日
    holidays = generate_base_holidays(year)
    search_file_name = "国务院办公厅关于" + str(year) + "年部分节假日安排的通知"
    file_url = ""
    publish_date = ""
    rest_array = []
    print("--------------------------------------------")
    print("Here is query str: ", search_file_name)
    res = requests.get("http://xxgk.www.gov.cn/search-zhengce",
                       params={"page_index": 1, "page_size": 10, "title": search_file_name})
    if res.status_code == 200:
        if isinstance(res.json()["data"], list):
            file_url = res.json()["data"][0]["url"]
            publish_date = res.json()["data"][0]["pubtime"]
            print("Fetch result: ", file_url, publish_date)
        else:
            print("Fetch result: Fetch nothing!")
    else:
        print("Request result: Fetch url failed!")
    if len(file_url) > 0:
        print("Here is fetch file url", file_url)
        file_res = requests.get(file_url)
        file_res.encoding = "utf-8"
        if file_res.status_code == 200:
            soup = BeautifulSoup(file_res.text, features="lxml")
            content = soup.find("td", id="UCAP-CONTENT", class_="b12c")
            groups = content.find_all(
                "p", style="margin-top: 0px; margin-bottom: 0px; text-indent: 2em; text-align: justify; font-family: 宋体;")
            for it in groups:
                sub_str = ["一", "二", "三", "四", "五", "六", "七"]
                if any(str in it.get_text() for str in sub_str):
                    rest_array.append(it.get_text())
        else:
            print("Request result: Fetch file failed!")
    if len(rest_array) == 6 | len(rest_array) == 7:
        print(rest_array)
    return holidays


def generate_json():
    # start_year = 2020
    fetch_rest_plan(2019)
    fetch_rest_plan(2020)
    # 多加一年 国务院公布的时间在前一年
    # end_year = datetime.now().year + 1
    # while start_year <= end_year:
    # holidays = fetch_rest_plan(start_year)
    # path = os.path.abspath(".") + "/json"
    # file_name = str(start_year) + ".json"
    # file_path = os.path.join(path, file_name)
    # if os.path.exists(file_path):
    #     os.remove(file_path)
    # with open(file_path, "w", encoding="utf-8") as f:
    #     json.dump({
    #         "year": start_year,
    #         "buildDate": datetime.now().strftime("%Y-%-m-%d %H:%M:%S"),
    #         "holidays": holidays
    #     }, f, ensure_ascii=False, indent=2)
    # start_year = start_year + 1


generate_json()
