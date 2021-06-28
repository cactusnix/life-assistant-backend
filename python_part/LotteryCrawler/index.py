import requests
import mysql.connector


# fetch big happy data
def fetchBigHappy(pageNo, pageSize):
    url = "https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry"
    r = requests.get(url=url,
                     params={
                         "gameNo": 85,
                         "provinceId": 0,
                         "isVerify": 1,
                         "pageNo": pageNo,
                         "pageSize": pageSize
                     })
    return r.json()


def lotteryCrawler():
    baseResp = fetchBigHappy(pageNo=1, pageSize=1)
    if baseResp["success"]:
        print("response success message is", baseResp["errorMessage"])
        total = baseResp["value"]["total"]
        print("fetch total records is", total)
        conn = mysql.connector.connect(user="root",
                                       password="Qwer1234!",
                                       database="crawler_data")
        cursor = conn.cursor()
        cursor.execute("select count(*) from lottery")
        count = cursor.fetchone()[0]
        print("rows of lottery table is", count)
        print("==================================================")
        if total > count:
            print("begin inserting data ...")
            list = fetchBigHappy(pageNo=1,
                                 pageSize=total - count)["value"]["list"]
            length = len(list)
            print(length, "items is ready to insert")
            for i in range(length - 1, -1, -1):
                print("progress rate is {0} %".format(
                    round((length - i) / length * 100)),
                      end="\r")
                v = list[i]
                # only handle totalSaleAmount '' case because there is no other attribute will be '' or null
                totalSaleAmount = 0
                if v["totalSaleAmount"].replace(",", "") != '':
                    totalSaleAmount = v["totalSaleAmount"].replace(",", "")
                cursor.execute(
                    "insert into lottery (issue, draw_date, prize_num, disorder_prize_num, sales, prize_pool) values (%s, %s, %s, %s, %s, %s)",
                    [
                        v["lotteryDrawNum"], v["lotteryDrawTime"],
                        v["lotteryDrawResult"], v["lotteryUnsortDrawresult"],
                        totalSaleAmount, v["poolBalanceAfterdraw"].replace(
                            ",", "")
                    ])
                # time: 2021.04.13 15:37
                # fix bugs because response changed, only insert 一等奖 and 二等奖
                for prize_item in v["prizeLevelList"]:
                    if prize_item["prizeLevel"] == "一等奖" or prize_item[
                            "prizeLevel"] == "二等奖":
                        cursor.execute(
                            "insert into prize (issue, prize_type, note_number, prize, add_note_number, add_prize) values (%s, %s, %s, %s, %s, %s)",
                            [
                                v["lotteryDrawNum"], prize_item["prizeLevel"],
                                prize_item["stakeCount"].replace(",", ""),
                                prize_item["stakeAmount"].replace(",", ""),
                                prize_item["stakeCount"].replace(",", ""),
                                prize_item["stakeAmount"].replace(",", "")
                            ])
                        cursor.execute(
                            "insert into prize (issue, prize_type, note_number, prize, add_note_number, add_prize) values (%s, %s, %s, %s, %s, %s)",
                            [
                                v["lotteryDrawNum"], prize_item["prizeLevel"],
                                prize_item["stakeCount"].replace(",", ""),
                                prize_item["stakeAmount"].replace(",", ""),
                                prize_item["stakeCount"].replace(",", ""),
                                prize_item["stakeAmount"].replace(",", "")
                            ])
                conn.commit()
            cursor.close()
            conn.close()
            print(length, "have been inserted")
        else:
            print("no data is ready to insert")
            cursor.close()
            conn.close()
    else:
        print("response error message is", baseResp["errorMessage"])


lotteryCrawler()