import boom from "@hapi/boom";
import axios from "axios";

import winston from "../../utils/logger/winston";

const StringForXAmountOfYearssAgo = (amount) => {
  let tempDate = new Date();
  let finalDate = new Date(
    tempDate.setFullYear(tempDate.getFullYear() - amount)
  );

  let dd = String(finalDate.getDate()).padStart(2, "0");
  let mm = String(finalDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = finalDate.getFullYear();

  finalDate = `${yyyy}-${mm}-${dd}`;

  return finalDate;
};

const StringForXAmountOfMonthssAgo = (amount) => {
  let tempDate = new Date();
  let finalDate = new Date(tempDate.setMonth(tempDate.getMonth() - amount));

  let dd = String(finalDate.getDate()).padStart(2, "0");
  let mm = String(finalDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = finalDate.getFullYear();

  finalDate = `${yyyy}-${mm}-${dd}`;

  return finalDate;
};

const StringForXAmountOfDayssAgo = (amount) => {
  let tempDate = new Date();
  let finalDate = new Date(tempDate.setDate(tempDate.getDate() - amount));

  let dd = String(finalDate.getDate()).padStart(2, "0");
  let mm = String(finalDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = finalDate.getFullYear();

  finalDate = `${yyyy}-${mm}-${dd}`;

  return finalDate;
};

const decideQueryStringForYTD = (symbol) => {
  // calculate amount of days since 1. of January
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff =
    now -
    start +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  console.log("Day of year: " + day);

  if (day == 1)
    return [
      `https://financialmodelingprep.com/api/v3/historical-chart/1min/${symbol}?apikey=${process.env.FMP_API_KEY}`,
      day,
    ];

  if (day < 7)
    return [
      `https://financialmodelingprep.com/api/v3/historical-chart/5min/${symbol}?apikey=${process.env.FMP_API_KEY}`,
      day,
    ];

  if (day < 15)
    return [
      `https://financialmodelingprep.com/api/v3/historical-chart/30min/${symbol}?apikey=${process.env.FMP_API_KEY}`,
      day,
    ];

  if (day < 30)
    return [
      `https://financialmodelingprep.com/api/v3/historical-chart/1hour/${symbol}?apikey=${process.env.FMP_API_KEY}`,
      day,
    ];

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${dd}`;

  return [
    `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?from=${StringForXAmountOfDayssAgo(
      day - 1
    )}&to=${today}&apikey=${process.env.FMP_API_KEY}`,
    day,
  ];
};

const convertFromETToCET = (date) => {
  return date.setHours(date.getHours() + 6);
};

const filterDatesBetween = (chartData, from, to, interval) => {
  // chartData needs to be sorted after latest date first
  let datapointDate;

  if (interval == "1d")
    from = new Date(
      from.getFullYear(),
      from.getMonth(),
      from.getDate(),
      0,
      0,
      0
    );

  chartData = chartData.filter((datapoint) => {
    // datapointDate = datapoint.date.toString().slice(8, 10);
    datapointDate = new Date(datapoint.date);

    if (datapointDate >= from && datapointDate <= to) {
      datapoint.date = new Date(datapoint.date); // string to date object
      return {
        ...datapoint,
        date: convertFromETToCET(datapoint.date), // Convert time from ET to CET (danish time)
      };
    }
  }); // Only add datapoint to list if same date

  return chartData;
};

const getChartData = async function (req, res, next) {
  const symbol = req.query.symbol.toUpperCase();
  const interval = req.query.interval;

  console.log(`Symbol: ${symbol} Interval: ${interval}`);

  if (!symbol || !interval)
    return next(boom.badData("Missing either symbol or interval parameter"));

  // Check whether or not symbol is only letters
  // if (!new RegExp("/^[a-zA-Z]+$/g").test(symbol))
  //   return next(boom.badData("Symbol should only be letters"));

  const supportedIntervals = ["1d", "7d", "1m", "3m", "YTD", "1y", "5y"];

  if (!supportedIntervals.includes(interval))
    return next(boom.badData("Unsupported time interval"));

  let queryString = "";
  let daysSinceJanuaryFirst;

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${dd}`;

  if (interval == "1d") {
    queryString = `https://financialmodelingprep.com/api/v3/historical-chart/1min/${symbol}?apikey=${process.env.FMP_API_KEY}`;
  } else if (interval == "7d") {
    queryString = `https://financialmodelingprep.com/api/v3/historical-chart/5min/${symbol}?apikey=${process.env.FMP_API_KEY}`;
  } else if (interval == "1m") {
    queryString = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?from=${StringForXAmountOfMonthssAgo(
      1
    )}&to=${today}&apikey=${process.env.FMP_API_KEY}`;
  } else if (interval == "3m") {
    queryString = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?from=${StringForXAmountOfMonthssAgo(
      3
    )}&to=${today}&apikey=${process.env.FMP_API_KEY}`;
  } else if (interval == "YTD") {
    const descision = decideQueryStringForYTD(symbol);
    queryString = descision[0];
    daysSinceJanuaryFirst = descision[1];
  } else if (interval == "1y") {
    queryString = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?from=${StringForXAmountOfYearssAgo(
      1
    )}&to=${today}&apikey=${process.env.FMP_API_KEY}`;
  } else {
    queryString = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?from=${StringForXAmountOfYearssAgo(
      5
    )}&to=${today}&apikey=${process.env.FMP_API_KEY}`;
  }

  console.log(queryString);

  const response = await axios.get(queryString).catch((err) => {
    return next(
      boom.badImplementation(`Third party stock api call failed: ${err}`)
    );
  });

  let chartData;

  // filter data
  if (interval == "1d") {
    chartData = await response.data;
    const lastDay = new Date(chartData[0].date);

    chartData = filterDatesBetween(chartData, lastDay, lastDay, interval);
  } else if (interval == "7d") {
    chartData = await response.data;

    const tempDate = new Date();
    const weekAgo = new Date(tempDate.setDate(tempDate.getDate() - 7));

    chartData = filterDatesBetween(chartData, weekAgo, new Date(), interval);
  } else if (interval == "1m") {
    chartData = await response.data.historical;
  } else if (interval == "3m") {
    chartData = await response.data.historical;
  } else if (interval == "YTD") {
    if (daysSinceJanuaryFirst < 30) {
      chartData = await response.data;

      const tempDate = new Date();
      const startDate = new Date(
        tempDate.setDate(tempDate.getDate() - daysSinceJanuaryFirst)
      );

      chartData = filterDatesBetween(
        chartData,
        startDate,
        new Date(),
        interval
      );
    } else {
      chartData = await response.data.historical;
    }
  } else if (interval == "1y") {
    chartData = await response.data.historical;
  } else if (interval == "5y") {
    chartData = await response.data.historical;
  }

  return res.status(200).json(chartData);
};

export default getChartData;
