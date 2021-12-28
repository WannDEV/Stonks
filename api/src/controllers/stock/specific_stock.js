const specificStock = async function (req, res, next) {
  // make api call to stock api and return data

  // dummy data
  const name = "Tesla";
  const price = 123;
  const stockCandle = [
    {
      symbol: "tsla",
      price: 1239,
      // ...
    },
    {
      symbol: "tsla",
      price: 1139,
      // ...
    },
    {
      symbol: "tsla",
      price: 1339,
      // ...
    },
  ];

  return res.status(200).json({ name, price, stockCandle });
};

export default specificStock;
