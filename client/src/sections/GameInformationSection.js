import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled, useTheme, alpha } from "@mui/material/styles";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import Divider from "@mui/material/Divider";
import { format } from "date-fns";
import da from "date-fns/locale/da";
import Router from "next/router";

const StyledBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  padding: theme.spacing(2),
  margin: `${theme.spacing(2)} ${theme.spacing(3)}`,
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
  borderRadius: "8px",
  [theme.breakpoints.down("sm")]: {
    margin: `${theme.spacing(2)} ${theme.spacing(1)}`,
  },
}));

const TopBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: "20rem",
  // order: "1",
}));

const SubHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  color: theme.palette.text.secondary,
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    fontSize: "1.1rem",
  },
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.8rem",
  display: "block",
  color: theme.palette.text.primary,
  fontWeight: "bold",
  fontFamily: "Source Serif Pro, serif",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.6rem",
  },
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    fontSize: "1.4rem",
  },
}));

const ChangeGameButton = styled(Button)(({ theme }) => ({
  width: "10rem",
  height: "3rem",
  border: `1.5px solid ${theme.palette.text.primary}`,
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "2.5rem",
    marginTop: theme.spacing(1.5),
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.white.main,
  width: "100%",
  margin: `${theme.spacing(2)} ${theme.spacing(1)}`,
}));

const ConfigurationAndLeaderboardBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const ConfigurationHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.4rem",
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
}));

const ConfigurationBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "55%",
  [theme.breakpoints.down("md")]: {
    width: "45%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
    border: `1px solid ${theme.palette.text.primary}`,
    borderRadius: "8px",
    padding: `${theme.spacing(1)} 0`,
  },
}));

const ConfigurationItemTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0.5),
}));

const ConfigurationItemSpan = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: "inline",
  // fontWeight: "bold",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

const LeaderboardBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "50%",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(2),
    width: "100%",
    border: `1px solid ${theme.palette.text.primary}`,
    borderRadius: "8px",
    padding: `${theme.spacing(1)} ${theme.spacing(1)}`,
  },
}));

const LeaderboardItemBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: `1px solid ${theme.palette.white.main}`,
  borderRadius: "8px",
  marginBottom: theme.spacing(1),
}));

const LeaderboardNumberTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
  fontWeight: "bold",
}));

const LeaderboardNameTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  // fontFamily: "Source Serif Pro, serif",
  padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
  display: "flex",
  flexGrow: "1",
}));

const LeaderboardHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.4rem",
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
  textAlign: "center",
}));

const AllowedMarketsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  flexGrow: "1",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));

const AllowedMarketsTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderRight: `1px solid ${theme.palette.text.primary}`,
  fontSize: "1.1rem",
  display: "inline",
  padding: `${theme.spacing(0)} ${theme.spacing(1)}`,
  ":last-child": {
    borderRight: "none",
  },
}));

const GameInformationSection = (props) => {
  const name = props.name;
  const commission = props.commission;
  const startBalance = props.startBalance;
  const startDate = props.startDate;
  const duration = props.duration;
  const leaderboard = props.leaderboard;
  const allowedMarkets = props.allowedMarkets;

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + duration);

  const endDateString = format(endDate, "'Kl. 'HH:mm ' d. 'dd-MM-yyyy", {
    locale: da,
  });

  const theme = useTheme();

  return (
    <StyledBox variant="div">
      <TopBox variant="div">
        <HeaderBox variant="div">
          <SubHeaderTypography variant="body1">
            Valgte aktiespil
          </SubHeaderTypography>
          <HeaderTypography variant="h3">{name}</HeaderTypography>
        </HeaderBox>
        <ChangeGameButton
          variant="outlined"
          color="white"
          onClick={() => Router.push("/games")}
        >
          <ChangeCircleIcon
            width="24px"
            height="24px"
            sx={{ marginRight: theme.spacing(1) }}
          />
          Spiloversigt
        </ChangeGameButton>
      </TopBox>
      <StyledDivider />
      <ConfigurationAndLeaderboardBox variant="div">
        <ConfigurationBox variant="div">
          <ConfigurationHeaderTypography variant="h3">
            Opsætning
          </ConfigurationHeaderTypography>
          <ConfigurationItemTypography variant="body1">
            Slutdato:{" "}
            <ConfigurationItemSpan component="span">
              {endDateString}
            </ConfigurationItemSpan>
          </ConfigurationItemTypography>
          <ConfigurationItemTypography variant="body1">
            Startbeløb:{" "}
            <ConfigurationItemSpan component="span">
              ${startBalance}
            </ConfigurationItemSpan>
          </ConfigurationItemTypography>
          <ConfigurationItemTypography variant="body1">
            Kurtage:{" "}
            <ConfigurationItemSpan component="span">
              {commission}%
            </ConfigurationItemSpan>
          </ConfigurationItemTypography>
          <ConfigurationItemTypography variant="body1">
            Tilladte markeder:{" "}
          </ConfigurationItemTypography>
          <AllowedMarketsBox variant="div">
            {allowedMarkets.map((item) => {
              return (
                <AllowedMarketsTypography variant="body1" key={item}>
                  {item == "global" && "Globalt"}
                  {item == "denmark" && "Danmark"}
                  {item == "norway" && "Norge"}
                  {item == "sweden" && "Sverige"}
                  {item == "finland" && "Finland"}
                  {item == "germany" && "germany"}
                  {item == "usa" && "USA"}
                  {item == "crypto" && "Kryptovaluta"}
                </AllowedMarketsTypography>
              );
            })}
          </AllowedMarketsBox>
        </ConfigurationBox>
        <LeaderboardBox variant="div">
          <LeaderboardHeaderTypography variant="h3">
            Top 3
          </LeaderboardHeaderTypography>
          {leaderboard.map((item) => {
            return (
              <LeaderboardItemBox variant="div" key={item.placement}>
                <LeaderboardNumberTypography
                  variant="body1"
                  sx={{ backgroundColor: alpha(item.color, 0.6) }}
                >
                  {item.placement}
                </LeaderboardNumberTypography>
                <LeaderboardNameTypography variant="body1">
                  {item.name}
                </LeaderboardNameTypography>
              </LeaderboardItemBox>
            );
          })}
        </LeaderboardBox>
      </ConfigurationAndLeaderboardBox>
    </StyledBox>
  );
};

export default GameInformationSection;
