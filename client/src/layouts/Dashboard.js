import { useState, useEffect } from "react";
import Router from "next/router";
import { styled, alpha, useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { useAuth } from "../shared/context/auth";
import api from "../services/api";
import GameInformationSection from "../sections/GameInformationSection";
import InvestmentOverviewSection from "../sections/InvestmentOverviewSection";
import ShareLinkSection from "../sections/ShareLinkSection";
import LeaderboardSection from "../sections/LeaderboardSection";
import StocksInQueueSection from "../sections/StocksInQueueSection";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
}));

const Dashboard = () => {
  const { selectedGame, user, loadingSelectedGame } = useAuth();
  const theme = useTheme();

  const [gameInformation, setGameInformation] = useState([]);
  const [userBalance, setUserBalance] = useState(null);
  const [userDisplayBalance, setUserDisplayBalance] = useState(null);
  const [ownedStocks, setOwnedStocks] = useState([]);
  const [isLoadingOwnedStocks, setIsLoadingOwnedStocks] = useState(true);

  useEffect(() => {
    async function getPopulatedGame() {
      await api
        .get(`game/get_populated_game?gameId=${selectedGame}`)
        .then((response) => {
          if (response.status == 200 || response.statusCode == 200) {
            setGameInformation(response.data);
          } else {
            Router.push("/error-page");
          }
        })
        .catch((err) => Router.push("/error-page"));
    }

    async function getAllOwnedStocks() {
      await api
        .get(`stock/get_all_owned_stocks?gameId=${selectedGame}`)
        .then((response) => {
          console.log(response);
          if (response.status == 200 || response.statusCode == 200) {
            setOwnedStocks(response.data);
            setIsLoadingOwnedStocks(false);
          } else {
            Router.push("/error-page");
          }
        })
        .catch((err) => Router.push("/error-page"));
    }

    async function getLeaderboard() {
      console.log("get leaderboard function ran");
      await api
        .get(`game/get_leaderboard?gameId=${selectedGame}`)
        .then((response) => {
          console.log("made api call");
          if (response.status == 200 || response.statusCode == 200) {
            console.log(response);
          } else {
            Router.push("/error-page");
          }
        })
        .catch((err) => Router.push("/error-page"));
    }

    if (selectedGame) {
      getPopulatedGame();
      getAllOwnedStocks();
      getLeaderboard();
    }
  }, [selectedGame]);

  useEffect(() => {
    if (gameInformation.length != 0) {
      for (let i = 0; i < gameInformation.balances.length; ++i) {
        if (gameInformation.balances[i].userId == user._id) {
          setUserBalance(gameInformation.balances[i].balance);
          setUserDisplayBalance(gameInformation.balances[i].displayBalance);
        }
      }
    }
  }, [gameInformation]);

  useEffect(() => {
    if (selectedGame == "" && !loadingSelectedGame) {
      Router.push("/games");
    }
  }, []);

  return (
    <StyledBox>
      {selectedGame != "" && gameInformation.length != 0 && (
        <Container maxWidth="lg">
          <GameInformationSection
            name={gameInformation.name}
            commission={gameInformation.commission}
            startBalance={gameInformation.startBalance}
            startDate={gameInformation.startDate}
            duration={gameInformation.duration}
            urlId={gameInformation.urlId}
            leaderboard={[
              { placement: 1, name: "Matthias", color: "#FFD700" },
              { placement: 2, name: "soiefjsief", color: "#C0C0C0" },
              { placement: 3, name: "oskefpo", color: "#CD7F32" },
            ]}
            allowedMarkets={gameInformation.allowedMarkets}
          />
          {userBalance != null &&
            userDisplayBalance != null &&
            gameInformation.startBalance &&
            !isLoadingOwnedStocks && (
              <InvestmentOverviewSection
                userBalance={userBalance}
                userDisplayBalance={userDisplayBalance}
                ownedStocks={ownedStocks}
                startBalance={gameInformation.startBalance}
              />
            )}
          {gameInformation.pending_stocks.length != 0 && (
            <StocksInQueueSection
              pendingStocks={gameInformation.pending_stocks}
            />
          )}
          <ShareLinkSection urlId={gameInformation.urlId} />
          <LeaderboardSection
            leaderboard={[
              {
                name: "Matthias",
                total: 10000,
                trades: 3,
                change: 2.7,
                userId: "sefsefq33",
              },
              {
                name: "Matthias1",
                total: 9000,
                trades: 3,
                change: 2.7,
                userId: user._id,
              },
              {
                name: "Matthias2",
                total: 8000,
                trades: 3,
                change: 2.7,
                userId: "sfthsfths",
              },
              {
                name: "Matthias3",
                total: 7000,
                trades: 3,
                change: 2.7,
                userId: "sefsefsef",
              },
              {
                name: "Matthias4",
                total: 6000,
                trades: 3,
                change: 2.7,
                userId: "109jdaw09",
              },
              {
                name: "Matthias5",
                total: 5000,
                trades: 3,
                change: 2.7,
                userId: "109jdaw09",
              },
              {
                name: "Matthias6",
                total: 3000,
                trades: 3,
                change: 2.7,
                userId: "109jdaw09",
              },
              {
                name: "Matthias7",
                total: 2000,
                trades: 3,
                change: 2.7,
                userId: "109jdaw09",
              },
              {
                name: "Matthias8",
                total: 500,
                trades: 3,
                change: 2.7,
                userId: "109jdaw09",
              },
            ]}
            startBalance={gameInformation.startBalance}
            userId={user._id}
            defaultShowAmount={10}
          />
        </Container>
      )}
    </StyledBox>
  );
};

export default Dashboard;
