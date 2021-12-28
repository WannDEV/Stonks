import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";

const ChangeChartBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
}));

const ChangeChartIconButton = styled(IconButton)(({ theme }) => ({
  width: "3rem",
  height: "3rem",
  borderRadius: "10px",
  border: `2px solid ${theme.palette.grey.main}`,
  backgroundColor: "none",
  color: theme.palette.grey.main,
  padding: theme.spacing(0.2),
  marginLeft: theme.spacing(2),
}));

const ChangeChartButtons = (props) => {
  const onChartTypeChange = props.onChartTypeChange;
  const chartType = props.chartType;

  const theme = useTheme();

  return (
    <ChangeChartBox variant="div">
      <ChangeChartIconButton
        aria-label="Change to area chart button"
        sx={
          chartType == "areaChart" && {
            border: `2px solid ${theme.palette.white.main}`,
            color: theme.palette.white.main,
          }
        }
        onClick={() => onChartTypeChange("areaChart")}
      >
        <ShowChartIcon
          sx={{ width: "100%", height: "100%", color: "inherit" }}
        />
      </ChangeChartIconButton>
      <ChangeChartIconButton
        aria-label="Change to candlestick chart button"
        sx={
          chartType == "candleStickChart" && {
            border: `2px solid ${theme.palette.white.main}`,
            color: theme.palette.white.main,
          }
        }
        onClick={() => onChartTypeChange("candleStickChart")}
      >
        <CandlestickChartIcon
          sx={{ width: "100%", height: "100%", color: "inherit" }}
        />
      </ChangeChartIconButton>
    </ChangeChartBox>
  );
};

export default ChangeChartButtons;
