import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Router from "next/router";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import api from "../services/api";
import GameCard from "../components/GameCard/GameCard";
import EmptyFolder from "../../assets/empty-folder.svg";

const GameCardsBox = styled("ul")(({ theme }) => ({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(345px, max-content))",
  gridGap: theme.spacing(6),
  justifyContent: "center",
  padding: "initial",
  marginTop: theme.spacing(3),
}));

const GameCardItem = styled("li")(({ theme }) => ({
  listStyleType: "none",
  width: "345",
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  borderBottom: `1px solid ${theme.palette.grey.main}`,
  paddingBottom: theme.spacing(1.5),
  marginTop: theme.spacing(3),
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const NewGameButton = styled(Button)(({ theme }) => ({
  width: "10rem",
  height: "2.5rem",
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "2.5rem",
    marginTop: theme.spacing(1.5),
  },
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.6rem",
  color: theme.palette.text.primary,
  fontWeight: "bold",
}));

const MyGamesHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  color: theme.palette.text.primary,
  fontWeight: "bold",
  marginTop: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
}));

const MyGamesSubHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.secondary,
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
}));

const NoGamesBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
}));

const NoGamesGraphic = styled(EmptyFolder)(({ theme }) => ({
  width: "50%",
  "& path": {
    fill: theme.palette.text.primary,
  },
}));

const NoGamesHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.4rem",
  color: theme.palette.text.primary,
}));

const NoGamesSubHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(1),
}));

const GamesPage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function getGames() {
      await api
        .get("/game/get_user_games")
        .then((response) => {
          if (response.status == 200 || response.statusCode == 200) {
            setGames(response.data);
          } else {
            Router.push("/error-page");
          }
        })
        .catch((err) => Router.push("/error-page"));
    }

    getGames();
  }, []);

  return (
    <Container maxWidth="lg">
      <HeaderBox component="div">
        <HeaderTypography variant="h1">Spiloversigt</HeaderTypography>
        <NewGameButton
          variant="contained"
          onClick={() => Router.push("/games/create_new_game")}
        >
          Opret spil
        </NewGameButton>
      </HeaderBox>
      <MyGamesHeaderTypography variant="h2">Mine spil</MyGamesHeaderTypography>
      <MyGamesSubHeaderTypography variant="body1">
        Tryk på det spil du gerne vil skifte til.
      </MyGamesSubHeaderTypography>
      <GameCardsBox>
        {games.map((game) => {
          return (
            <GameCardItem key={game.urlId}>
              <GameCard
                key={game.urlId}
                name={game.name}
                gameId={game._id}
                duration={game.duration}
                startDate={game.startDate}
                placement={1}
                amountOfPlayers={game.users.length}
                amountOfStocks={game.stocks.length}
              />
            </GameCardItem>
          );
        })}
        {games.length == 0 && (
          <NoGamesBox component="div">
            <NoGamesGraphic />
            <NoGamesHeaderTypography variant="h3">
              Du deltager pt. ikke i nogle spil
            </NoGamesHeaderTypography>
            <NoGamesSubHeaderTypography variant="body1">
              Tryk på "Opret spil" og begynd at spille
            </NoGamesSubHeaderTypography>
          </NoGamesBox>
        )}
      </GameCardsBox>
    </Container>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: false,
      userTypes: ["user", "admin"],
    },
  };
}

export default GamesPage;
