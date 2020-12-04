// const inputValue = $widget.inputValue
const inputValue = 'testMode'
async function fetchWeather() {
  const cacheObject = {
    code: 200,
    now: {
      windSpeed: 'test'
    }
  }
  const location = await $location.get()
  const URL =
    'https://devapi.qweather.com/v7/weather/24h?key=88f64079d81940cb86ac426bd688780a&location=' +
    location.lng.toFixed(2) +
    ',' +
    location.lat.toFixed(2)
  const resp = await $http.get({ url: URL })
  console.log(resp)
  if (resp && resp.data.code === 200) {
    return resp.data.hourly
  } else {
    return cacheObject
  }
}
const data = await fetchWeather()
console.log(data)
$widget.setTimeline({
  entries: data,
  render: ctx => {
    const info = ctx.entry.info
    if (inputValue) {
      return {
        type: 'hstack',
        views: [
          {
            type: 'text',
            props: {
              text: info
            }
          }
        ]
      }
    } else {
      return {
        type: 'text',
        props: {
          text: '请配置小组件'
        }
      }
    }
  }
})
