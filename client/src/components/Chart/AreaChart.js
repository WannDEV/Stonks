import { GoogleCharts } from "google-charts";

const createCustomHTMLContentTooltipAreaChart = (
  date,
  price,
  volume,
  interval
) => {
  let modifiedDateString;

  const weekDays = [
    "mandag",
    "tirsdag",
    "onsdag",
    "torsdag",
    "fredag",
    "lørdag",
    "søndag",
  ];
  const dayOfWeek = weekDays[date.getDay()];
  const dd = date.getDate();
  const months = [
    "januar",
    "februar",
    "marts",
    "april",
    "maj",
    "juni",
    "juli",
    "august",
    "september",
    "oktober",
    "november",
    "december",
  ];
  const MM = months[date.getMonth()];
  const yy = date.getFullYear();
  const hh = date.getHours();
  const mm = date.getMinutes();

  if (hh < 10) hh = `0${hh}`;
  if (mm < 10) mm = `0${mm}`;

  if (interval == "1d" || interval == "7d") {
    modifiedDateString = `${dayOfWeek.slice(0, 3)} d. ${dd}. ${MM.slice(
      0,
      3
    )} ${hh}:${mm}`;
  } else {
    modifiedDateString = `${dd}. ${MM} ${yy}`;
  }

  return (
    "<div style='padding: 5px; box-shadow: 0 6px 6px hsl(0deg 0% 0% / 0.3); width: 10rem;'>" +
    "<p style='font-size: 1rem; color: #000; font-weight: bold; text-align: center; margin-bottom: 5px'>" +
    modifiedDateString +
    "</p>" +
    '<table class="">' +
    "<tr>" +
    "<td><p style='font-size: 1rem; color: #000'>Kurs: </p></td>" +
    "<td><b>" +
    "<p style='font-size: 1rem; color: #000'>" +
    price.toFixed(2) +
    "</p>" +
    "</b></td>" +
    "</tr>" +
    "<td><p style='font-size: 1rem; color: #000'>Volume: </p></td>" +
    "<td><b>" +
    "<p style='font-size: 1rem; color: #000'>" +
    volume +
    "</p>" +
    "</b></td>" +
    "</tr>" +
    "</table>" +
    "</div>"
  );
};

const drawAreaChart = (chartData, theme, interval) => {
  let dataArr = [
    ["x", "number", { type: "string", role: "tooltip", p: { html: true } }],
  ];

  for (let i = chartData.length - 1; i >= 0; --i) {
    dataArr.push([
      new Date(chartData[i].date).toLocaleDateString("da-DK"),
      chartData[i].close,
      createCustomHTMLContentTooltipAreaChart(
        new Date(chartData[i].date),
        chartData[i].close,
        chartData[i].volume,
        interval
      ),
    ]);
  }

  const data = GoogleCharts.api.visualization.arrayToDataTable(dataArr);

  // data.addColumn("x");
  // data.addColumn("number", "close");

  const options = {
    // width: 500,
    // height: 1500,
    // Colors the entire chart area, simple version
    backgroundColor: "transparent",
    // Colors the entire chart area, with opacity
    colors: [
      chartData[0].close - chartData[chartData.length - 1].close > 0
        ? theme.palette.green.main
        : theme.palette.red.main,
    ],
    hAxis: {
      gridlines: { color: theme.palette.grey.main },
      textStyle: { color: theme.palette.grey.light },
      format: "dd/MM/yy",
    },
    vAxis: {
      gridlines: { color: theme.palette.grey.main },
      textStyle: { color: theme.palette.grey.light },
    },
    legend: "none", // remove sidebar
    chartArea: { width: "90%", height: "80%" }, // remove padding from the chart
    tooltip: {
      isHtml: true,
    },
  };

  const chart = new google.visualization.AreaChart(
    document.getElementById("chart")
  );

  chart.draw(data, options);
};

export default drawAreaChart;
