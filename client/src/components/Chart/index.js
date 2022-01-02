import { GoogleCharts } from "google-charts";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

import drawAreaChart from "./AreaChart";
import drawCandleStickChart from "./CandlestickChart";

const ChartBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
  width: "auto",
  height: "45rem",
  [theme.breakpoints.down("md")]: {
    height: "35rem",
  },
  [theme.breakpoints.down("sm")]: {
    height: "30rem",
  },
}));

const Chart = (props) => {
  const chartData = props.chartData;
  const chartType = props.chartType;
  const interval = props.interval;

  const theme = useTheme();

  useEffect(() => {
    if (chartData.length > 0) GoogleCharts.load(drawChart, { language: "da" });
  }, [chartData]);

  const drawChart = () => {
    if (chartType == "areaChart") drawAreaChart(chartData, theme, interval);

    if (chartType == "candleStickChart")
      drawCandleStickChart(chartData, theme, interval);
  };

  // Make chart responsive
  window.onresize = windowHasBeenResized;

  function windowHasBeenResized() {
    if (document.getElementById("chart")) {
      if (chartData.length > 0)
        GoogleCharts.load(drawChart, { language: "da" });
    }
  }

  return <ChartBox variant="div" id="chart" />;
};

export default Chart;
