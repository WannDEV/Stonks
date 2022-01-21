import boom from "@hapi/boom";

import winston from "../../utils/logger/winston";
import Game from "../../db/models/game";
import User from "../../db/models/user";

const leaveGame = async function (req, res, next) {
  const id = res.locals.decodedAccessToken.id;
  const gameId = req.body.gameId;

  // see if user is owner of game
  // if owner => delete game, corresponding stocks and balances
  // if not owner => remove user from game - remove user stocks - remove user balance

  const game = await Game.findOne({ _id: gameId }).catch((err) => {
    return next(boom.badImplementation(`Database error: ${err}`));
  });

  // IMPORTANT - REMEMBER TO CHANGE TO USE TRANSACTIONS
  if ((await game.owner) == id) {
    // user is owner of game
    // IMPORTANT - REMEMBER TO IMPLEMENT STOCK DELETION HERE

    await User.updateMany(
      {
        _id: { $in: game.users },
      },
      {
        $pull: {
          games: gameId,
        },
      }
    ).catch((err) => {
      return next(boom.badImplementation(`Database error: ${err}`));
    });
    await Game.deleteOne({ _id: gameId }).catch((err) => {
      return next(boom.badImplementation(`Database error: ${err}`));
    });

    return res.status(200).json({ message: "success" });
  } else {
    // user is only participating in game
    // IMPORTANT - REMEMBER TO IMPLEMENT STOCK DELETION HERE

    // remove user from game users
    await game.users.pull(id);
    await game.save();

    // remove game from users
    const user = await User.findOne({ _id: id }).catch((err) => {
      return next(boom.badImplementation(`Database error: ${err}`));
    });
    user.games.pull(gameId);
    await user.save();

    return res.status(200).json({ message: "success" });
  }
};

export default leaveGame;
