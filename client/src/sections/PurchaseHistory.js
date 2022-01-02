import PurchaseHistoryItem from "../components/PurchaseHistoryItem/PurchaseHistoryItem";

const PurchaseHistory = (props) => {
  const symbol = props.symbol;

  const itemsList = [];

  const DUMMY_DATA = [
    {
      price: 123,
      amount: 3,
      dateOfPurchase: new Date(),
      kind: "buy",
      id: "09qqj0fjeefs",
      status: "pending",
      stockGame: "test1",
    },
    {
      price: 123,
      amount: 3,
      dateOfPurchase: new Date(),
      kind: "sell",
      id: "drgsrgsweg",
      status: "pending",
      stockGame: "test1",
    },
    {
      price: 123,
      amount: 3,
      dateOfPurchase: new Date(),
      kind: "buy",
      id: "yjgkuykggjy",
      status: "success",
      stockGame: "test2",
    },
    {
      price: 123,
      amount: 3,
      dateOfPurchase: new Date(),
      kind: "buy",
      id: "hukhukhukhu",
      status: "success",
      stockGame: "test3",
    },
    {
      price: 123,
      amount: 3,
      dateOfPurchase: new Date(),
      kind: "sell",
      id: "rytryrtyrtyryyr",
      status: "failure",
      stockGame: "test2",
    },
    {
      price: 123,
      amount: 3,
      dateOfPurchase: new Date(),
      kind: "buy",
      id: "tfhhfthssht",
      status: "success",
      stockGame: "test4",
    },
  ];

  for (let i = 0; i < DUMMY_DATA.length; ++i) {
    itemsList.push(
      <PurchaseHistoryItem
        price={DUMMY_DATA[i].price}
        amount={DUMMY_DATA[i].amount}
        dateOfPurchase={DUMMY_DATA[i].dateOfPurchase}
        kind={DUMMY_DATA[i].kind}
        id={DUMMY_DATA[i].id}
        status={DUMMY_DATA[i].status}
        stockGame={DUMMY_DATA[i].stockGame}
        symbol={symbol}
        key={i}
      />
    );
  }

  return <div>{itemsList}</div>;
};

export default PurchaseHistory;
