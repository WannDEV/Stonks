import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import LoginDialog from "../../components/Auth/Login";
import Container from "@mui/material/Container";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import DatePicker, { registerLocale } from "react-datepicker";
import da from "date-fns/locale/da";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Radio from "@mui/material/Radio";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import IconButton from "@mui/material/IconButton";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Divider from "@mui/material/Divider";
import ErrorIcon from "@mui/icons-material/Error";
import Router from "next/router";

import { useAuth } from "../../shared/context/auth";
import api from "../../services/api";

// Flag imports
import DenmarkFlag from "../../../assets/FlagIcons/denmark.svg";
import FinlandFlag from "../../../assets/FlagIcons/finland.svg";
import GermanyFlag from "../../../assets/FlagIcons/germany.svg";
import GlobeFlag from "../../../assets/FlagIcons/globe.svg";
import CryptoFlag from "../../../assets/FlagIcons/crypto.svg";
import NorwayFlag from "../../../assets/FlagIcons/norway.svg";
import SwedenFlag from "../../../assets/FlagIcons/sweden.svg";
import USAFlag from "../../../assets/FlagIcons/usa.svg";

registerLocale("da", da);

const NewInputBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexGrow: "1",
  flexDirection: "column",
  marginTop: theme.spacing(4),
}));

const NewInputTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Source Serif Pro, serif",
  color: theme.palette.text.primary,
  fontSize: "1.8rem",
  display: "flex",
  fontWeight: "bold",
  textTransform: "capitalize",
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.down("md")]: {
    fontSize: "1.6rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.3rem",
  },
}));

const NewInputDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.9rem",
  display: "flex",
  marginBottom: theme.spacing(1.5),
}));

const NameTextField = styled(TextField)(({ theme }) => ({
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey.main,
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      border: `2px solid ${theme.palette.white.main}`,
    },
  },
}));

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  display: "flex",
  width: "16rem",
}));

const RadioLabelContainerBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: "1",
  alignItems: "center",
  marginTop: theme.spacing(1),
  flexWrap: "wrap",
}));

const RadioLabel = styled("label")(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "8px",
  justifyContent: "left",
  marginRight: theme.spacing(5),
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    marginRight: "0",
  },
  marginBottom: theme.spacing(2),
}));

const RadioButton = styled(Radio)(({ theme }) => ({
  display: "inline-flex",
}));

const RadioBoxContent = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
}));

const RadioBoxContentMarkets = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  justifyContent: "space-between",
  flexGrow: "1",
  alignItems: "center",
}));

const CustomDateFieldInput = styled("input")(({ theme }) => ({
  backgroundColor: "transparent",
  color: theme.palette.white.main,
  border: "none",
  fontSize: "1rem",
}));

const StyledCalendarTodayIcon = styled(CalendarTodayIcon)(({ theme }) => ({
  color: theme.palette.white.main,
  width: "1.2rem",
  height: "1.2rem",
  display: "inline",
  top: theme.spacing(1.2),
  right: "0",
  position: "relative",
  marginRight: theme.spacing(0.5),
}));

const DateLabel = styled("label")(({ theme }) => ({
  border: `1px solid ${theme.palette.grey.main}`,
  padding: theme.spacing(1.6),
  position: "relative",
  borderRadius: "8px",
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
  },
  display: "inline-flex",
  marginBottom: theme.spacing(2),
}));

const RadioBoxTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.primary,
}));

const CommissionTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: theme.palette.white.main, // Text color
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: theme.palette.grey.main, // Semi-transparent underline
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: theme.palette.white.main, // Solid underline on hover
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.white.main, // Solid underline on focus
  },
  maxWidth: "7rem",
  marginLeft: theme.spacing(2),
}));

const StartBalanceTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: theme.palette.white.main, // Text color
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: theme.palette.grey.main, // Semi-transparent underline
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: theme.palette.white.main, // Solid underline on hover
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.white.main, // Solid underline on focus
  },
  maxWidth: "7rem",
  marginLeft: theme.spacing(2),
}));

const DurationTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: theme.palette.white.main, // Text color
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: theme.palette.grey.main, // Semi-transparent underline
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: theme.palette.white.main, // Solid underline on hover
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.white.main, // Solid underline on focus
  },
  maxWidth: "8rem",
  marginLeft: theme.spacing(2),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({}));

const StyledCheckBoxIcon = styled(CheckBoxIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const StyledCheckBoxOutlineBlankIcon = styled(CheckBoxOutlineBlankIcon)(
  ({ theme }) => ({
    color: theme.palette.grey.main,
  })
);

const ActionButton = styled(Button)(({ theme }) => ({
  margin: `${theme.spacing(6)} ${theme.spacing(1)}`,
  width: "20rem",
  fontSize: "1.1rem",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Source Serif Pro, serif",
  fontSize: "2.5rem",
  color: theme.palette.text.primary,
  fontWeight: "bold",
  marginTop: theme.spacing(4),
  textTransform: "capitalize",
  [theme.breakpoints.down("md")]: {
    fontSize: "2.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.8rem",
  },
}));

const SubHeaderTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
  textAlign: "center",
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.grey.main,
}));

const StyledErrorIcon = styled(ErrorIcon)(({ theme }) => ({
  color: theme.palette.error.main,
}));

const ErrorTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
}));

const ErrorBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(4),
  flexDirection: "column",
}));

const ErrorBoxItem = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  marginBottom: theme.spacing(1),
}));

const CreateNewGame = (props) => {
  const { isAuthenticated, changeSelectedGame } = useAuth();
  const theme = useTheme();

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [commission, setCommission] = useState("");
  const [startBalance, setStartBalance] = useState("");
  const [duration, setDuration] = useState("");

  const maxDatePicker = new Date();
  maxDatePicker.setDate(maxDatePicker.getDate() + 60);

  // radio button states
  const [startDateRadioButton, setStartDateRadioButton] = useState(0);
  const [commissionRadioButton, setCommissionRadioButton] = useState(0);
  const [startBalanceRadioButton, setStartBalanceRadioButton] = useState(0);
  const [durationRadioButton, setDurationRadioButton] = useState(0);

  // textfield error states
  const [commissionError, setCommissionError] = useState(false);
  const [startBalanceError, setStartBalanceError] = useState(false);
  const [durationError, setDurationError] = useState(false);

  // Allowed market states
  const [isGlobalAllowed, setIsGlobalAllowed] = useState(true);
  const [isDenmarkAllowed, setIsDenmarkAllowed] = useState(true);
  const [isNorwayAllowed, setIsNorwayAllowed] = useState(true);
  const [isSwedenAllowed, setIsSwedenAllowed] = useState(true);
  const [isFinlandAllowed, setIsFinlandAllowed] = useState(true);
  const [isGermanyAllowed, setIsGermanyAllowed] = useState(true);
  const [isUSAAllowed, setIsUSAAllowed] = useState(true);
  const [isCryptoAllowed, setIsCryptoAllowed] = useState(false);

  // action button
  const [isDurationFine, setIsDurationFine] = useState(true);
  const [isCommissionFine, setIsCommissionFine] = useState(true);
  const [isStartBalanceFine, setIsStartBalanceFine] = useState(true);
  const [isInputFine, setIsInputFine] = useState(true);

  useEffect(() => {
    setIsInputFine(isDurationFine && isCommissionFine && isStartBalanceFine);
  }, [isDurationFine, isCommissionFine, isStartBalanceFine]);

  useEffect(() => {
    let isDurationFine = true;
    if (durationRadioButton == 2)
      isDurationFine =
        duration >= 1 && duration <= 365 && typeof duration == "number";
    setIsDurationFine(isDurationFine);
  }, [durationRadioButton, duration]);

  useEffect(() => {
    let isCommissionFine = true;
    if (commissionRadioButton == 2)
      isCommissionFine =
        commission >= 0 && commission <= 100 && typeof commission == "number";
    setIsCommissionFine(isCommissionFine);
  }, [commissionRadioButton, commission]);

  useEffect(() => {
    let isStartBalanceFine = true;
    if (startBalanceRadioButton == 2)
      isStartBalanceFine =
        startBalance >= 1 &&
        startBalance <= 1000000000 &&
        typeof startBalance == "number";
    setIsStartBalanceFine(isStartBalanceFine);
  }, [startBalanceRadioButton, startBalance]);

  const createGame = async () => {
    console.log("Create game method has been called");
    const finalName = name == "" ? "Mit første spil" : name;

    let finalAllowedMarkets = [];
    if (isGlobalAllowed) finalAllowedMarkets.push("global");
    if (isDenmarkAllowed) finalAllowedMarkets.push("denmark");
    if (isNorwayAllowed) finalAllowedMarkets.push("norway");
    if (isSwedenAllowed) finalAllowedMarkets.push("sweden");
    if (isFinlandAllowed) finalAllowedMarkets.push("finland");
    if (isGermanyAllowed) finalAllowedMarkets.push("germany");
    if (isUSAAllowed) finalAllowedMarkets.push("usa");
    if (isCryptoAllowed) finalAllowedMarkets.push("crypto");

    let finalCommission;
    if (commissionRadioButton == 0) finalCommission = 0;
    else if (commissionRadioButton == 1) finalCommission = 0.15;
    else finalCommission = commission;

    let finalStartBalance;
    if (startBalanceRadioButton == 0) finalStartBalance = 500000;
    else if (startBalanceRadioButton == 1) finalStartBalance = 1000000;
    else finalStartBalance = startBalance;

    let finalDuration;
    if (durationRadioButton == 0) finalDuration = 30;
    else if (durationRadioButton == 1) finalDuration = 60;
    else finalDuration = duration;

    await api
      .post("game/create_game", {
        name: finalName,
        allowedMarkets: finalAllowedMarkets,
        commission: finalCommission,
        startBalance: finalStartBalance,
        startDate,
        duration: finalDuration,
      })
      .then((response) => {
        if (response.data) {
          changeSelectedGame(response.data.gameId);
          Router.push("/");
        }
      })
      .catch((err) => console.log(`Could not create game: ${err}`));
  };

  const handleLoginDialogClose = () => setIsLoginDialogOpen(false);
  const handleLoginDialogOpen = () => setIsLoginDialogOpen(true);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const commissionOnFocus = () => {
    setCommissionError(false);
  };

  const commissionOnBlur = () => {
    if (commission < 0 || commission > 100 || commission == "") {
      setCommission("");
      setCommissionError(true);
    }
  };

  const startBalanceOnFocus = () => {
    setStartBalanceError(false);
  };

  const startBalanceOnBlur = () => {
    if (startBalance >= 1000000000 || startBalance < 1 || startBalance == "") {
      setStartBalance("");
      setStartBalanceError(true);
    }
  };

  const durationOnFocus = () => {
    setDurationError(false);
  };

  const durationOnBlur = () => {
    if (duration < 1 || duration > 365 || duration == "") {
      setDuration("");
      setDurationError(true);
    }
  };

  const CustomDateFieldInputFunc = ({ onClick }) => {
    return (
      <div>
        <DateLabel
          onClick={onClick}
          sx={{
            borderColor:
              startDateRadioButton == 1
                ? theme.palette.primary.main
                : theme.palette.grey.main,
          }}
        >
          <RadioButton
            value={1}
            checked={startDateRadioButton == 1}
            onChange={() => setStartDateRadioButton(1)}
          />
          <StyledCalendarTodayIcon />
          <CustomDateFieldInput
            placeholder={"Valgfri dato"}
            defaultValue={
              startDateRadioButton == 1
                ? format(startDate, "'Kl. 'HH:mm ' d. 'dd-MM-yyyy")
                : "Valgfri dato"
            }
            onClick={() => setStartDateRadioButton(1)}
          />
        </DateLabel>
      </div>
    );
  };

  return (
    <div>
      <Container maxWidth="md">
        <HeaderBox>
          <HeaderTypography variant="h2">
            Opret dit{" "}
            <Box
              variant="span"
              sx={{
                color: theme.palette.primary.main,
                display: "inline-block",
              }}
            >
              aktiespil
            </Box>
          </HeaderTypography>
          <SubHeaderTypography>
            Udfyld nedenstående formular og kom i gang med dit spil
          </SubHeaderTypography>
        </HeaderBox>
        <StyledDivider />
        <NewInputBox variant="div">
          <NewInputTitle variant="h3">Spillets navn</NewInputTitle>
          <NewInputDescription variant="body1">
            Dette navn kan ses af andre.
          </NewInputDescription>
          <NameTextField
            fullWidth
            id="nameTextField"
            value={name}
            placeholder="Mit første spil"
            onChange={onNameChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ maxLength: 32 }}
          />
        </NewInputBox>
        <NewInputBox variant="div">
          <NewInputTitle variant="h3">Startdato</NewInputTitle>
          <NewInputDescription variant="body1">
            Spillet vil starte på den valgte dato. Spillet kan højst starte 60
            dage frem.
          </NewInputDescription>
          <RadioLabelContainerBox
            variant="div"
            sx={{ flexWrap: { md: "nowrap" } }}
          >
            <RadioLabel
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
              sx={{
                borderColor:
                  startDateRadioButton == 0
                    ? theme.palette.primary.main
                    : theme.palette.grey.main,
                width: "16rem",
              }}
            >
              <RadioButton
                value={0}
                checked={startDateRadioButton == 0}
                onChange={() => setStartDateRadioButton(0)}
              />
              <RadioBoxContent variant="div">
                <RadioBoxTypography variant="body1">
                  Start spillet nu
                </RadioBoxTypography>
              </RadioBoxContent>
            </RadioLabel>
            <StyledDatePicker
              showTimeSelect
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              locale="da"
              minDate={new Date()}
              maxDate={maxDatePicker}
              customInput={<CustomDateFieldInputFunc />}
            />
          </RadioLabelContainerBox>
        </NewInputBox>

        <NewInputBox variant="div">
          <NewInputTitle variant="h3">Varighed</NewInputTitle>
          <NewInputDescription variant="body1">
            Dette er hvor lang tid spillet vil være aktivt.
          </NewInputDescription>
          <RadioLabelContainerBox variant="div">
            <RadioLabel
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
              sx={{
                borderColor:
                  durationRadioButton == 0
                    ? theme.palette.primary.main
                    : theme.palette.grey.main,
                width: "13rem",
              }}
            >
              <RadioButton
                value={0}
                checked={durationRadioButton == 0}
                onChange={() => {
                  setDurationRadioButton(0);
                  setDurationError(false);
                }}
              />
              <RadioBoxContent variant="div">
                <RadioBoxTypography variant="body1">30 dage</RadioBoxTypography>
              </RadioBoxContent>
            </RadioLabel>
            <RadioLabel
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
              sx={{
                borderColor:
                  durationRadioButton == 1
                    ? theme.palette.primary.main
                    : theme.palette.grey.main,
                width: "13rem",
              }}
            >
              <RadioButton
                value={0}
                checked={durationRadioButton == 1}
                onChange={() => {
                  setDurationRadioButton(1);
                  setDurationError(false);
                }}
              />
              <RadioBoxContent variant="div">
                <RadioBoxTypography variant="body1">60 dage</RadioBoxTypography>
              </RadioBoxContent>
            </RadioLabel>
            <RadioLabel
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
              sx={{
                borderColor:
                  durationRadioButton == 2
                    ? theme.palette.primary.main
                    : theme.palette.grey.main,
                width: "19rem",
              }}
            >
              <RadioButton
                value={0}
                checked={durationRadioButton == 2}
                onChange={() => setDurationRadioButton(2)}
              />
              <RadioBoxContent variant="div">
                <RadioBoxTypography variant="body1">
                  Andet (dage)
                </RadioBoxTypography>
                <DurationTextField
                  id="duration-custom"
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                  type="number"
                  placeholder="Højst 365 dage"
                  variant="standard"
                  onClick={() => setDurationRadioButton(2)}
                  onBlur={durationOnBlur}
                  onFocus={durationOnFocus}
                  error={durationError}
                  helperText={
                    durationError
                      ? "Varigheden skal være mellem 1-365 dage"
                      : ""
                  }
                />
              </RadioBoxContent>
            </RadioLabel>
          </RadioLabelContainerBox>
        </NewInputBox>
        <NewInputBox variant="div">
          <NewInputTitle variant="h3">Kurtage</NewInputTitle>
          <NewInputDescription variant="body1">
            Dette er den procentdel der vil blive trukket fra ved handler.
          </NewInputDescription>
          <RadioLabelContainerBox variant="div">
            <RadioLabel
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
              sx={{
                borderColor:
                  commissionRadioButton == 0
                    ? theme.palette.primary.main
                    : theme.palette.grey.main,
                width: "13rem",
              }}
            >
              <RadioButton
                value={0}
                checked={commissionRadioButton == 0}
                onChange={() => {
                  setCommissionRadioButton(0);
                  setCommissionError(false);
                }}
              />
              <RadioBoxContent variant="div">
                <RadioBoxTypography variant="body1">
                  Ingen kurtage
                </RadioBoxTypography>
              </RadioBoxContent>
            </RadioLabel>
            <RadioLabel
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
              sx={{
                borderColor:
                  commissionRadioButton == 1
                    ? theme.palette.primary.main
                    : theme.palette.grey.main,
                width: "13rem",
              }}
            >
              <RadioButton
                value={0}
                checked={commissionRadioButton == 1}
                onChange={() => {
                  setCommissionRadioButton(1);
                  setCommissionError(false);
                }}
              />
              <RadioBoxContent variant="div">
                <RadioBoxTypography variant="body1">
                  0,15% (standard)
                </RadioBoxTypography>
              </RadioBoxContent>
            </RadioLabel>
            <RadioLabel
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
              sx={{
                borderColor:
                  commissionRadioButton == 2
                    ? theme.palette.primary.main
                    : theme.palette.grey.main,
                width: "19rem",
              }}
            >
              <RadioButton
                value={0}
                checked={commissionRadioButton == 2}
                onChange={() => setCommissionRadioButton(2)}
              />
              <RadioBoxContent variant="div">
                <RadioBoxTypography variant="body1">
                  Andet (%)
                </RadioBoxTypography>
                <CommissionTextField
                  id="commission-custom"
                  value={commission}
                  onChange={(event) => setCommission(event.target.value)}
                  type="number"
                  placeholder="0-100"
                  variant="standard"
                  onClick={() => setCommissionRadioButton(2)}
                  inputProps={{ maxLength: 5 }}
                  onBlur={commissionOnBlur}
                  onFocus={commissionOnFocus}
                  error={commissionError}
                  helperText={
                    commissionError ? "Kurtagen skal være mellem 0-100%" : ""
                  }
                />
              </RadioBoxContent>
            </RadioLabel>
          </RadioLabelContainerBox>
        </NewInputBox>
        <NewInputBox variant="div">
          <NewInputTitle variant="h3">Startbeløb</NewInputTitle>
          <NewInputDescription variant="body1">
            Dette er det beløb deltagerne vil modtage når de tilmelder sig
            spillet.
          </NewInputDescription>
          <RadioLabelContainerBox variant="div">
            <RadioLabel
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
              sx={{
                borderColor:
                  startBalanceRadioButton == 0
                    ? theme.palette.primary.main
                    : theme.palette.grey.main,
                width: "13rem",
              }}
            >
              <RadioButton
                value={0}
                checked={startBalanceRadioButton == 0}
                onChange={() => {
                  setStartBalanceRadioButton(0);
                  setStartBalanceError(false);
                }}
              />
              <RadioBoxContent variant="div">
                <RadioBoxTypography variant="body1">
                  500.000 kr.
                </RadioBoxTypography>
              </RadioBoxContent>
            </RadioLabel>
            <RadioLabel
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
              sx={{
                borderColor:
                  startBalanceRadioButton == 1
                    ? theme.palette.primary.main
                    : theme.palette.grey.main,
                width: "13rem",
              }}
            >
              <RadioButton
                value={0}
                checked={startBalanceRadioButton == 1}
                onChange={() => {
                  setStartBalanceRadioButton(1);
                  setStartBalanceError(false);
                }}
              />
              <RadioBoxContent variant="div">
                <RadioBoxTypography variant="body1">
                  1.000.000 kr.
                </RadioBoxTypography>
              </RadioBoxContent>
            </RadioLabel>
            <RadioLabel
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
              sx={{
                borderColor:
                  startBalanceRadioButton == 2
                    ? theme.palette.primary.main
                    : theme.palette.grey.main,
                width: "19rem",
              }}
            >
              <RadioButton
                value={0}
                checked={startBalanceRadioButton == 2}
                onChange={() => setStartBalanceRadioButton(2)}
              />
              <RadioBoxContent variant="div">
                <RadioBoxTypography variant="body1">
                  Andet (kr.)
                </RadioBoxTypography>
                <StartBalanceTextField
                  id="start-balance-custom"
                  value={startBalance}
                  onChange={(event) => setStartBalance(event.target.value)}
                  type="number"
                  placeholder="Op til 1 mia"
                  variant="standard"
                  onClick={() => setStartBalanceRadioButton(2)}
                  inputProps={{ maxLength: 10 }}
                  onBlur={startBalanceOnBlur}
                  onFocus={startBalanceOnFocus}
                  error={startBalanceError}
                  helperText={
                    startBalanceError
                      ? "Startbeløbet må ikke overskride 1 mia og skal min være 1 kr."
                      : ""
                  }
                />
              </RadioBoxContent>
            </RadioLabel>
          </RadioLabelContainerBox>
        </NewInputBox>

        <NewInputBox variant="div">
          <NewInputTitle variant="h3">Tilladte markeder</NewInputTitle>
          <NewInputDescription variant="body1">
            Dette er de tilladte markeder man kan købe aktier fra
          </NewInputDescription>
          <RadioLabelContainerBox variant="div">
            <RadioLabel
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
              sx={{
                borderColor: isGlobalAllowed
                  ? theme.palette.primary.main
                  : theme.palette.grey.main,
                width: "13rem",
              }}
            >
              <StyledIconButton
                onClick={() => {
                  if (!isGlobalAllowed == true) {
                    setIsDenmarkAllowed(true);
                    setIsFinlandAllowed(true);
                    setIsNorwayAllowed(true);
                    setIsSwedenAllowed(true);
                    setIsGermanyAllowed(true);
                    setIsUSAAllowed(true);
                  }
                  setIsGlobalAllowed(!isGlobalAllowed);
                }}
              >
                {isGlobalAllowed ? (
                  <StyledCheckBoxIcon />
                ) : (
                  <StyledCheckBoxOutlineBlankIcon />
                )}
              </StyledIconButton>
              <RadioBoxContentMarkets variant="div">
                <RadioBoxTypography variant="body1">Globalt</RadioBoxTypography>
                <GlobeFlag width="32" height="32" />
              </RadioBoxContentMarkets>
            </RadioLabel>
            <RadioLabel
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
              sx={{
                borderColor: isDenmarkAllowed
                  ? theme.palette.primary.main
                  : theme.palette.grey.main,
                width: "13rem",
              }}
            >
              <StyledIconButton
                onClick={() => setIsDenmarkAllowed(!isDenmarkAllowed)}
              >
                {isDenmarkAllowed ? (
                  <StyledCheckBoxIcon />
                ) : (
                  <StyledCheckBoxOutlineBlankIcon />
                )}
              </StyledIconButton>
              <RadioBoxContentMarkets variant="div">
                <RadioBoxTypography variant="body1">Danmark</RadioBoxTypography>
                <DenmarkFlag width="32" height="32" />
              </RadioBoxContentMarkets>
            </RadioLabel>
            <RadioLabel
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
              sx={{
                borderColor: isNorwayAllowed
                  ? theme.palette.primary.main
                  : theme.palette.grey.main,
                width: "13rem",
              }}
            >
              <StyledIconButton
                onClick={() => setIsNorwayAllowed(!isNorwayAllowed)}
              >
                {isNorwayAllowed ? (
                  <StyledCheckBoxIcon />
                ) : (
                  <StyledCheckBoxOutlineBlankIcon />
                )}
              </StyledIconButton>
              <RadioBoxContentMarkets variant="div">
                <RadioBoxTypography variant="body1">Norge</RadioBoxTypography>
                <NorwayFlag width="32" height="32" />
              </RadioBoxContentMarkets>
            </RadioLabel>
            <RadioLabel
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
              sx={{
                borderColor: isSwedenAllowed
                  ? theme.palette.primary.main
                  : theme.palette.grey.main,
                width: "13rem",
              }}
            >
              <StyledIconButton
                onClick={() => setIsSwedenAllowed(!isSwedenAllowed)}
              >
                {isSwedenAllowed ? (
                  <StyledCheckBoxIcon />
                ) : (
                  <StyledCheckBoxOutlineBlankIcon />
                )}
              </StyledIconButton>
              <RadioBoxContentMarkets variant="div">
                <RadioBoxTypography variant="body1">Sverige</RadioBoxTypography>
                <SwedenFlag width="32" height="32" />
              </RadioBoxContentMarkets>
            </RadioLabel>
            <RadioLabel
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
              sx={{
                borderColor: isFinlandAllowed
                  ? theme.palette.primary.main
                  : theme.palette.grey.main,
                width: "13rem",
              }}
            >
              <StyledIconButton
                onClick={() => setIsFinlandAllowed(!isFinlandAllowed)}
              >
                {isFinlandAllowed ? (
                  <StyledCheckBoxIcon />
                ) : (
                  <StyledCheckBoxOutlineBlankIcon />
                )}
              </StyledIconButton>
              <RadioBoxContentMarkets variant="div">
                <RadioBoxTypography variant="body1">Finland</RadioBoxTypography>
                <FinlandFlag width="32" height="32" />
              </RadioBoxContentMarkets>
            </RadioLabel>
            <RadioLabel
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
              sx={{
                borderColor: isGermanyAllowed
                  ? theme.palette.primary.main
                  : theme.palette.grey.main,
                width: "13rem",
              }}
            >
              <StyledIconButton
                onClick={() => setIsGermanyAllowed(!isGermanyAllowed)}
              >
                {isGermanyAllowed ? (
                  <StyledCheckBoxIcon />
                ) : (
                  <StyledCheckBoxOutlineBlankIcon />
                )}
              </StyledIconButton>
              <RadioBoxContentMarkets variant="div">
                <RadioBoxTypography variant="body1">
                  Tyskland
                </RadioBoxTypography>
                <GermanyFlag width="32" height="32" />
              </RadioBoxContentMarkets>
            </RadioLabel>
            <RadioLabel
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
              sx={{
                borderColor: isUSAAllowed
                  ? theme.palette.primary.main
                  : theme.palette.grey.main,
                width: "13rem",
              }}
            >
              <StyledIconButton onClick={() => setIsUSAAllowed(!isUSAAllowed)}>
                {isUSAAllowed ? (
                  <StyledCheckBoxIcon />
                ) : (
                  <StyledCheckBoxOutlineBlankIcon />
                )}
              </StyledIconButton>
              <RadioBoxContentMarkets variant="div">
                <RadioBoxTypography variant="body1">USA</RadioBoxTypography>
                <USAFlag width="32" height="32" />
              </RadioBoxContentMarkets>
            </RadioLabel>
            <RadioLabel
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
              sx={{
                borderColor: isCryptoAllowed
                  ? theme.palette.primary.main
                  : theme.palette.grey.main,
                width: "13rem",
              }}
            >
              <StyledIconButton
                onClick={() => setIsCryptoAllowed(!isCryptoAllowed)}
              >
                {isCryptoAllowed ? (
                  <StyledCheckBoxIcon />
                ) : (
                  <StyledCheckBoxOutlineBlankIcon />
                )}
              </StyledIconButton>
              <RadioBoxContentMarkets variant="div">
                <RadioBoxTypography variant="body1">
                  Kryptovaluta
                </RadioBoxTypography>
                <CryptoFlag width="32" height="32" />
              </RadioBoxContentMarkets>
            </RadioLabel>
            {isCryptoAllowed && (
              <Typography
                variant="body1"
                sx={{
                  backgroundColor: theme.palette.primary.light,
                  width: "100%",
                  marginBottom: theme.spacing(1),
                }}
              >
                Kryptovaluta kan drastisk ændre på hvordan spillet udspiller sig
              </Typography>
            )}
          </RadioLabelContainerBox>
        </NewInputBox>
        <Box
          variant="div"
          sx={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <ActionButton
            variant={isInputFine ? "contained" : "outlined"}
            onClick={isAuthenticated ? createGame : handleLoginDialogOpen}
            disabled={isInputFine ? false : true}
            sx={{
              marginBottom: isInputFine ? "" : theme.spacing(0.5),
            }}
          >
            Opret aktiespil
          </ActionButton>
        </Box>
        {!isInputFine && (
          <ErrorBox variant="div">
            {!isDurationFine && (
              <ErrorBoxItem variant="div">
                <StyledErrorIcon />
                <ErrorTypography variant="body1">Varighed</ErrorTypography>
              </ErrorBoxItem>
            )}
            {!isCommissionFine && (
              <ErrorBoxItem variant="div">
                <StyledErrorIcon />
                <ErrorTypography variant="body1">Kurtage</ErrorTypography>
              </ErrorBoxItem>
            )}
            {!isStartBalanceFine && (
              <ErrorBoxItem variant="div">
                <StyledErrorIcon />
                <ErrorTypography variant="body1">Startbeløb</ErrorTypography>
              </ErrorBoxItem>
            )}
          </ErrorBox>
        )}
        <LoginDialog
          title="Log ind for at starte dit aktiespil"
          open={isLoginDialogOpen}
          handleClose={handleLoginDialogClose}
          onSuccessFunc={createGame}
        />
      </Container>
    </div>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: false,
      userTypes: ["user", "admin", "unassigned"],
    },
  };
}

export default CreateNewGame;
