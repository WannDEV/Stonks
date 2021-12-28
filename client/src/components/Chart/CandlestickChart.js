import { GoogleCharts } from "google-charts";

const createCustomHTMLContentTooltipCandleStick = (
  date,
  low,
  open,
  close,
  high,
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
    "<td><p style='font-size: 1rem; color: #000'>Laveste kurs: </p></td>" +
    "<td><b>" +
    "<p style='font-size: 1rem; color: #000'>" +
    low.toFixed(2) +
    "</p>" +
    "</b></td>" +
    "</tr>" +
    "<tr>" +
    "<td><p style='font-size: 1rem; color: #000'>Åbningskurs: </p></td>" +
    "<td><b>" +
    "<p style='font-size: 1rem; color: #000'>" +
    open.toFixed(2) +
    "</p>" +
    "</b></td>" +
    "</tr>" +
    "<tr>" +
    "<td><p style='font-size: 1rem; color: #000'>Lukkekurs: </p></td>" +
    "<td><b>" +
    "<p style='font-size: 1rem; color: #000'>" +
    close.toFixed(2) +
    "</p>" +
    "</b></td>" +
    "</tr>" +
    "<td><p style='font-size: 1rem; color: #000'>Højeste kurs: </p></td>" +
    "<td><b>" +
    "<p style='font-size: 1rem; color: #000'>" +
    high.toFixed(2) +
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

const drawCandleStickChart = (chartData, theme, interval) => {
  let counter = 0;
  let lineColor;

  let dataArr = [
    [
      "date",
      "low",
      "open",
      "close",
      "high",
      { role: "style", type: "string" },
      { type: "string", role: "tooltip", p: { html: true } },
    ],
  ];

  if (interval == "5y") {
    const chartDataLength = chartData.length - 1;
    const startDateLineColor =
      chartData[chartDataLength].close - chartData[chartDataLength].open >= 0
        ? theme.palette.green.main
        : theme.palette.red.main;
    dataArr.push([
      new Date(chartData[chartDataLength].date).toLocaleDateString("da-DK"),
      chartData[chartDataLength].low,
      chartData[chartDataLength].open,
      chartData[chartDataLength].close,
      chartData[chartDataLength].high,
      startDateLineColor,
      createCustomHTMLContentTooltipCandleStick(
        new Date(chartData[chartDataLength].date),
        chartData[chartDataLength].low,
        chartData[chartDataLength].open,
        chartData[chartDataLength].close,
        chartData[chartDataLength].high,
        chartData[chartDataLength].volume,
        interval
      ),
    ]);

    for (let i = chartData.length - 1; i >= 0; --i) {
      if (counter >= 5) {
        lineColor =
          chartData[i].close - chartData[i].open >= 0
            ? theme.palette.green.main
            : theme.palette.red.main;
        dataArr.push([
          new Date(chartData[i].date).toLocaleDateString("da-DK"),
          chartData[i].low,
          chartData[i].open,
          chartData[i].close,
          chartData[i].high,
          lineColor,
          createCustomHTMLContentTooltipCandleStick(
            new Date(chartData[i].date),
            chartData[i].low,
            chartData[i].open,
            chartData[i].close,
            chartData[i].high,
            chartData[i].volume,
            interval
          ),
        ]);
        counter = 0;
      }
      ++counter;
    }

    if (chartData.length % 5 != 0) {
      const endDateLineColor =
        chartData[0].close - chartData[0].open >= 0
          ? theme.palette.green.main
          : theme.palette.red.main;
      dataArr.push([
        new Date(chartData[0].date).toLocaleDateString("da-DK"),
        chartData[0].low,
        chartData[0].open,
        chartData[0].close,
        chartData[0].high,
        endDateLineColor,
        createCustomHTMLContentTooltipCandleStick(
          new Date(chartData[0].date),
          chartData[0].low,
          chartData[0].open,
          chartData[0].close,
          chartData[0].high,
          chartData[0].volume,
          interval
        ),
      ]);
    }
  } else {
    for (let i = chartData.length - 1; i >= 0; --i) {
      lineColor =
        chartData[i].close - chartData[i].open >= 0
          ? theme.palette.green.main
          : theme.palette.red.main;
      dataArr.push([
        new Date(chartData[i].date).toLocaleDateString("da-DK"),
        chartData[i].low,
        chartData[i].open,
        chartData[i].close,
        chartData[i].high,
        lineColor,
        createCustomHTMLContentTooltipCandleStick(
          new Date(chartData[i].date),
          chartData[i].low,
          chartData[i].open,
          chartData[i].close,
          chartData[i].high,
          chartData[i].volume,
          interval
        ),
      ]);
    }
  }

  const data = GoogleCharts.api.visualization.arrayToDataTable(dataArr);

  const options = {
    // width: 500,
    // height: 1500,
    // Colors the entire chart area, simple version
    backgroundColor: "transparent",
    // Colors the entire chart area, with opacity
    legend: "none", // remove sidebar
    chartArea: { width: "90%", height: "80%" }, // remove padding from the chart
    bar: { groupWidth: "95%" }, // Remove space between bars.
    candlestick: {
      fallingColor: {
        strokeWidth: 0,
        fill: theme.palette.red.main,
        title: "This is a label",
      }, // red
      risingColor: { strokeWidth: 0, fill: theme.palette.green.main }, // green
    },
    hAxis: {
      gridlines: { color: theme.palette.grey.main },
      textStyle: { color: theme.palette.grey.light },
      format: "dd/MM/yy",
    },
    vAxis: {
      gridlines: { color: theme.palette.grey.main },
      textStyle: { color: theme.palette.grey.light },
    },
    tooltip: {
      isHtml: true,
    },
  };

  const chart = new google.visualization.CandlestickChart(
    document.getElementById("chart")
  );

  chart.draw(data, options);
};

export default drawCandleStickChart;
