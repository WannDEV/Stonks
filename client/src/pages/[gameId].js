import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import EventIcon from "@mui/icons-material/Event";
import PaidIcon from "@mui/icons-material/Paid";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { format } from "date-fns";
import da from "date-fns/locale/da";
import Divider from "@mui/material/Divider";
import Router from "next/router";

import api from "../services/api";
import { useAuth } from "../shared/context/auth";
import LoginDialog from "../components/Auth/Login";
import GameInformationItem from "../components/GameInformationItem/GameInformationItem";
import GameInformationSubItem from "../components/GameInformationItem/GameInformationSubItem";

// Flag imports
import DenmarkFlag from "../../assets/FlagIcons/denmark.svg";
import FinlandFlag from "../../assets/FlagIcons/finland.svg";
import GermanyFlag from "../../assets/FlagIcons/germany.svg";
import GlobeFlag from "../../assets/FlagIcons/globe.svg";
import CryptoFlag from "../../assets/FlagIcons/crypto.svg";
import NorwayFlag from "../../assets/FlagIcons/norway.svg";
import SwedenFlag from "../../assets/FlagIcons/sweden.svg";
import USAFlag from "../../assets/FlagIcons/usa.svg";

// not found illustration
import NotFoundIllustration from "../../assets/not-found.svg";

const ActionButton = styled(Button)(({ theme }) => ({
  padding: `${theme.spacing(1)} ${theme.spacing(8)}`,
  background: `linear-gradient(100deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  fontSize: "1rem",
  margin: `${theme.spacing(2.5)} 0`,
  [theme.breakpoints.down("sm")]: {
    padding: `${theme.spacing(1)} ${theme.spacing(5)}`,
  },
}));

const SubHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "2.2rem",
  color: theme.palette.text.primary,
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    fontSize: "1.8rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  color: theme.palette.primary.main,
  fontWeight: "bold",
  fontFamily: "Source Serif Pro, serif",
  [theme.breakpoints.down("md")]: {
    fontSize: "2.4rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.8rem",
  },
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  width: "100%",
  background: `linear-gradient(170deg, ${theme.palette.background.main}, ${theme.palette.background.dark})`,
}));

const CenterHeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  padding: `${theme.spacing(5)} 0`,
}));

const InformationContainerBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  flexWrap: "wrap",
  margin: `${theme.spacing(8)} 0`,
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.grey.main,
  width: "100%",
  margin: `${theme.spacing(2)} 0`,
}));

const MarketHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.6rem",
  color: theme.palette.text.primary,
  fontWeight: "bold",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.4rem",
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledNotFoundIllustration = styled(NotFoundIllustration)(
  ({ theme }) => ({
    maxWidth: "50rem",
    margin: `0 ${theme.spacing(10)}`,
    [theme.breakpoints.down("md")]: {
      margin: `0 ${theme.spacing(5)}`,
    },
    [theme.breakpoints.down("sm")]: {
      margin: `0 ${theme.spacing(2)}`,
    },
  })
);

const NotFoundHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontFamily: "Source Serif Pro, serif",
  margin: `${theme.spacing(3)} ${theme.spacing(3)} ${theme.spacing(
    1.5
  )} ${theme.spacing(3)}`,
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "2.4rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
  },
}));

const NotFoundButton = styled(Button)(({ theme }) => ({
  margin: `${theme.spacing(2)} ${theme.spacing(3)}`,
  padding: `${theme.spacing(0.8)} ${theme.spacing(4)}`,
}));

const NotFoundSubHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  margin: `${theme.spacing(0)} ${theme.spacing(2)} ${theme.spacing(
    1
  )} ${theme.spacing(2)}`,
  color: theme.palette.text.secondary,
  [theme.breakpoints.down("md")]: {
    fontSize: "0.9rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}));

const AllowedMarketsBox = styled(Box)(({ theme }) => ({
  boxShadow: `0 0 35px -2px ${theme.palette.grey.main}`,
  margin: `${theme.spacing(3)} ${theme.spacing(6)}`,
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  padding: `${theme.spacing(3)}`,
  [theme.breakpoints.down("md")]: {
    margin: `${theme.spacing(3)} ${theme.spacing(3)}`,
  },
}));

const JoinGame = () => {
  const router = useRouter();
  const { isAuthenticated, changeSelectedGame } = useAuth();
  const theme = useTheme();

  const [failedJoin, setFailedJoin] = useState(false);

  const handleCloseFailMessage = () => {
    setFailedJoin(false);
  };

  const [gameInformation, setGameInformation] = useState([]);
  const [foundGame, setFoundGame] = useState(false);
  const [loadingGame, setLoadingGame] = useState(true);

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const handleLoginDialogClose = () => setIsLoginDialogOpen(false);
  const handleLoginDialogOpen = () => setIsLoginDialogOpen(true);

  const [gameInformationList, setGameInformationList] = useState([]);
  const [allowedMarketsList, setAllowedMarketsList] = useState([]);

  useEffect(() => {
    const sortGameInformation = function () {
      if (gameInformation.length != 0 && gameInformationList.length == 0) {
        const endDate = new Date(gameInformation.startDate);
        endDate.setDate(endDate.getDate() + gameInformation.duration);

        const endDateString = format(endDate, "'Kl. 'HH:mm ' d. 'dd-MM-yyyy", {
          locale: da,
        });

        gameInformationList.push({
          header: "Slutdato",
          val: endDateString,
          logo: <EventIcon />,
        });

        gameInformationList.push({
          header: "Startbeløb",
          val: `$${gameInformation.startBalance}`,
          logo: <PaidIcon />,
        });

        gameInformationList.push({
          header: "Kurtage",
          val: `${gameInformation.commission}%`,
          logo: <AccountBalanceIcon />,
        });
      }
    };

    const sortAllowedMarkets = function () {
      if (gameInformation.length != 0 && allowedMarketsList.length == 0) {
        const allowedMarkets = gameInformation.allowedMarkets;

        for (let i = 0; i < allowedMarkets.length; ++i) {
          if (allowedMarkets[i] == "global") {
            allowedMarketsList.push({
              market: "Globalt",
              logo: <GlobeFlag />,
            });
          } else if (allowedMarkets[i] == "denmark") {
            allowedMarketsList.push({
              market: "Danmark",
              logo: <DenmarkFlag />,
            });
          } else if (allowedMarkets[i] == "norway") {
            allowedMarketsList.push({
              market: "Norge",
              logo: <NorwayFlag />,
            });
          } else if (allowedMarkets[i] == "sweden") {
            allowedMarketsList.push({
              market: "Sverige",
              logo: <SwedenFlag />,
            });
          } else if (allowedMarkets[i] == "finland") {
            allowedMarketsList.push({
              market: "Finland",
              logo: <FinlandFlag />,
            });
          } else if (allowedMarkets[i] == "germany") {
            allowedMarketsList.push({
              market: "Tyskland",
              logo: <GermanyFlag />,
            });
          } else if (allowedMarkets[i] == "usa") {
            allowedMarketsList.push({
              market: "USA",
              logo: <USAFlag />,
            });
          } else if (allowedMarkets[i] == "crypto") {
            allowedMarketsList.push({
              market: "Kryptovaluta",
              logo: <CryptoFlag />,
            });
          }
        }
      }
    };

    sortGameInformation();
    sortAllowedMarkets();
  }, [gameInformation]);

  useEffect(() => {
    async function getGameInformation() {
      await api
        .get(`game/get_basic_game_info?gameId=${router.query.gameId}`)
        .then((response) => {
          setGameInformation(response.data);
          setFoundGame(true);
          setLoadingGame(false);
        })
        .catch((err) => {
          setLoadingGame(false);
          setFoundGame(false);
        });
    }

    async function isAlreadyInGame() {
      if (isAuthenticated) {
        await api
          .get(`game/is_already_in_game?gameId=${router.query.gameId}`)
          .then((response) => {
            if (response.status == 200 || response.statusCode == 200) {
              if (response.data.isInGame && response.data.id) {
                changeSelectedGame(response.data.id);
                Router.push("/");
              }
            }
          });
      }
    }

    if (router.query.gameId) {
      isAlreadyInGame();
      getGameInformation();
    }
  }, [router.query.gameId]);

  const joinGame = async function () {
    await api
      .post("game/join_game", {
        urlId: router.query.gameId,
      })
      .then((response) => {
        if (response.status == 200) {
          if (response.data.gameId) changeSelectedGame(response.data.gameId);
          router.push("/");
        } else {
          setFailedJoin(true);
        }
      })
      .catch((err) => {
        setFailedJoin(true);
      });
  };

  return (
    <div>
      {!loadingGame && foundGame && (
        <div>
          <HeaderBox variant="div">
            <Container maxWidth="lg">
              <CenterHeaderBox variant="div">
                <Box
                  variant="div"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SubHeaderTypography variant="h3">
                    Tilmeld dig
                  </SubHeaderTypography>
                  {gameInformation.length != 0 && (
                    <HeaderTypography variant="h2">
                      {gameInformation.name}
                    </HeaderTypography>
                  )}
                  <ActionButton
                    onClick={isAuthenticated ? joinGame : handleLoginDialogOpen}
                    variant="contained"
                  >
                    Tilmeld spil
                  </ActionButton>
                </Box>
              </CenterHeaderBox>
            </Container>
          </HeaderBox>
          <Container maxWidth="lg">
            <InformationContainerBox variant="div">
              {gameInformationList.map((item) => {
                return (
                  <GameInformationItem
                    key={item.header}
                    header={item.header}
                    val={item.val}
                    logo={item.logo}
                  />
                );
              })}
              <AllowedMarketsBox variant="div">
                <Box
                  variant="div"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <MarketHeaderTypography variant="h3">
                    Tilladte markeder
                  </MarketHeaderTypography>
                  <StyledDivider />
                </Box>
                {allowedMarketsList.map((item) => {
                  return (
                    <GameInformationSubItem
                      key={item.market}
                      market={item.market}
                      logo={item.logo}
                    />
                  );
                })}
              </AllowedMarketsBox>
            </InformationContainerBox>
          </Container>
          <LoginDialog
            title="Du er ikke logget ind"
            open={isLoginDialogOpen}
            handleClose={handleLoginDialogClose}
            onSuccessFunc={joinGame}
          />
          <Snackbar
            open={failedJoin}
            autoHideDuration={6000}
            onClose={handleCloseFailMessage}
          >
            <Alert
              onClose={handleCloseFailMessage}
              severity="error"
              sx={{ width: "100%" }}
            >
              Noget gik galt!
            </Alert>
          </Snackbar>
        </div>
      )}
      {loadingGame && (
        <div>
          <Typography variant="body1">Indlæser...</Typography>
        </div>
      )}
      {!loadingGame && !foundGame && (
        <Box
          variant="div"
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <NotFoundHeaderTypography variant="h2">
            Kunne{" "}
            <Box
              variant="span"
              sx={{ color: theme.palette.primary.main, display: "inline" }}
            >
              ikke
            </Box>{" "}
            finde spillet
          </NotFoundHeaderTypography>
          <NotFoundSubHeaderTypography variant="body1">
            Venligst tjek om du har indtastet den rigtige URL. Husk at tjekke om
            det er med stort eller småt.
          </NotFoundSubHeaderTypography>
          <NotFoundButton variant="contained" onClick={() => Router.push("/")}>
            Gå tilbage
          </NotFoundButton>
          <StyledNotFoundIllustration />
        </Box>
      )}
    </div>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: false,
      userTypes: ["user", "admin", "unassigned"],
    },
  };
}

export default JoinGame;
