async function updateApp() {
  let remoteInfoURL = encodeURI(
    'https://raw.githubusercontent.com/cactusnix/life-assistant-backend/master/jsbox_part/ONE「一个」/config.json'
  )
  let remoteInfo = (await $http.get(remoteInfoURL)).data
  let localInfo = JSON.parse($file.read('/config.json').string)
  if (remoteInfo.info.version > localInfo.info.version) {
    console.log('update')
    const updateURL = encodeURI(
      'https://xteko.com/redir?&name=ONE&url=https://raw.githubusercontent.com/cactusnix/life-assistant-backend/master/jsbox_part/ONE/.output/ONE.box'
    )
    $app.openURL(updateURL)
  } else {
    return true
  }
}

module.exports = {
  updateApp: updateApp
}
