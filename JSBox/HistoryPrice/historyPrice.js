// analysize the page "https://tool.manmanbuy.com/m/disSitePro.aspx?c_from=m&url=" use get method
// now I will not use this way, it lacks lots of data
/*
async function getDataByHTML(queryStr) {
  // use data from https://tool.manmanbuy.com/m/disSitePro.aspx?c_from=m&url=
  const url = "https://tool.manmanbuy.com/m/disSitePro.aspx?c_from=m&url=";
  // fetch data
  const resp = (await $http.get(encodeURI(url + queryStr))).data;
  // match trend data analysis only one maybe......
  let list = JSON.parse(
    '{"list":' +
      "[" +
      resp
        .match(/flotChart\.chart\('.*\)/)[0]
        .replace(/flotChart\.chart\('|'\)/g, "") +
      "]" +
      "}"
  ).list;
  // handle and format data
  const itemList = resp
    .match(/addBrowes\(.*\);/)[0]
    .replace(/addBrowes\(|\);|'|\s/g, "")
    .split(",");
  list.forEach((v) => {
    v[0] = moment(v[0]).format("YYYY-MM-DD");
  });
  // it should be a json data, not this ... { "list": [], item: "" }
  return { list, itemList };
}
*/
// before is before

$app.theme = "auto";
const moment = require("moment");
// get json from api , maybe it's from manmanbuy app
async function getDataByPOST(queryStr) {
  const resp = (
    await $http.request({
      url:
        "https://apapia-history.manmanbuy.com/ChromeWidgetServices/WidgetServices.ashx",
      method: "POST",
      // must use this content-type & user-agent, maybe the app do the verify
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 - mmbWebBrowse - ios",
      },
      body: {
        methodName: "getHistoryTrend",
        p_url: encodeURI(queryStr),
      },
    })
  ).data;
  return resp;
}

// dynamic render view
async function searchAndShowView(queryStr) {
  // remove before view
  if ($("detailView") != undefined) {
    $("detailView").remove();
  }
  if ($("chartView") != undefined) {
    $("chartView").remove();
  }
  if (queryStr === "") {
    $ui.warning("请输入或者复制商品的链接");
  } else {
    $("scrollView").add({
      type: "spinner",
      props: {
        id: "spinnerView",
        loading: true,
        color: $color("red"),
      },
      layout: function (make, view) {
        make.center.equalTo(view.super);
      },
    });
    const data = await getDataByPOST(queryStr);
    if (data.ok === 1) {
      // filter data
      // use itemList to support the function getDataByHTML's result { list, itemList }
      let itemList = [
        data.single.title,
        "",
        data.single.bigpic,
        data.single.spmoney,
      ];
      // use list for echarts
      let list = JSON.parse(
        '{"list":' + "[" + data.single.jiagequshi + "]" + "}"
      ).list;
      list.forEach((v) => {
        v[0] = moment(v[0]).format("YYYY-MM-DD");
      });
      let info = data.PriceRemark;
      let content = "#### " + info.Remark + "<br />";
      info.ListPriceDetail.forEach((v) => {
        content += v.ShowName + " " + v.Price + " " + v.Difference + "<br />";
      });
      console.log(content);
      // add detail view
      $("scrollView").add({
        type: "view",
        props: {
          id: "detailView",
        },
        layout: function (make, view) {
          make.width.equalTo(view.super);
          make.height.equalTo(renderConfig.detailPartHeight);
          make.top.equalTo(renderConfig.searchPartHeight);
        },
        views: [
          {
            type: "image",
            props: {
              src: itemList[2],
            },
            layout: function (make, view) {
              make.size.equalTo($size(100, 100));
              make.centerY.equalTo(view.super);
              make.left.equalTo(15);
            },
          },
          {
            type: "label",
            props: {
              text: itemList[0],
              font: $font(14),
              lines: 0,
              autoFontSize: true,
            },
            layout: function (make, view) {
              make.width.equalTo(220);
              make.top.equalTo(10);
              make.left.equalTo(145);
            },
          },
          {
            type: "label",
            props: {
              text: itemList[3] + " ¥",
              font: $font("bold", 16),
              color: $color("red"),
              lines: 0,
              autoFontSize: true,
            },
            layout: function (make, view) {
              make.width.equalTo(200);
              make.bottom.equalTo(-10);
              make.left.equalTo(145);
            },
          },
        ],
      });
      // add price summary view
      $("scrollView").add({
        type: "markdown",
        props: {
          content: content,
        },
        layout: function (make, view) {
          make.width.equalTo(view.super);
          make.height.equalTo(renderConfig.pricePartHeight);
          make.top.equalTo(
            renderConfig.searchPartHeight + renderConfig.detailPartHeight
          );
        },
      });
      // add chart view
      $("scrollView").add({
        type: "chart",
        props: {
          id: "chartView",
          options: {
            grid: {
              left: "15%",
            },
            xAxis: {
              type: "category",
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                type: "line",
                smooth: true,
              },
            ],
            dataset: {
              source: list,
            },
            tooltip: {
              trigger: "axis",
              padding: 10,
              axisPointer: {
                type: "cross",
                label: {
                  backgroundColor: "#6a7985",
                },
              },
              formatter: (params) => {
                let item = params[0].data;
                console.log(item);
                return "时间: " + item[0] + "<br />" + "价格: " + item[1];
              },
            },
          },
        },
        layout: function (make, view) {
          make.width.equalTo(view.super);
          make.height.equalTo(400);
          make.top.equalTo(
            renderConfig.detailPartHeight +
              renderConfig.pricePartHeight +
              renderConfig.searchPartHeight
          );
        },
      });
      $("spinnerView").remove();
    } else {
      $("spinnerView").remove();
      $ui.warning(data.msg);
    }
  }
}

// render view
let renderConfig = {
  searchPartHeight: 60,
  detailPartHeight: 120,
  pricePartHeight: 120,
};
$ui.render({
  views: [
    {
      type: "scroll",
      layout: $layout.fill,
      props: {
        id: "scrollView",
      },
      views: [
        {
          type: "view",
          layout: function (make, view) {
            make.width.equalTo(view.super);
            make.height.equalTo(renderConfig.searchPartHeight);
          },
          views: [
            {
              type: "input",
              props: {
                id: "searchInput",
                type: $kbType.search,
                darkKeyboard: true,
                placeholder: "请输入或者复制商品的链接",
              },
              layout: function (make, view) {
                make.size.equalTo($size(280, 32));
                make.centerY.equalTo(view.super);
                make.left.equalTo(15);
              },
              events: {
                returned: async function (sender) {
                  $("searchInput").blur();
                  $device.taptic(2);
                  await searchAndShowView(sender.text);
                },
              },
            },
            {
              type: "button",
              props: {
                title: "查询",
              },
              layout: function (make, view) {
                make.size.equalTo($size(60, 32));
                make.centerY.equalTo(view.super);
                make.right.equalTo(-15);
              },
              events: {
                tapped: async function (sender) {
                  $("searchInput").blur();
                  $device.taptic(2);
                  await searchAndShowView($("searchInput").text);
                },
              },
            },
          ],
        },
      ],
      events: {
        tapped: function (sender) {
          $("searchInput").blur();
        },
      },
    },
  ],
});
