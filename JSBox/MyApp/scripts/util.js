const { getAppList } = require("./app.js");

function renderIndexView() {
  let list = getAppList();
  let view = generateListView(list);
  $ui.render({
    views: [view],
  });
}

function installApp(item, data) {
  $addin.save({
    name: item.name,
    icon: item.icon,
    data: $data({ string: data.string }),
    handler: function (success) {
      const list = $addin.list;
      let app = list.find((v) => v.displayName == item.name);
      app.version = item.version;
      app.url = item.url;
      app.author = item.author;
      app.website = item.website;
      $addin.list = list;
      renderIndexView();
      $ui.toast("安装成功");
    },
  });
}

function generateIconImage(item, imageSize) {
  return {
    type: "image",
    props: {
      src: item.iconImage,
      smoothCorners: true,
      cornerRadius: 10,
    },
    layout: function (make, view) {
      make.size.equalTo($size(imageSize, imageSize));
      make.centerY.equalTo(view.super);
      make.left.equalTo(20);
    },
  };
}

function generateCellView(item) {
  return {
    id: item.name,
    type: "view",
    layout: $layout.fill,
    views: [
      generateIconImage(item, 50),
      {
        type: "view",
        layout: function (make, view) {
          make.size.equalTo($size(220, 50));
          make.centerY.equalTo(view.super);
          make.left.equalTo(85);
        },
        views: [
          {
            type: "label",
            props: {
              text: item.name,
              textColor: $color("black"),
              font: $font(14),
            },
            layout: function (make, view) {
              make.size.equalTo($size(220, 20));
              make.top.equalTo(6);
            },
          },
          {
            type: "label",
            props: {
              text: item.description,
              textColor: $color("black"),
              font: $font(12),
            },
            layout: function (make, view) {
              make.size.equalTo($size(220, 20));
              make.bottom.equalTo(-6);
            },
          },
        ],
      },
      {
        type: "button",
        props: {
          title: item.installed ? (item.updated ? "已安装" : "更新") : "获取",
          titleColor: $color("#3f72af"),
          bgcolor: $color("#dbe2ef"),
          font: $font(14),
          smoothCorners: true,
          cornerRadius: 12,
        },
        layout: function (make, view) {
          make.size.equalTo($size(65, 26));
          make.centerY.equalTo(view.super);
          make.right.equalTo(-20);
        },
        events: {
          tapped: function (sender) {
            if (!item.installed || !item.updated) {
              item.icon = "";
              if (item.category == "0" || item.category == "2") {
                item.icon = item.iconImage.match(/icon_[0-9]+.png/)[0];
              }
              $http.download({
                url: item.url,
                progress: function (bytesWritten, totalBytes) {
                  const percentage = (bytesWritten * 1.0) / totalBytes;
                },
                handler: function (resp) {
                  installApp(item, resp.data);
                },
              });
            }
          },
        },
      },
    ],
  };
}

function generateCellDetailView(item) {
  return {
    type: "view",
    props: {
      title: item.name,
      bgcolor: $color("white"),
    },
    views: [
      {
        type: "view",
        layout: function (make, view) {
          make.height.equalTo(140);
          make.centerX.equalTo(view.super);
          make.left.equalTo(0);
          make.top.equalTo(20);
        },
        views: [
          generateIconImage(item, 100),
          {
            type: "view",
            layout: function (make, view) {
              make.size.equalTo($size(220, 100));
              make.centerY.equalTo(view.super);
              make.left.equalTo(140);
            },
            views: [
              {
                type: "view",
                layout: function (make, view) {
                  make.size.equalTo($size(220, 50));
                  make.top.equalTo(0);
                },
                views: [
                  {
                    type: "label",
                    props: {
                      text: item.name,
                      textColor: $color("black"),
                      font: $font(16),
                    },
                    layout: function (make, view) {
                      make.size.equalTo($size(220, 20));
                      make.top.equalTo(6);
                    },
                  },
                  {
                    type: "label",
                    props: {
                      text: item.description,
                      textColor: $color("black"),
                      font: $font(14),
                    },
                    layout: function (make, view) {
                      make.size.equalTo($size(220, 20));
                      make.bottom.equalTo(-6);
                    },
                  },
                ],
              },
              {
                type: "button",
                props: {
                  title: item.installed
                    ? item.updated
                      ? "已安装"
                      : "更新"
                    : "获取",
                  titleColor: $color("#3f72af"),
                  bgcolor: $color("#dbe2ef"),
                  font: $font(14),
                  smoothCorners: true,
                  cornerRadius: 12,
                },
                layout: function (make, view) {
                  make.size.equalTo($size(65, 26));
                  make.bottom.equalTo(0);
                },
                events: {
                  tapped: function (sender) {
                    if (!item.installed || !item.updated) {
                      item.icon = "";
                      if (item.category == "0" || item.category == "2") {
                        item.icon = item.iconImage.match(/icon_[0-9]+.png/)[0];
                      }
                      $http.download({
                        url: item.url,
                        progress: function (bytesWritten, totalBytes) {
                          const percentage = (bytesWritten * 1.0) / totalBytes;
                        },
                        handler: function (resp) {
                          installApp(item, resp.data);
                        },
                      });
                    }
                  },
                },
              },
            ],
          },
        ],
      },
      {
        type: "text",
        props: {
          bgcolor: $color("red"),
        },
        layout: function (make, view) {},
      },
    ],
  };
}

function generateListData(list) {
  // 0 is widget 1 is app 2 is script
  let widgetRows = [];
  let appRows = [];
  let scriptRows = [];
  list.forEach((v) => {
    if (v.category === "0") {
      widgetRows.push(generateCellView(v));
    }
    if (v.category === "1") {
      appRows.push(generateCellView(v));
    }
    if (v.category === "2") {
      scriptRows.push(generateCellView(v));
    }
  });
  return [
    {
      title: "小组件",
      rows: widgetRows,
    },
    {
      title: "App",
      rows: appRows,
    },
    {
      title: "脚本",
      rows: scriptRows,
    },
  ];
}

function generateListView(list) {
  return {
    type: "list",
    props: {
      id: "indexList",
      rowHeight: 80,
      data: generateListData(list),
    },
    layout: $layout.fill,
    // events: {
    //   didSelect: function (sender, indexPath, data) {
    //     const v = list.find((v) => v.name == data.id);
    //     $ui.push(generateCellDetailView(v));
    //   },
    // },
  };
}

module.exports = {
  renderIndexView: renderIndexView,
};
