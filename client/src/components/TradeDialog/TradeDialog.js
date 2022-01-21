import { styled, alpha, useTheme, createStyles } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { DialogContent } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";

import { useAuth } from "../../shared/context/auth";

const LogoImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: "100%",
  border: `2px solid ${theme.palette.white.main}`,
}));

const CompanyProfileBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: "1",
}));

const CompanyProfileLogoBox = styled(Box)(({ theme }) => ({
  height: "5rem",
  width: "5rem",
  marginRight: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    height: "5rem",
    width: "5rem",
  },
  [theme.breakpoints.down("sm")]: {
    height: "4rem",
    width: "4rem",
  },
}));

const CompanyProfileTextBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "left",
}));

const CompanyProfileHeaderTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Source Serif Pro, serif",
  fontWeight: "600",
  fontSize: "1.8rem",
  color: theme.palette.text.primary,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.3rem",
  },
}));

const CompanyProfileSubHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.secondary,
  [theme.breakpoints.down("md")]: {
    fontSize: "0.9rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
}));

const CompanyProfileSubHeaderLineBox = styled(Box)(({ theme }) => ({
  height: "1rem",
  width: "2px",
  backgroundColor: theme.palette.grey.main,
  display: "inline-block",
  margin: `0 ${theme.spacing(1)}`,
}));
const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  textAlign: "center",
  fontSize: "2rem",
  [theme.breakpoints.up("md")]: {
    minWidth: "37rem",
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}));

const PriceTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
}));

const StockGameSelect = styled(Select)(({ theme }) => ({
  background: theme.palette.white.dark,
  border: `2px solid ${theme.palette.grey.main}`,
  "&:before": {
    borderColor: `2px solid ${theme.palette.grey.main}`,
  },
  "&:after": {
    borderColor: `2px solid ${theme.palette.grey.main}`,
  },
}));

const StockGameMenuItem = styled(MenuItem)(({ theme }) => ({
  // backgroundColor: theme.palette.grey.light,
  // "&:hover": {
  //   backgroundColor: theme.palette.grey.main,
  // },
  color: theme.palette.black.main,
}));

const StockGameFormControl = styled(FormControl)(({ theme }) => ({
  margin: `${theme.spacing(3)} 0`,
  "& label": {
    color: theme.palette.black.main,
  },
  "& div": {
    color: theme.palette.grey.main,
  },
}));

const ChangeTabBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  display: "flex",
  flexGrow: "1",
  justifyContent: "center",
  borderBottom: `2px solid ${theme.palette.grey.main}`,
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  // padding: `0 ${theme.spacing(5)}`,
  // [theme.breakpoints.down("md")]: {
  //   padding: `0 ${theme.spacing(10)}`,
  // }
}));

const BalanceSecondaryTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.secondary,
}));

const BalancePrimaryTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: "bold",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& input.MuiInput-input": {
    borderBottom: `2px solid ${theme.palette.grey.main}`,
  },
  marginBottom: theme.spacing(2),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  fontSize: "1.2rem",
  flexGrow: "1",
  margin: `${theme.spacing(2)} ${theme.spacing(3)}`,
  [theme.breakpoints.down("md")]: {
    margin: `${theme.spacing(1.5)} ${theme.spacing(1)}`,
  },
}));

const CloseButton = styled(Button)(({ theme }) => ({
  fontSize: "1.2rem",
  flexGrow: "1",
  margin: `${theme.spacing(2)} ${theme.spacing(3)}`,
  [theme.breakpoints.down("md")]: {
    margin: `${theme.spacing(1.5)} ${theme.spacing(1)}`,
  },
}));

const TradeDialog = (props) => {
  const { isAuthenticated } = useAuth();

  const handleClose = props.handleClose;
  let open = isAuthenticated ? props.open : false;
  const companyProfile = props.companyProfile;

  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedStockGame, setSelectedStockGame] = useState("");
  const [currentTab, setCurrentTab] = useState(0);
  const [inputBalance, setInputBalance] = useState(0);
  const [inputAmount, setInputAmount] = useState(0);

  const handleBalanceChange = (event) => {
    setInputBalance(event.target.value);
    setInputAmount(event.target.value / 1000); // new value divided with stock price
  };

  const handleAmountChange = (event) => {
    setInputAmount(event.target.value);
    setInputBalance(event.target.value * 1000); // new value times stock price
  };

  const onFocusOutFunc = (event) => {
    if (event.target.value == "") {
      setInputAmount(0);
      setInputBalance(0);
    }
  };

  const onFocusTextField = (event) => {
    console.log(event);
    if (event.target.value == 0) {
      setInputAmount("");
      setInputBalance("");
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  function a11yProps(index) {
    return {
      id: `action-tab-${index}`,
      "aria-controls": `action-tabpanel-${index}`,
    };
  }

  const onBuy = () => {
    console.log(
      `Purchase went through with following values: ${inputBalance}, ${inputAmount} ${companyProfile.symbol}`
    );
    setInputAmount(0);
    setInputBalance(0);

    handleClose();
  };

  const onSell = () => {
    console.log(
      `Sell went through with following values: ${inputBalance}, ${inputAmount} ${companyProfile.symbol}`
    );
    handleClose();
  };

  return (
    <div>
      {companyProfile.length != 0 && (
        <Dialog
          fullScreen={fullscreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="Login dialog"
        >
          <StyledDialogTitle
            id="login-dialog-title"
            sx={{ borderBottom: `2px solid ${theme.palette.grey.main}` }}
          >
            <Box display="flex" justifyContent="space-between">
              <CompanyProfileBox variant="div">
                <CompanyProfileLogoBox variant="div">
                  <LogoImage src={companyProfile.image} />
                </CompanyProfileLogoBox>
                <CompanyProfileTextBox variant="div">
                  <CompanyProfileHeaderTypography variant="h1">
                    {companyProfile.companyName}
                  </CompanyProfileHeaderTypography>
                  <CompanyProfileSubHeaderTypography variant="h3">
                    {companyProfile.symbol}
                    <CompanyProfileSubHeaderLineBox variant="div" />
                  </CompanyProfileSubHeaderTypography>
                </CompanyProfileTextBox>
              </CompanyProfileBox>
              <Box
                variant="div"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: "1",
                  justifyContent: "center",
                }}
              >
                <PriceTypography variant="body1">
                  Stykpris: 1000 kr.
                </PriceTypography>
              </Box>
            </Box>
          </StyledDialogTitle>
          <StyledDialogContent>
            <div>
              <StockGameFormControl fullWidth required>
                <InputLabel id="stock-game-select-label">Aktiespil</InputLabel>
                <StockGameSelect
                  labelId="stock-game-select-label"
                  id="stock-game-select"
                  value={selectedStockGame}
                  label="Aktiespil"
                  onChange={(event) => setSelectedStockGame(event.target.value)}
                >
                  <StockGameMenuItem value={"Test1"}>Test1</StockGameMenuItem>
                  <StockGameMenuItem value={"Test2"}>Test2</StockGameMenuItem>
                  <StockGameMenuItem value={"Test3"}>Test3</StockGameMenuItem>
                </StockGameSelect>
                <FormHelperText>Vælg aktiespil</FormHelperText>
              </StockGameFormControl>
              <Box
                variant="div"
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <BalanceSecondaryTypography>
                  Nuværende beholdning:{" "}
                </BalanceSecondaryTypography>
                <BalancePrimaryTypography>12345 kr.</BalancePrimaryTypography>
              </Box>
              <Box
                variant="div"
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <BalanceSecondaryTypography>
                  Nuværende værdipapirer:{" "}
                </BalanceSecondaryTypography>
                <BalancePrimaryTypography>8</BalancePrimaryTypography>
              </Box>
              <ChangeTabBox variant="div">
                <StyledTabs
                  value={currentTab}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  aria-label="Køb eller sælg tab"
                  TabIndicatorProps={{
                    style: { background: theme.palette.white.main },
                  }}
                >
                  <StyledTab
                    style={{
                      fontWeight: currentTab == 0 ? "bold" : "normal",
                      color:
                        currentTab == 0
                          ? theme.palette.white.main
                          : theme.palette.text.secondary,
                    }}
                    label="Køb"
                    {...a11yProps(0)}
                  />
                  <StyledTab
                    style={{
                      fontWeight: currentTab == 1 ? "bold" : "normal",
                      color:
                        currentTab == 1
                          ? theme.palette.white.main
                          : theme.palette.text.secondary,
                    }}
                    label="Sælg"
                    {...a11yProps(1)}
                  />
                </StyledTabs>
              </ChangeTabBox>
              <StyledTextField
                id="balance-text-field"
                label={
                  currentTab == 0
                    ? "Beløb du vil bruge"
                    : "Beløb du vil sælge for"
                }
                variant="standard"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                color="success"
                value={inputBalance}
                onChange={handleBalanceChange}
                onBlur={onFocusOutFunc}
                onFocus={onFocusTextField}
              />
              <StyledTextField
                id="amount-text-field"
                label={
                  currentTab == 0 ? "Mængde du vil købe" : "Mængde du vil sælge"
                }
                variant="standard"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                color="success"
                value={inputAmount}
                onChange={handleAmountChange}
                onBlur={onFocusOutFunc}
                onFocus={onFocusTextField}
              />
            </div>
            <Box
              variant="div"
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <ActionButton
                variant={
                  inputAmount == 0 || inputBalance == 0
                    ? "outlined"
                    : "contained"
                }
                onClick={currentTab == 0 ? onBuy : onSell}
                disabled={inputAmount == 0 || inputBalance == 0}
                // classes={{
                //   disabled: { backgroundColor: theme.palette.primary.main },
                // }}
              >
                {currentTab == 0 ? "Køb" : "Sælg"}
              </ActionButton>
              <CloseButton onClick={handleClose} variant="contained">
                Luk
              </CloseButton>
            </Box>
          </StyledDialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TradeDialog;
