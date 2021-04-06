/*
  参考：https://github.com/Neurogram-R/JSBox/tree/main/Widgets
*/

const inputValue = $widget.inputValue;

if (inputValue) {
  const theme_colors = {
    green: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  };
  let theme = theme_colors.green;
  const url = "https://github.com/" + inputValue.split(",")[0];
  const resp = (await $http.get(url)).data;
  $widget.setTimeline({
    render: (ctx) => {
      const avatar = resp.match(/og:image" content="([^"]+)/)[1];
      const title = resp.match(/<title>.+\((.+)\).*<\/title>/)[1];
      const counter = resp.match(/\d{1,},*\d* contributions/)[0];
      const family = ctx.family;
      const width = ctx.displaySize.width;
      const height = ctx.displaySize.height;
      let contributions = resp.match(/<g transform="translate(.|\n)+?<\/g>/g);
      contributions =
        family == 0
          ? contributions.slice(-9).join("\n")
          : contributions.slice(-20).join("\n");
      const colors_data = contributions
        .match(/data-level="\d+/g)
        .join("\n")
        .replace(/data-level="/g, "")
        .split("\n");

      const colors_row_spacing = family == 0 ? 2 : 2;
      const colors_column_spacing = family == 0 ? 4 : 5.05;

      let colors_view = [];
      const colors_square_width =
        family == 0
          ? (width - 30 - 8 * colors_row_spacing) / 9
          : (width - 30 - 19 * colors_row_spacing) / 20;

      for (var i = 0; i < colors_data.length; i++) {
        colors_view.push({
          type: "color",
          props: {
            light: theme[colors_data[i]],
            dark: colors_data[i] == "0" ? "#3E3E41" : theme[colors_data[i]],
            frame: {
              width: colors_square_width,
              height: colors_square_width,
            },
            cornerRadius: 2,
          },
        });
      }

      let counter_view = {
        type: "text",
        props: {
          text: `(${counter.toUpperCase()})`,
          font: $font(10),
          color: $color("#9A9AA1"),
          minimumScaleFactor: 0.5,
          lineLimit: 1,
        },
      };

      return {
        type: "vstack",
        props: {
          alignment: $widget.horizontalAlignment.leading,
          spacing: 10,
          frame: {
            width: width - 30,
            height: height,
          },
          widgetURL: url,
        },
        views: [
          {
            type: "hstack",
            props: {
              alignment: $widget.verticalAlignment.center,
              spacing: 3,
            },
            views: [
              {
                type: "image",
                props: {
                  uri: avatar,
                  frame: {
                    width: 20,
                    height: 20,
                  },
                  cornerRadius: {
                    value: 10,
                    style: 0,
                  },
                  resizable: true,
                },
              },
              {
                type: "text",
                props: {
                  text: title,
                  font: $font("bold", 13),
                  color: $color("#9A9AA1"),
                  minimumScaleFactor: 0.5,
                  lineLimit: 1,
                },
              },
              family == 0 ? null : counter_view,
            ],
          },
          {
            type: "hgrid",
            props: {
              rows: Array(7).fill({
                flexible: {
                  minimum: 10,
                  maximum: Infinity,
                },
                spacing: colors_column_spacing,
              }),
              spacing: colors_row_spacing,
            },
            views: colors_view,
          },
        ],
      };
    },
  });
} else {
  $widget.setTimeline({
    render: () => {
      return {
        type: "text",
        props: {
          text: "Please input inputValue",
        },
      };
    },
  });
}
