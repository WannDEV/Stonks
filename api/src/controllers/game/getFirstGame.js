import boom from "@hapi/boom";

import winston from "../../utils/logger/winston";
import User from "../../db/models/user";

const getFirstGame = async function (req, res, next) {
  const id = res.locals.decodedAccessToken.id;

  const user = await User.findOne({ _id: id });

  if (await user) {
    if ((await user.games.length) > 0) {
      const currentGame = await user.games[0];

      return res.status(200).json({ currentGame });
    } else {
      return next(boom.badRequest("User is not particapating in any games"));
    }
  } else {
    return next(boom.badImplementation("Could not find user in database"));
  }
};

export default getFirstGame;
