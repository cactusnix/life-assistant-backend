const inputValue = $widget.inputValue;

// any cookie can finish the request
// this is the index money ...
const url1 =
  "https://m.client.10010.com/mobileserviceimportant/home/queryUserInfoSeven";
const url2 =
  "https://m.client.10010.com/mobileservicequery/operationservice/queryOcsPackageFlowLeftContent";

// fetch data
const resp1 = (
  await $http.request({
    method: "POST",
    url: url1,
    header: {
      Cookie: inputValue,
    },
  })
).data;
const resp2 = (
  await $http.request({
    method: "POST",
    url: url2,
    header: {
      Cookie: inputValue,
    },
  })
).data;

// generate base data for reuse
function generateBaseData(resp1, resp2) {
  let data = {
    freeFlowUsed: 0,
    freeFlowTotal: 0,
    dailyRentFlowUsed: 0,
    dailyRentFlowTotal: 0,
    totalFlowUsed: 0,
    totalFlow: 0,
  };
  let flowList = resp2.resources
    .filter((v) => v.type === "flow")[0]
    .details.filter((v) => v.endDate === "长期有效");
  // freeFlow resoureType is 13, dailyRentFlow resourceType is 46
  // handle data
  // daily flow part
  flowList
    .filter((v) => v.resourceType === "46")
    .forEach((v) => {
      data.dailyRentFlowUsed += v.use - 0;
      data.dailyRentFlowTotal += 1024;
    });
  data.dailyRentFlowUsed = new Number(data.dailyRentFlowUsed / 1024).toFixed(2);
  data.dailyRentFlowTotal = new Number(data.dailyRentFlowTotal / 1024).toFixed(
    0
  );
  // free flow part
  flowList
    .filter((v) => v.resourceType === "13")
    .forEach((v) => {
      data.freeFlowUsed += v.use - 0;
      data.freeFlowTotal += v.total - 0;
    });
  data.freeFlowUsed = new Number(data.freeFlowUsed / 1024).toFixed(2);
  data.freeFlowTotal = new Number(data.freeFlowTotal / 1024).toFixed(0);
  // total flow part
  data.totalFlowUsed = new Number(resp2.summary.sum / 1024).toFixed(2);
  data.totalFlow = data.freeFlowTotal - 0 + (data.dailyRentFlowTotal - 0);
  return data;
}

// generate image for small view
function generateImageForSmallView(data) {
  const width = 58;
  const height = 58;
  let list = [
    {
      colorBack: "#38181C",
      colorFront: "#DF0716",
      percent: data.totalFlowUsed / data.totalFlow,
    },
    {
      colorBack: "#1C371A",
      colorFront: "#35DB00",
      percent: data.freeFlowUsed / data.freeFlowTotal,
    },
    {
      colorBack: "#123339",
      colorFront: "#00C1E1",
      percent: data.dailyRentFlowUsed / data.dailyRentFlowTotal,
    },
  ];
  return $imagekit.render(
    {
      size: $size(width, height),
    },
    (ctx) => {
      list.forEach((v, i) => {
        const circleWidth = 5.8;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = width / 2 - (i + 1) * circleWidth - i * 1.5;
        // first
        ctx.strokeColor = $color(v.colorBack);
        ctx.setLineWidth(circleWidth);
        ctx.addArc(
          centerX,
          centerY,
          radius,
          Math.PI * 1.5,
          Math.PI * 1.5 + Math.PI * 2,
          false
        );
        ctx.strokePath();
        // second
        ctx.strokeColor = $color(v.colorFront);
        ctx.setLineWidth(circleWidth);
        ctx.addArc(
          centerX,
          centerY,
          radius,
          Math.PI * 1.5,
          Math.PI * 1.5 + Math.PI * v.percent * 2,
          false
        );
        ctx.strokePath();
      });
    }
  );
}

// generate image for medium view
function generateImageForMediumView(data, displaySize) {
  const width = displaySize.height - 15;
  const height = displaySize.height - 15;
  let list = [
    {
      colorBack: "#38181C",
      colorFront: "#DF0716",
      percent: data.totalFlowUsed / data.totalFlow,
    },
    {
      colorBack: "#1C371A",
      colorFront: "#35DB00",
      percent: data.freeFlowUsed / data.freeFlowTotal,
    },
    {
      colorBack: "#123339",
      colorFront: "#00C1E1",
      percent: data.dailyRentFlowUsed / data.dailyRentFlowTotal,
    },
  ];
  return $imagekit.render(
    {
      size: $size(width, height),
    },
    (ctx) => {
      list.forEach((v, i) => {
        const circleWidth = 14;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = width / 2 - (i + 1) * circleWidth - i * 1.5;
        // first
        ctx.strokeColor = $color(v.colorBack);
        ctx.setLineWidth(circleWidth);
        ctx.addArc(
          centerX,
          centerY,
          radius,
          Math.PI * 1.5,
          Math.PI * 1.5 + Math.PI * 2,
          false
        );
        ctx.strokePath();
        // second
        ctx.strokeColor = $color(v.colorFront);
        ctx.setLineWidth(circleWidth);
        ctx.addArc(
          centerX,
          centerY,
          radius,
          Math.PI * 1.5,
          Math.PI * 1.5 + Math.PI * v.percent * 2,
          false
        );
        ctx.strokePath();
      });
    }
  );
}
// generate small view
function generateSmallView(data, image, displaySize) {
  return {
    type: "vstack",
    props: {
      frame: {
        maxWidth: displaySize.width,
        maxHeight: displaySize.height,
        alignment: $widget.alignment.leading,
      },
      alignment: $widget.horizontalAlignment.leading,
      padding: 15,
      background: $color("#191A1C"),
    },
    views: [
      {
        type: "image",
        props: {
          image: image,
        },
      },
      {
        type: "spacer",
      },
      {
        type: "text",
        props: {
          text: data.totalFlowUsed + "/" + data.totalFlow + "GB",
          color: $color("#DF0716"),
          font: $font("bold", 18),
        },
      },
      {
        type: "text",
        props: {
          text: data.freeFlowUsed + "/" + data.freeFlowTotal + "GB",
          color: $color("#35DB00"),
          font: $font("bold", 18),
        },
      },
      {
        type: "text",
        props: {
          text: data.dailyRentFlowUsed + "/" + data.dailyRentFlowTotal + "GB",
          color: $color("#00C1E1"),
          font: $font("bold", 18),
        },
      },
    ],
  };
}

// generate medium view
function generateMediumView(data, image, displaySize) {
  return {
    type: "hstack",
    props: {
      frame: {
        maxWidth: displaySize.width,
        maxHeight: displaySize.height,
      },
      alignment: $widget.verticalAlignment.center,
      padding: $insets(15, 25, 15, 25),
      background: $color("#191A1C"),
    },
    views: [
      {
        type: "vstack",
        props: {
          frame: {
            width: displaySize.height - 30,
            maxHeight: displaySize.height - 30,
            alignment: $widget.alignment.leading,
          },
          alignment: $widget.horizontalAlignment.leading,
        },
        views: [
          {
            type: "text",
            props: {
              text: "总计",
              color: $color("white"),
              font: $font("bold", 15),
            },
          },
          {
            type: "text",
            props: {
              text: data.totalFlowUsed + "/" + data.totalFlow + "GB",
              color: $color("#DF0716"),
              font: $font("bold", 15),
            },
          },
          {
            type: "spacer",
          },
          {
            type: "text",
            props: {
              text: "免流",
              color: $color("white"),
              font: $font("bold", 15),
            },
          },
          {
            type: "text",
            props: {
              text: data.freeFlowUsed + "/" + data.freeFlowTotal + "GB",
              color: $color("#35DB00"),
              font: $font("bold", 15),
            },
          },
          {
            type: "spacer",
          },
          {
            type: "text",
            props: {
              text: "日租宝",
              color: $color("white"),
              font: $font("bold", 15),
            },
          },
          {
            type: "text",
            props: {
              text:
                data.dailyRentFlowUsed + "/" + data.dailyRentFlowTotal + "GB",
              color: $color("#00C1E1"),
              font: $font("bold", 15),
            },
          },
        ],
      },
      {
        type: "spacer",
      },
      {
        type: "image",
        props: {
          frame: {
            width: displaySize.height - 30,
            maxHeight: displaySize.height - 30,
          },
          image: image,
        },
      },
    ],
  };
}

// set timeline
$widget.setTimeline({
  render: (ctx) => {
    if (inputValue) {
      if (resp1 === "999999" || resp2 === "999999") {
        return {
          type: "text",
          props: {
            text: "Cookie 已经失效，请重新获取并配置。",
            font: $font(12),
          },
        };
      } else {
        let data = generateBaseData(resp1, resp2);
        const displaySize = ctx.displaySize;
        switch (ctx.family) {
          case 0:
            const smallImage = generateImageForSmallView(data);
            return generateSmallView(data, smallImage, displaySize);
          case 1:
            const mediumImage = generateImageForMediumView(data, displaySize);
            return generateMediumView(data, mediumImage, displaySize);
          case 2:
            return {};
        }
      }
    } else {
      return {
        type: "text",
        props: {
          text: "请配置正确的Cookie",
        },
      };
    }
  },
});
