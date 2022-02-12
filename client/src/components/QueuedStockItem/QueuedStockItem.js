import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Router from "next/router";
import { withStyles } from "@material-ui/core/styles";

import api from "../../services/api";
import { useAuth } from "../../shared/context/auth";

const styles = (theme) => ({
  disabledButton: {
    border: "1px solid #ffffff !important",
  },
});

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  padding: `${theme.spacing(3)} 0`,
  borderBottom: `1px solid ${theme.palette.grey.main}`,
}));

const InformationBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: "60%",
  flexDirection: "column",
}));

const InformationTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.primary,
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  color: theme.palette.text.primary,
  fontWeight: "bold",
}));

const ActionBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: "1",
  justifyContent: "space-between",
  flexDirection: "column",
  alignItems: "flex-end",
}));

const DateTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.secondary,
  textTransform: "capitalize",
  textAlign: "right",
}));

const ActionButton = styled(Button)(({ theme }) => ({
  width: "8rem",
  [theme.breakpoints.down("sm")]: {
    width: "6rem",
  },
}));

const QueuedStockItem = (props) => {
  const symbol = props.symbol;
  const spendingPrice = props.spendingPrice;
  const activeFrom = new Date(props.activeFrom);
  const id = props.id;
  const tradeType = props.tradeType;
  const stockName = props.stockName;
  const isCancelled = props.isCancelled;
  const cancellationAt = props.cancellationAt;

  cancellationAt = cancellationAt ? new Date(cancellationAt) : cancellationAt;

  const { classes } = props;

  const { selectedGame } = useAuth();
  const theme = useTheme();

  const [countdownString, setCountdownString] = useState("Udefineret");
  const [countdownToCancelString, setCountdownToCancelString] =
    useState("Udefineret");

  useEffect(() => {
    const date = new Date();
    var timeLeft = (activeFrom.getTime() - date.getTime()) / 1000;
    var timeLeftToCancel =
      isCancelled && cancellationAt
        ? (cancellationAt.getTime() - date.getTime()) / 1000
        : null;
    let isFirstTime = true;

    console.log(timeLeftToCancel);

    const calculateTimeLeftString = (timeLeft) => {
      var days = Math.floor(timeLeft / 24 / 60 / 60);
      var hoursLeft = Math.floor(timeLeft - days * 86400);
      var hours = Math.floor(hoursLeft / 3600);
      var minutesLeft = Math.floor(hoursLeft - hours * 3600);
      var minutes = Math.floor(minutesLeft / 60);

      function pad(n) {
        return n < 10 ? "0" + n : n;
      }
      return days == 0
        ? pad(hours) + "t" + pad(minutes) + "min"
        : pad(days) + "d" + pad(hours) + "t" + pad(minutes) + "min";
    };

    const timer = () => {
      setCountdownString(calculateTimeLeftString(timeLeft));

      if (timeLeftToCancel <= 20 * 60 && timeLeftToCancel >= 0) {
        setCountdownToCancelString(calculateTimeLeftString(timeLeftToCancel));
      }

      if (timeLeftToCancel <= 0) {
        setCountdownToCancelString("0t0min");
      }

      if (timeLeft <= 0 && !isCancelled) {
        clearInterval(countdownTimer);
        setCountdownString("0t0min");
      } else if (timeLeftToCancel <= 0 && isCancelled) {
        clearInterval(countdownTimer);
      } else {
        if (!isFirstTime) {
          timeLeft -= 60;
          if (isCancelled) timeLeftToCancel -= 60;
        }
        isFirstTime = false;
      }
    };

    timer();
    var countdownTimer = setInterval(timer, 60 * 1000);

    return () => {
      clearInterval(countdownTimer);
      setCountdownString("Udefineret");
    };
  }, []);

  const cancelPendingStock = async () => {
    await api({
      method: "POST",
      url: "stock/cancel_stock",
      data: {
        pendingStockId: id,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status == 200 || response.statusCode == 200) {
          Router.reload("/");
        }
      })
      .catch((err) => {
        Router.push("/error-page");
        console.log(err);
      });
  };

  return (
    <StyledBox variant="div">
      <InformationBox variant="div">
        <HeaderTypography variant="body1">{stockName}</HeaderTypography>
        <InformationTypography
          sx={{
            color:
              tradeType == "buy"
                ? theme.palette.green.main
                : theme.palette.red.main,
            fontWeight: "bold",
          }}
          variant="body1"
        >
          {tradeType == "buy" ? "Køb" : "Salg"}
        </InformationTypography>
        <InformationTypography variant="body1">
          Beløb : {Math.round((spendingPrice + Number.EPSILON) * 100) / 100}
        </InformationTypography>
      </InformationBox>
      <ActionBox variant="div">
        <DateTypography variant="body1">
          {isCancelled
            ? `Annulleres om ${countdownToCancelString}`
            : `Gennemføres om ${countdownString}`}
        </DateTypography>
        <ActionButton
          variant={isCancelled ? "outlined" : "contained"}
          onClick={cancelPendingStock}
          disabled={isCancelled}
          classes={{
            disabled: isCancelled ? classes.disabledButton : null,
          }}
        >
          {isCancelled ? "Annulleret" : "Annuller"}
        </ActionButton>
      </ActionBox>
    </StyledBox>
  );
};

export default withStyles(styles, { withTheme: true })(QueuedStockItem);
