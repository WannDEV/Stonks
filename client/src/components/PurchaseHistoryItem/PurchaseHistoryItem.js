import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { withStyles } from "@material-ui/core/styles";

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
  borderTop: `1px solid ${theme.palette.grey.main}`,
  "&:first-of-type": {
    borderTop: "none",
  },
}));

const InformationBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
}));

const InformationTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.primary,
}));

const StockGameTypography = styled(Typography)(({ theme }) => ({
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
}));

const SuccessButton = styled(Button)(({ theme }) => ({
  width: "8rem",
  [theme.breakpoints.down("sm")]: {
    width: "7rem",
  },
}));

const FailureButton = styled(Button)(({ theme }) => ({
  width: "8rem",
  [theme.breakpoints.down("sm")]: {
    width: "7rem",
  },
}));

const PendingButton = styled(Button)(({ theme }) => ({
  width: "8rem",
  [theme.breakpoints.down("sm")]: {
    width: "7rem",
  },
}));

const PurchaseHistoryItem = (props) => {
  const theme = useTheme();

  const price = props.price;
  const amount = props.amount;
  const dateOfPurchase = props.dateOfPurchase;
  const kind = props.kind;
  const id = props.id;
  const status = props.status;
  const stockGame = props.stockGame;
  const symbol = props.symbol;

  const { classes } = props;

  const dateToCustomDateString = (date, interval) => {
    let dateString = "Undefined";

    const weekDays = [
      "mandag",
      "tirsdag",
      "onsdag",
      "torsdag",
      "fredag",
      "lørdag",
      "søndag",
    ];
    const dayOfWeek = weekDays[date.getDay() - 1];
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
      dateString = `${dayOfWeek.slice(0, 3)} d. ${dd}. ${MM.slice(
        0,
        3
      )} ${hh}:${mm}`;
    } else {
      dateString = `${dd}. ${MM} ${yy}`;
    }
    return dateString;
  };

  return (
    <StyledBox variant="div">
      <InformationBox variant="div">
        <StockGameTypography variant="body1">
          {stockGame} / {symbol}
        </StockGameTypography>
        <InformationTypography
          sx={{
            color:
              kind == "buy" ? theme.palette.green.main : theme.palette.red.main,
            fontWeight: "bold",
          }}
          variant="body1"
        >
          {kind == "buy" ? "Køb" : "Salg"}
        </InformationTypography>
        <InformationTypography variant="body1">
          {kind == "buy" ? "Købspris" : "Salgspris"} : {price}
        </InformationTypography>
        <InformationTypography variant="body1">
          Mængde : {amount}
        </InformationTypography>
      </InformationBox>
      <ActionBox variant="div">
        <DateTypography variant="body1">
          {dateToCustomDateString(dateOfPurchase, "1d")}
        </DateTypography>
        {status == "pending" && (
          <PendingButton variant="contained">Afbryd</PendingButton>
        )}
        {status == "success" && (
          <SuccessButton
            variant="outlined"
            disabled
            classes={{ disabled: classes.disabledButton }}
          >
            Gennemført
          </SuccessButton>
        )}
        {status == "failure" && (
          <FailureButton
            variant="outlined"
            disabled
            classes={{ disabled: classes.disabledButton }}
          >
            Afvist
          </FailureButton>
        )}
      </ActionBox>
    </StyledBox>
  );
};

export default withStyles(styles, { withTheme: true })(PurchaseHistoryItem);
