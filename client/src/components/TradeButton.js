import { useState } from "react";
import Router from "next/router";

import api from "../services/api";
import Modal from "./utils/Modal/Modal";
import purchaseStocks from "../shared/helper/buy-stocks";
import sellStocks from "../shared/helper/sell-stocks";

const TradeButton = (props) => {
  const symbol = props.symbol;
  const ownedAmount = props.ownedAmount;

  // Could not buy or sell error handling
  const [couldNotSellError, setCouldNotSellError] = useState(false);
  const [couldNotbuyError, setCouldNotbuyError] = useState(false);

  // Modal handling
  const [showBuyingMenu, setShowBuyingMenu] = useState(true);
  const [showSellingMenu, setShowSellingMenu] = useState(false);
  const [showTradingMenu, setShowTradingMenu] = useState(false);

  const openBuyingMenuHandler = () => {
    setCouldNotSellError(false);
    setCouldNotbuyError(false);
    setShowBuyingMenu(true);
  };
  const closeBuyingMenuHandler = () => setShowBuyingMenu(false);

  const openSellingMenuHandler = () => {
    setCouldNotSellError(false);
    setCouldNotbuyError(false);
    setShowSellingMenu(true);
  };
  const closeSellingMenuHandler = () => setShowSellingMenu(false);

  const openTradingMenu = () => setShowTradingMenu(true);
  const closeTradingMenu = () => {
    setCouldNotSellError(false);
    setCouldNotbuyError(false);
    setShowTradingMenu(false);
  };

  // Selection handling
  const [selectedSellingStocks, setSelectedSellingStocks] = useState(0);
  const [selectedBuyingStocks, setSelectedBuyingStocks] = useState(0);

  const selectedBuyingStocksChangeHandler = (event) =>
    setSelectedBuyingStocks(event.target.value);
  const selectedBuyingStocksHandler = (event) => {
    event.preventDefault();
    purchaseStocks(selectedBuyingStocks, symbol);
    closeTradingMenu();
    Router.reload(window.location.pathname);
  };

  const selectedSellingStocksChangeHandler = (event) =>
    setSelectedSellingStocks(event.target.value);
  const selectedSellingStocksHandler = async (event) => {
    event.preventDefault();

    const purchaseWentThrough = await sellStocks(
      selectedSellingStocks,
      symbol
    ).then((response) => {
      console.log(response);
      return true;
    });

    if (purchaseWentThrough == true) {
      closeTradingMenu();
      // Router.reload(window.location.pathname);
    } else {
      setCouldNotSellError(true);
    }
  };

  return (
    <div>
      <button onClick={openTradingMenu}>Trade</button>
      <Modal
        show={showTradingMenu}
        onCancel={closeTradingMenu}
        header={symbol}
        footer={<button onClick={closeTradingMenu}>CLOSE</button>}
      >
        <div>
          <button
            onClick={() => {
              openBuyingMenuHandler();
              closeSellingMenuHandler();
            }}
          >
            Buy
          </button>
          <button
            onClick={() => {
              openSellingMenuHandler();
              closeBuyingMenuHandler();
            }}
          >
            Sell
          </button>
          {couldNotSellError && (
            <div>
              <p>You do not have enough stocks to sell!</p>
            </div>
          )}
          {showBuyingMenu && (
            <div>
              <p>Buying menu</p>
              <input
                type="number"
                id="buystocksbutton"
                min="1"
                placeholder="Amount"
                onChange={selectedBuyingStocksChangeHandler}
              />
              <button onClick={selectedBuyingStocksHandler}>Purchase</button>
            </div>
          )}
          {showSellingMenu && (
            <div>
              <p>Selling menu</p>
              <input
                type="number"
                id="sellstocksbutton"
                min="1"
                placeholder="Amount"
                onChange={selectedSellingStocksChangeHandler}
              />
              <button onClick={selectedSellingStocksHandler}>Sell</button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TradeButton;
