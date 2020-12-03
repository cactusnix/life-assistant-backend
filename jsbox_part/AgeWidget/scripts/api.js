// 闰年判断
function isLeapYear(year) {
  if (year % 4 === 0 && (year % year) % 100 != 0) {
    return true
  } else if (year % 400 === 0) {
    return true
  } else {
    return false
  }
}

// 准确天数判断
function getDayByMonth(year, month) {
  const isLeap = isLeapYear(year)
  if (month === 2) {
    return isLeap ? 29 : 28
  } else if (
    month === 0 ||
    month === 1 ||
    month === 3 ||
    month === 5 ||
    month === 7 ||
    month === 8 ||
    month === 10
  ) {
    return 31
  } else {
    return 30
  }
}

// 获取差值对象
function getDateDiff(startDate, endDate) {
  let result = []
  const diffSeconds = (endDate.getTime() - startDate.getTime()) / 1000
  const year = endDate.getFullYear() - startDate.getFullYear()
  const month = endDate.getMonth() - startDate.getMonth()
  const day = endDate.getDate() - startDate.getDate()
  const timeList = [day, month, year]
  const diffMap = [getDayByMonth(endDate.getFullYear(), endDate.getMonth()), 12]
  // 年作为过去的时间，差值不可能小于0，暂不做判断
  timeList.forEach((v, i) => {
    if (v < 0) {
      result.push(v + diffMap[i] + '')
      timeList[i + 1]--
    } else {
      result.push(v + '')
    }
  })
  const weeks = diffSeconds / (24 * 60 * 60 * 7)
  const weeksAll = Math.trunc(weeks)
  const daysAll = Math.trunc((weeks - weeksAll) * 7)
  const hoursAll = Math.trunc(((weeks - weeksAll) * 7 - daysAll) * 24)
  // 直接去除小数点
  return {
    year: result[2],
    month: result[1],
    day: result[0],
    weeksAll: Math.trunc(weeks),
    daysAll: daysAll,
    hoursAll: hoursAll
  }
}

// 检查输入值是否符合规范, 减少校验规则, 存在即默认是输入对的, 减少检验逻辑, 只判断是否存在
// eg: birthDate: 必填/正确/string
// dateType: 可选/默认值0/number, 0表示累计模式, 1表示倒计时模式
// deathDate: 可选/默认80岁/string, 和birthday一样的格式
function checkAndInit(inputValue) {
  if (inputValue) {
    try {
      let tempObj = JSON.parse(inputValue)
      if (!tempObj.birthDate) {
        return false
      }
      const birthArray = tempObj.birthDate.split(/\/|\s|:/)
      let birthDate = new Date(
        birthArray[0] - 0,
        birthArray[1] - 0,
        birthArray[2] - 0,
        birthArray[3] - 0
      )
      let deathDate = new Date(
        birthArray[0] - 0 + 80,
        birthArray[1] - 0,
        birthArray[2] - 0,
        birthArray[3] - 0
      )
      if (tempObj.deathDate) {
        const deathArray = tempObj.deathDate.split(/\/|\s|:/)
        deathDate = new Date(
          deathArray[0] - 0,
          deathArray[1] - 0,
          deathArray[2] - 0,
          deathArray[3] - 0
        )
      }
      let obj = {
        name: tempObj.name ? tempObj.name : 'Hello',
        birthDate: birthDate,
        dateType: tempObj.dateType ? tempObj.dateType : 0,
        deathDate: deathDate
      }
      obj.passDiff = getDateDiff(obj.birthDate, new Date())
      obj.futureDiff = getDateDiff(new Date(), obj.deathDate)
      return obj
    } catch (error) {
      return false
    }
  } else {
    return false
  }
}

exports.checkAndInit = checkAndInit
