// 当前日期 格式化11月23日
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const weeks = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

// checkInputValue
function checkAndInit(inputValue) {
  if (inputValue) {
    try {
      let obj = JSON.parse(inputValue)
      return obj
    } catch (error) {
      return {
        weatherKey: '',
        mode: 'system'
      }
    }
  } else {
    return {
      weatherKey: '',
      mode: 'system'
    }
  }
}

// 和风天气获取实时天气数据
async function fetchWeather(key) {
  if (key) {
    const location = await $location.get()
    const URL =
      'https://devapi.qweather.com/v7/weather/now?key=' +
      key +
      '&location=' +
      location.lng.toFixed(2) +
      ',' +
      location.lat.toFixed(2)
    const resp = await $http.get({ url: URL })
    return resp.data.now
  } else {
    return false
  }
}

// greeting message
function getGreetingMessage(currentDate) {
  const hour = currentDate.getHours()
  if (hour >= 7 && hour < 12) {
    return 'Good Morning'
  }
  if (hour >= 12 && hour < 17) {
    return 'Good Afternoon'
  }
  if (hour >= 17 && hour < 22) {
    return 'Good Evening'
  }
  if (hour >= 22 || (hour >= 0 && hour < 7)) {
    return 'Sleeping Time'
  }
}

// canlendar data
async function getCalendarData(currentDate) {
  let result = await new Promise((resolve, reject) => {
    $calendar.fetch({
      startDate: currentDate,
      hours: 12,
      handler: function (resp) {
        resolve(resp.events)
      }
    })
  })
  return result
}

// reminder data
async function getReminderData(currentDate) {
  let result = await new Promise((resolve, reject) => {
    $reminder.fetch({
      startDate: currentDate,
      hours: 12,
      handler: function (resp) {
        resolve(resp.events)
      }
    })
  })
  return result.filter(v => v.completed === false)
}

// format date
function formatDate(date, formatType) {
  switch (formatType) {
    case 'HH:mm':
      return (
        date.getHours() +
        ':' +
        (date.getMinutes() >= 10
          ? date.getMinutes() + ''
          : '0' + date.getMinutes())
      )
    default:
      return date
  }
}

// format item
function formatItem(item) {
  return (
    item.title +
    ' ' +
    formatDate(item.startDate, 'HH:mm') +
    '~' +
    formatDate(item.endDate, 'HH:mm')
  )
}

// format date string
async function formatDateStr(currentDate) {
  const temp = await getCalendarData(currentDate)
  const calendarList = temp.filter(v => v.allDay === true)
  let allDayText = ''
  if (calendarList.length > 0) {
    allDayText = ' , ' + calendarList[0].title
  }
  return (
    'Today is ' +
    weeks[currentDate.getDay()] +
    ' , ' +
    months[currentDate.getMonth()] +
    ' ' +
    currentDate.getDate() +
    allDayText
  )
}

// generate weather views
async function generateWeatherView(weatherKey) {
  const weatherJSON = await fetchWeather(weatherKey)
  if (!weatherJSON) {
    // Please config right weather key!
    return [
      {
        type: 'text',
        props: {
          text: ''
        }
      }
    ]
  } else {
    return [
      {
        type: 'image',
        props: {
          frame: {
            width: 14,
            height: 14
          },
          resizable: true,
          image: $image('assets/weather/' + weatherJSON.icon + '.png')
        }
      },
      {
        type: 'text',
        props: {
          font: $font(14),
          color: $color('#433d3c', '#bbbbbb'),
          text:
            'temprature is ' +
            weatherJSON.temp +
            '°C , ' +
            'feel like ' +
            weatherJSON.feelsLike +
            '°C'
        }
      }
    ]
  }
}

// generate calendar views
async function generateCalendarView(currentDate) {
  const temp = await getCalendarData(currentDate)
  const calendarList = temp.filter(v => v.allDay === false)
  let calendarText = 'no calendar'
  if (calendarList.length > 0) {
    calendarText = formatItem(calendarList[0])
  }
  return [
    {
      type: 'color',
      props: {
        frame: {
          width: 3,
          height: 15
        },
        color: $color('#F82D59', '#9f5f80')
      }
    },
    {
      type: 'text',
      props: {
        text: calendarText,
        font: $font(12),
        color: $color('#433d3c', '#bbbbbb')
      }
    }
  ]
}

// generate reminder views
async function generateReminderView(currentDate) {
  const reminderList = await getReminderData(currentDate)
  return [
    {
      type: 'color',
      props: {
        frame: {
          width: 3,
          height: 15
        },
        color: $color('#157EFB', '#5c6e91')
      }
    },
    {
      type: 'text',
      props: {
        text: reminderList[0].title,
        font: $font(12),
        color: $color('#433d3c', '#bbbbbb')
      }
    },
    {
      type: 'text',
      props: {
        text: '+' + reminderList.length,
        font: $font(12),
        color: $color('#ee9595')
      }
    }
  ]
}

// generate widget views
async function generateWidgetView(currentDate, obj) {
  const dateStr = await formatDateStr(currentDate)
  const title = getGreetingMessage(currentDate).split(' ')
  const weatherViews = await generateWeatherView(obj.weatherKey)
  const calendarViews = await generateCalendarView(currentDate)
  const reminderViews = await generateReminderView(currentDate)
  return {
    type: 'vstack',
    props: {
      frame: {
        maxWidth: Infinity,
        maxHeight: Infinity,
        alignment: $widget.alignment.topLeading
      },
      background: $color('#ffffff', '#898989'),
      padding: $insets(50, 20, 0, 0),
      alignment: $widget.horizontalAlignment.leading
    },
    views: [
      {
        type: 'text',
        props: {
          text: title[0],
          font: $font('bold', 35),
          color: $color('#222831', '#e6e6e6')
        }
      },
      {
        type: 'text',
        props: {
          text: title[1],
          font: $font('bold', 35),
          color: $color('#222831', '#e6e6e6')
        }
      },
      {
        type: 'text',
        props: {
          text: dateStr,
          padding: $insets(1, 0, 0, 0),
          font: $font(15),
          color: $color('#433d3c', '#bbbbbb')
        }
      },
      {
        type: 'hstack',
        props: {
          padding: $insets(20, 0, 0, 0)
        },
        views: weatherViews
      },
      {
        type: 'hstack',
        views: calendarViews
      },
      {
        type: 'hstack',
        views: reminderViews
      }
    ]
  }
}

module.exports = {
  checkAndInit: checkAndInit,
  generateWidgetView: generateWidgetView
}
