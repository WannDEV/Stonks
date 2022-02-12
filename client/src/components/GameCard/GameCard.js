import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import { format } from "date-fns";
import da from "date-fns/locale/da";
import Router from "next/router";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ClearIcon from "@mui/icons-material/Clear";

import { useAuth } from "../../shared/context/auth";
import api from "../../services/api";

const StyledDialog = styled(Dialog)(({ theme }) => ({}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
}));

const StyledDialogContentText = styled(DialogContentText)(({ theme }) => ({}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
}));

const CancelButton = styled(Button)(({ theme }) => ({}));

const ConfirmButton = styled(Button)(({ theme }) => ({}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: `${theme.palette.background.light} !important`,
  [theme.breakpoints.down("sm")]: {
    margin: `0 ${theme.spacing(2)}`,
  },
  position: "relative",
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  color: theme.palette.text.primary,
  textAlign: "center",
}));

const ItemTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.secondary,
  textAlign: "center",
  borderTop: `1px solid ${theme.palette.grey.main}`,
  padding: `${theme.spacing(1)} 0`,
}));

const DeleteGameIconButton = styled(IconButton)(({ theme }) => ({
  width: "2.4rem",
  height: "2.4rem",
  position: "absolute",
  top: "3px",
  right: "3px",
}));

const StyledClearIcon = styled(ClearIcon)(({ theme }) => ({
  width: "100%",
  height: "100%",
  color: theme.palette.text.secondary,
}));

const GameCard = (props) => {
  const name = props.name;
  const gameId = props.gameId;
  const duration = props.duration;
  const startDate = props.startDate;
  const placement = props.placement;
  const amountOfPlayers = props.amountOfPlayers;
  const amountOfStocks = props.amountOfStocks;

  const theme = useTheme();

  const { updateSelectedGameToFirstGame, selectedGame, changeSelectedGame } =
    useAuth();

  const [isDeleteGameModalOpen, setIsDeleteGameModalOpen] = useState(false);

  const handleDeleteGameModalClose = () => setIsDeleteGameModalOpen(false);
  const handleDeleteGameModalOpen = () => setIsDeleteGameModalOpen(true);

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + duration);

  const endDateString = format(endDate, "'kl. 'HH:mm ' d. 'dd-MM-yyyy", {
    locale: da,
  });

  const leaveGame = async () => {
    await api({
      method: "POST",
      url: "game/leave_game",
      data: {
        gameId,
      },
    })
      .then((response) => {
        if (response.status == 200 || response.statusCode == 200) {
          if (selectedGame == gameId) updateSelectedGameToFirstGame();
          handleDeleteGameModalClose();
          Router.reload();
        } else {
          Router.push("/error-page");
        }
      })
      .catch((err) => {
        Router.push("/error-page");
      });
  };

  return (
    <StyledCard
      sx={{
        maxWidth: 345,
        minHeight: 230,
        border:
          selectedGame == gameId
            ? `2px solid ${theme.palette.primary.light}`
            : "",
      }}
    >
      <CardActionArea
        onClick={() => {
          changeSelectedGame(gameId);
          Router.push("/");
        }}
      >
        <StyledCardHeader
          title={name}
          subheader={`Spillet ender ${endDateString}`}
        />
        <CardContent>
          <ItemTypography variant="body1">
            Placering: {placement} ud af {amountOfPlayers}
          </ItemTypography>
          <ItemTypography variant="body1">
            Totale aktive handler: {amountOfStocks}
          </ItemTypography>
        </CardContent>
      </CardActionArea>
      <DeleteGameIconButton
        onClick={handleDeleteGameModalOpen}
        aria-label="Leave game button"
      >
        <StyledClearIcon />
      </DeleteGameIconButton>
      <StyledDialog
        open={isDeleteGameModalOpen}
        onClose={handleDeleteGameModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <StyledDialogTitle id="alert-dialog-title">
          Er du sikker på du vil slette{" "}
          <Box
            component="span"
            sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
          >
            {name}
          </Box>
        </StyledDialogTitle>
        <StyledDialogContent>
          <StyledDialogContentText>
            Denne handling er{" "}
            <Box
              component="span"
              sx={{ textDecoration: "underline", fontWeight: "bold" }}
            >
              irreversibel
            </Box>{" "}
            og kan ikke ændres når du først trykker "bekræft"
          </StyledDialogContentText>
        </StyledDialogContent>
        <StyledDialogActions>
          <CancelButton variant="outlined" onClick={handleDeleteGameModalClose}>
            Afbryd
          </CancelButton>
          <ConfirmButton variant="contained" onClick={leaveGame}>
            Bekræft
          </ConfirmButton>
        </StyledDialogActions>
      </StyledDialog>
    </StyledCard>
  );
};

export default GameCard;
