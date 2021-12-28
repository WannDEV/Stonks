import { GoogleCharts } from "google-charts";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import { useEffect } from "react";

import drawAreaChart from "./AreaChart";
import drawCandleStickChart from "./CandlestickChart";

const ChartBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
  width: "100%",
  height: "35rem",
  margin: `${theme.spacing(-4)} 0 ${theme.spacing(8)} 0`,
  [theme.breakpoints.down("md")]: {
    height: "30rem"
  },
  [theme.breakpoints.down("sm")]: {
    height: "25rem"
  }
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
    if (chartData.length > 0) GoogleCharts.load(drawChart, { language: "da" });
  }

  return <ChartBox variant="div" id="chart" />;
};

export default Chart;
