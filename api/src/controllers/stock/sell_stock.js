import boom from "@hapi/boom";
import axios from "axios";
import config from "config";

import PendingStock from "../../db/models/pendingStock";
import Game from "../../db/models/game";
import winston from "../../utils/logger/winston";

const calculateDiffDays = (startDay, endDay) => {
  let diffDays;

  if (startDay > endDay) {
    diffDays = 7 - startDay + endDay; // figure out difference between a full week and endDay and add startDay to the value
  } else {
    diffDays = endDay - startDay;
  }

  console.log(startDay, endDay, diffDays);

  return diffDays;
};

const sell = async (
  spendingPrice,
  symbol,
  market,
  gameId,
  userId,
  activeFrom,
  next,
  res
) => {
  const companyProfileResponse = axios
    .get(
      `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${process.env.FMP_API_KEY}`
    )
    .catch((err) => console.log(err));

  const companyProfile = await companyProfileResponse;

  console.log("This is the selling function");

  // create and save db object
  const pendingStock = new PendingStock({
    spending_price: spendingPrice,
    symbol,
    market,
    game: gameId,
    user: userId,
    active_from: activeFrom,
    name: companyProfile.data[0].companyName,
    img: companyProfile.data[0].image,
    trade_type: "sell",
    is_cancelled: false,
  });

  await pendingStock.save();

  // add to pending_stocks array in db
  const gameResponse = await Game.findOne({ _id: gameId }).catch((err) => {
    return next(boom.badImplementation(`Database erorr: ${err}`));
  });

  const game = await gameResponse;

  if (game) {
    for (let i = 0; i < game.balances.length; ++i) {
      if (game.balances[i].userId == userId) {
        const userBalance = game.balances[i].balance;

        // game.balances[i].balance = userBalance + spendingPrice;
        await game.pending_stocks.addToSet(pendingStock);

        await game.save();
        return res.status(200).json({ message: "success" });
      }
    }
  } else return next(boom.badRequest("Could not find game"));
};

const sellStock = async function (req, res, next) {
  const spendingPrice = req.body.spendingPrice;
  const symbol = req.body.symbol;
  const market = req.body.market;
  const gameId = req.body.gameId;
  const id = res.locals.decodedAccessToken.id;

  // log to check if the values are correct
  console.log(
    `Spending price: ${spendingPrice}, symbol: ${symbol}, market: ${market}`
  );

  const marketsTradingHours = config.get("stocks.marketTradingHours");

  for (let i = 0; i < marketsTradingHours.length; ++i) {
    const currentMarket = marketsTradingHours[i];

    if (currentMarket.market == market) {
      const dateWithNoDelay = new Date();
      const date = new Date(
        dateWithNoDelay.getTime() + currentMarket.delay * 60000
      ); // add delay - ms
      console.log(date);

      const now = date.getHours() * 60 + date.getMinutes(); // amount of seconds that has passed today
      const open = currentMarket.open - 60; // amount of minutes in a day till open time - 1 hour = UTC to CET time
      const close = currentMarket.close - 60; // amount of minutes in a day till close time - 1 hour = UTC to CET time
      const isOpenToday = currentMarket.openingDays.includes(date.getDay());

      // if now is between open and close and is included in opening days - sell stock
      if (now >= open && now <= close && isOpenToday) {
        return await sell(
          spendingPrice,
          symbol,
          market,
          gameId,
          id,
          date,
          next,
          res
        );
      }

      // if now is less than open and is included in opening days - sell stock for same day at opening time
      if (now < open && isOpenToday) {
        // set selling date
        const sellingDate = new Date(
          date.getFullYear(), // year
          date.getMonth(), // month
          date.getDate(), // days
          Math.floor(currentMarket.open / 60), // hours
          currentMarket.open % 60, // minutes
          0 // seconds
        );

        return await sell(
          spendingPrice,
          symbol,
          market,
          gameId,
          id,
          sellingDate,
          next,
          res
        );
      }

      // if is not included in opening days or now is greater than closing time - sell stock at next opening time
      if (!currentMarket.openingDays.includes(date.getDay()) || now > close) {
        const day = date.getDay();
        const index = isOpenToday
          ? currentMarket.openingDays.indexOf(day)
          : currentMarket.openingDays[currentMarket.openingDays.length - 1];

        // get the next day that occurs in opening days array and set as purchase day
        const purchaseDay =
          index < currentMarket.openingDays.length - 1
            ? currentMarket.openingDays[index] + 1
            : currentMarket.openingDays[0];

        console.log(index, purchaseDay);

        // amount of days it takes till next date
        const diffDays = calculateDiffDays(day, purchaseDay);

        // set selling date
        const sellingDate = new Date(
          date.getFullYear(), // year
          date.getMonth(), // month
          date.getDate() + diffDays, // days
          Math.floor(currentMarket.open / 60), // hours
          currentMarket.open % 60, // minutes
          0 // seconds
        );

        return await sell(
          spendingPrice,
          symbol,
          market,
          gameId,
          id,
          sellingDate,
          next,
          res
        );
      }
    }
  }

  return next(boom.badRequest("Stock not supported"));
};

export default sellStock;
