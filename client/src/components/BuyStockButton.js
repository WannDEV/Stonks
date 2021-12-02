import { useState } from "react";

import api from "../services/api";
import Modal from "./utils/Modal/Modal";
import purchaseStocks from "../shared/helper/buy-stocks";

const BuyStockButton = (props) => {
  const [showBuyStockModal, setShowBuyStockModal] = useState(false);

  const openBuyStockModal = () => setShowBuyStockModal(true);
  const closeBuyStockModal = () => setShowBuyStockModal(false);

  const [amountOfStocks, setAmountOfStocks] = useState(0);

  const amountOfStocksHandler = (event) => {
    event.preventDefault();
    console.log("Purchase is successful");
    purchaseStocks(amountOfStocks, props.stockSymbol);
  };

  const onChangeHandler = (event) => {
    setAmountOfStocks(event.target.value);
  };

  return (
    <div>
      <button onClick={openBuyStockModal}>Buy stock</button>
      <Modal
        show={showBuyStockModal}
        onCancel={closeBuyStockModal}
        header={props.stockSymbol}
        footer={<button onClick={closeBuyStockModal}>CLOSE</button>}
      >
        <div>
          <p>Buy {props.stockSymbol}</p>
          <input
            type="number"
            id="buystocksbutton"
            min="1"
            placeholder="Amount"
            onChange={onChangeHandler}
          />
          <button onClick={amountOfStocksHandler}>Purchase</button>
        </div>
      </Modal>
    </div>
  );
};

export default BuyStockButton;

// TODO:
// set amount of stocks max field to the maxiumum amount user can buy for their current amount
