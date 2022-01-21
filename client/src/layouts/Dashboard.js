import { useState, useEffect } from "react";
import Router from "next/router";
import { styled, alpha, useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";

import { useAuth } from "../shared/context/auth";
import api from "../services/api";
import GameInformationSection from "../sections/GameInformationSection";
import InvestmentOverviewSection from "../sections/InvestmentOverviewSection";
import ShareLinkSection from "../sections/ShareLinkSection";
import LeaderboardSection from "../sections/LeaderboardSection";

const Dashboard = () => {
  const { selectedGame, user, loadingSelectedGame } = useAuth();
  const theme = useTheme();

  const [gameInformation, setGameInformation] = useState([]);
  const [userBalance, setUserBalance] = useState(null);

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

    if (selectedGame) getPopulatedGame();
  }, [selectedGame]);

  useEffect(() => {
    if (gameInformation.length != 0) {
      for (let i = 0; i < gameInformation.balances.length; ++i) {
        if (gameInformation.balances[i].userId == user._id) {
          setUserBalance(gameInformation.balances[i].balance);
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
    <div>
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
          {userBalance != null && (
            <InvestmentOverviewSection userBalance={userBalance} />
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
    </div>
  );
};

export default Dashboard;
