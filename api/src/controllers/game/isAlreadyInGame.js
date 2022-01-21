import boom from "@hapi/boom";

import winston from "../../utils/logger/winston";
import User from "../../db/models/user";

const isAlreadyInGame = async function (req, res, next) {
  const id = res.locals.decodedAccessToken.id;
  const gameId = req.query.gameId;

  const populatedUser = await User.findOne({ _id: id })
    .populate({
      path: "games",
      model: "Game",
    })
    .catch((err) => {
      return next(boom.badImplementation(`Database error: ${err}`));
    });

  const games = await populatedUser.games;

  if (games) {
    for (let i = 0; i < games.length; ++i) {
      if (games[i].urlId == gameId) {
        return res.status(200).json({ isInGame: true, id: games[i]._id });
      }
    }
  } else return next(boom.badImplementation("Something went wrong"));
};

export default isAlreadyInGame;
