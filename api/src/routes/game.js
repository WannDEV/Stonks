import GameController from "../controllers/game/GameController";
import validateRequestJWT from "../helpers/token-validation";

var express = require("express");
const router = express.Router();

router.post("/create_game", validateRequestJWT, GameController.createGame);
router.post("/join_game", validateRequestJWT, GameController.joinGame);
router.get("/get_first_game", validateRequestJWT, GameController.getFirstGame);
router.get("/get_basic_game_info", GameController.getBasicGameInfo);
router.get(
  "/is_already_in_game",
  validateRequestJWT,
  GameController.isAlreadyInGame
);
router.get(
  "/get_populated_game",
  validateRequestJWT,
  GameController.getPopulatedGame
);
router.get("/get_user_games", validateRequestJWT, GameController.getUserGames);
router.post("/leave_game", validateRequestJWT, GameController.leaveGame);

module.exports = router;
