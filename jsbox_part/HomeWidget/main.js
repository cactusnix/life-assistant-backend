const inputValue = $widget.inputValue

// 和风天气 key 个人开发者
// const inputValue = ''

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
const currentDate = new Date()

// 和风天气获取24h天气数据
async function fetchWeather() {
  const location = await $location.get()
  const URL =
    'https://devapi.qweather.com/v7/weather/now?key=' +
    inputValue +
    '&location=' +
    location.lng.toFixed(2) +
    ',' +
    location.lat.toFixed(2)
  const resp = await $http.get({ url: URL })
  return resp.data.now
}

// greeting message
function getGreetingMessage() {
  const hour = currentDate.getHours()
  if (hour >= 7 && hour <= 12) {
    return 'Good Morning'
  }
  if (hour > 12 && hour < 17) {
    return 'Good Afternoon'
  }
  if (hour >= 17 && hour <= 22) {
    return 'Good Evening'
  }
  if (hour > 22 || (hour >= 0 && hour < 7)) {
    return 'Sleeping Time'
  }
}

// canlendar data
async function getCalendarData() {
  let result = await new Promise((resolve, reject) => {
    $calendar.fetch({
      startDate: currentDate,
      hours: 24,
      handler: function (resp) {
        resolve(resp.events)
      }
    })
  })
  return result
}

// reminder data
async function getReminderData() {
  let result = await new Promise((resolve, reject) => {
    $reminder.fetch({
      startDate: currentDate,
      hours: 24,
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

// request weather data
const weatherJSON = await fetchWeather()
const formatDateStr =
  'Today is ' +
  weeks[currentDate.getDay()] +
  ' , ' +
  months[currentDate.getMonth()] +
  ' ' +
  currentDate.getDate()
const title = getGreetingMessage().split(' ')
const calendarList = await getCalendarData()
const reminderList = await getReminderData()

// 时间线
$widget.setTimeline({
  render: ctx => {
    if (inputValue) {
      return {
        type: 'vstack',
        props: {
          frame: {
            maxWidth: Infinity,
            maxHeight: Infinity,
            alignment: $widget.alignment.topLeading
          },
          padding: $insets(50, 20, 0, 0),
          alignment: $widget.verticalAlignment.top
        },
        views: [
          {
            type: 'text',
            props: {
              text: title[0],
              font: $font('bold', 35)
            }
          },
          {
            type: 'text',
            props: {
              text: title[1],
              font: $font('bold', 35)
            }
          },
          {
            type: 'text',
            props: {
              text: formatDateStr,
              font: $font('bold', 15)
            }
          },
          {
            type: 'hstack',
            views: [
              {
                type: 'image',
                props: {
                  frame: {
                    width: 20,
                    height: 20
                  },
                  resizable: true,
                  image: $image('assets/weather/' + weatherJSON.icon + '.png')
                }
              },
              {
                type: 'text',
                props: {
                  font: $font(15),
                  text:
                    'temp is ' +
                    weatherJSON.temp +
                    '°C , ' +
                    'feel like ' +
                    weatherJSON.feelsLike +
                    '°C'
                }
              }
            ]
          },
          {
            type: 'hstack',
            views: [
              {
                type: 'color',
                props: {
                  frame: {
                    width: 3,
                    height: 15
                  },
                  color: $color('#F82D59')
                }
              },
              {
                type: 'text',
                props: {
                  text: formatItem(calendarList[0]),
                  font: $font(12)
                }
              }
            ]
          },
          {
            type: 'hstack',
            views: [
              {
                type: 'color',
                props: {
                  frame: {
                    width: 3,
                    height: 15
                  },
                  color: $color('#157EFB')
                }
              },
              {
                type: 'text',
                props: {
                  text: reminderList[0].title,
                  font: $font(12)
                }
              }
            ]
          }
        ]
      }
    } else {
      return {
        type: 'vstack',
        props: {
          frame: {
            maxWidth: Infinity,
            maxHeight: Infinity,
            alignment: $widget.alignment.topLeading
          },
          padding: $insets(50, 20, 0, 0),
          alignment: $widget.verticalAlignment.top
        },
        views: [
          {
            type: 'text',
            props: {
              text: title[0],
              font: $font('bold', 35)
            }
          },
          {
            type: 'text',
            props: {
              text: title[1],
              font: $font('bold', 35)
            }
          },
          {
            type: 'text',
            props: {
              text: formatDateStr,
              font: $font('bold', 15)
            }
          },
          {
            type: 'text',
            props: {
              text: '请配置和风天气个人开发者的key',
              font: $font(12)
            }
          },
          {
            type: 'hstack',
            views: [
              {
                type: 'color',
                props: {
                  frame: {
                    width: 3,
                    height: 15
                  },
                  color: $color('#F82D59')
                }
              },
              {
                type: 'text',
                props: {
                  text: formatItem(calendarList[0]),
                  font: $font(12)
                }
              }
            ]
          },
          {
            type: 'hstack',
            views: [
              {
                type: 'color',
                props: {
                  frame: {
                    width: 3,
                    height: 15
                  },
                  color: $color('#157EFB')
                }
              },
              {
                type: 'text',
                props: {
                  text: reminderList[0].title,
                  font: $font(12)
                }
              }
            ]
          }
        ]
      }
    }
  }
})
