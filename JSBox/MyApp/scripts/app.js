function getRemoteAppList() {
  // here is remote app list
  let list = JSON.parse($file.read("assets/app.json").string);
  return list;
}

function getAppList() {
  // remote list
  let remoteList = getRemoteAppList();
  // here is local app list
  let localList = $addin.list;
  // unique key is name & author
  remoteList.forEach((v, i) => {
    v.id = i;
    if (
      localList.findIndex(
        (value) => value.displayName === v.name && value.author === v.author
      ) > -1
    ) {
      v.installed = true;
      if (
        localList.find(
          (value) => value.displayName === v.name && value.author === v.author
        ).version < v.version
      ) {
        v.updated = false;
      } else {
        v.updated = true;
      }
    } else {
      v.installed = false;
      v.updated = false;
    }
  });
  return remoteList;
}

module.exports = {
  getAppList: getAppList,
};
