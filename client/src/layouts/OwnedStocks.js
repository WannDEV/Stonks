import ContentLoader from "react-content-loader";
import { useTable, usePagination } from "react-table";
import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useRouter } from "next/router";

import api from "../services/api";
import { useAuth } from "../shared/context/auth";
import Table from "../components/DisplayOwnStocks/Stock-table";
import TradeButton from "../components/TradeButton";

const OwnedStocksLayout = () => {
  const { loading } = useAuth();
  const [data, setData] = useState([]);
  const [isValidating, setIsValidating] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [userHasStocks, setUserHasStocks] = useState(true);
  const fetchIdRef = useRef(0);
  const router = useRouter();

  const fetchAPIData = async ({ limit, skip }) => {
    try {
      setIsValidating(true);
      await api(`/stock/all/owned?limit=${limit}&skip=${skip}`).then((data) => {
        console.log(`Data: ${data}`);
        let returnedData = data.data.data;
        setUserHasStocks(true);

        for (let i = 0; i < returnedData.length; ++i) {
          returnedData[i] = {
            ...returnedData[i],
            trade: (
              <TradeButton
                symbol={returnedData[i].symbol}
                ownedAmount={returnedData[i].amount}
              />
            ),
          };
        }

        setData(returnedData);

        console.log(`pagecount: ${data.data.paging.pages}`);
        setPageCount(data.data.paging.pages);
      });
    } catch (e) {
      setUserHasStocks(false);
    } finally {
      setIsValidating(false);
    }
  };

  const fetchData = useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current;
    setIsValidating(true);
    if (fetchId === fetchIdRef.current) {
      fetchAPIData({
        limit: pageSize,
        skip: pageSize * pageIndex,
      });
    }
  }, []);

  const goToHomePage = () => router.push("/");

  const showSkeleton = isValidating || loading;

  const columns = useMemo(
    () => [
      {
        Header: "Stock",
        accessor: "symbol",
        show: true,
      },
      {
        Header: "Value",
        accessor: "price",
        show: true,
      },
      {
        Header: "Shares",
        accessor: "amount",
        show: true,
      },
      {
        Header: "Change in percentage",
        accessor: "change",
        show: true,
      },
      {
        Header: "Trade",
        accessor: "trade",
        show: true,
      },
    ],
    []
  );

  return (
    <div>
      <p>This is the owned stocks section</p>
      {userHasStocks && (
        <Table
          pageCount={pageCount}
          fetchData={fetchData}
          columns={columns}
          loading={loading}
          data={data}
        />
      )}
      {!userHasStocks && <p>You currently don't have any stocks</p>}
      <button onClick={goToHomePage}>Home page</button>
    </div>
  );
};

export default OwnedStocksLayout;

// NOTE:
// Create loading animation when loading stocks - use protected file as template
// Load stocks with a for loop in this file and load them into a table
// In DisplayStock file, display the individual stock

// {showSkeleton && <ContentLoader><rect y="10" rx="3" ry="3" width="200" height="20" /></ContentLoader>}

// Create loading spinner - react-table has a built in loading spinner that I can use
