import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const IntervalBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  marginBottom: theme.spacing(4),
  flexWrap: "wrap",
}));

const IntervalButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.grey.main,
  margin: `0 ${theme.spacing(2)}`,
  padding: `${theme.spacing(0.75)} ${theme.spacing(0.5)}`,
  fontWeight: "600",

  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

const IntervalButtons = (props) => {
  const interval = props.interval;
  const onIntervalChange = props.onIntervalChange;

  const theme = useTheme();

  return (
    <IntervalBox variant="div">
      <IntervalButton
        sx={
          interval == "1d" && {
            backgroundColor: theme.palette.white.main,
            color: theme.palette.black.main,
          }
        }
        onClick={() => onIntervalChange("1d")}
      >
        1d
      </IntervalButton>
      <IntervalButton
        sx={
          interval == "7d" && {
            backgroundColor: theme.palette.white.main,
            color: theme.palette.black.main,
          }
        }
        onClick={() => onIntervalChange("7d")}
      >
        7d
      </IntervalButton>
      <IntervalButton
        sx={
          interval == "1m" && {
            backgroundColor: theme.palette.white.main,
            color: theme.palette.black.main,
          }
        }
        onClick={() => onIntervalChange("1m")}
      >
        1m
      </IntervalButton>
      <IntervalButton
        sx={
          interval == "3m" && {
            backgroundColor: theme.palette.white.main,
            color: theme.palette.black.main,
          }
        }
        onClick={() => onIntervalChange("3m")}
      >
        3m
      </IntervalButton>
      <IntervalButton
        sx={
          interval == "YTD" && {
            backgroundColor: theme.palette.white.main,
            color: theme.palette.black.main,
          }
        }
        onClick={() => onIntervalChange("YTD")}
      >
        ÅTD
      </IntervalButton>
      <IntervalButton
        sx={
          interval == "1y" && {
            backgroundColor: theme.palette.white.main,
            color: theme.palette.black.main,
          }
        }
        onClick={() => onIntervalChange("1y")}
      >
        1å
      </IntervalButton>
      <IntervalButton
        sx={
          interval == "5y" && {
            backgroundColor: theme.palette.white.main,
            color: theme.palette.black.main,
          }
        }
        onClick={() => onIntervalChange("5y")}
      >
        5å
      </IntervalButton>
    </IntervalBox>
  );
};

export default IntervalButtons;
