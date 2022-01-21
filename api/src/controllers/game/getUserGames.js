import boom from "@hapi/boom";

import winston from "../../utils/logger/winston";
import User from "../../db/models/user";

const getUserGames = async function (req, res, next) {
  const id = res.locals.decodedAccessToken.id;

  const populatedUser = await User.findOne({ _id: id })
    .populate({
      path: "games",
      model: "Game",
    })
    .catch((err) => {
      return next(boom.badImplementation(`Database error: ${err}`));
    });

  const games = await populatedUser.games;

  return res.status(200).json(games);
};

export default getUserGames;
