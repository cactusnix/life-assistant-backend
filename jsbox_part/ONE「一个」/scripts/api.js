async function updateApp() {
  // const updateURL = ''
  let updateInfo = await $http.get(
    'https://raw.githubusercontent.com/cactusnix/life-assistant-backend/master/jsbox_part/ONE「一个」/config.json'
  )
}

module.exports = {
  updateApp: updateApp
}
