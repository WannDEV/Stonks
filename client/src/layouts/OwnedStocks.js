import ContentLoader from "react-content-loader";
import { useTable, usePagination } from "react-table";
import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";

import api from "../services/api";
import { useAuth } from "../shared/context/auth";
import Table from "../components/DisplayOwnStocks/Stock-table";

const OwnedStocksLayout = () => {
    const { loading } = useAuth();
    const [data, setData] = useState([]);
    const [isValidating, setIsValidating] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const fetchIdRef = useRef(0);


    const fetchAPIData = async ({ limit, skip }) => {
        try {
            setIsValidating(true);
          await api(
            `/stock/all/owned?limit=${limit}&skip=${skip}`
          ).then(data => {
            console.log(`Data: ${data}`);
            setData(data.data);
      
            console.log(`pagecount: ${data.paging.pages}`);
            setPageCount(data.paging.pages);
            setIsValidating(false);
          });
        } catch (e) {
          console.log("Error while fetching", e);
          // setLoading(false)
        }
      };


    const fetchData = useCallback(
        ({ pageSize, pageIndex }) => {
          // console.log("fetchData is being called")
          // This will get called when the table needs new data
          // You could fetch your data from literally anywhere,
          // even a server. But for this example, we'll just fake it.
          // Give this fetch an ID
          const fetchId = ++fetchIdRef.current;
          setIsValidating(true);
          if (fetchId === fetchIdRef.current) {
            fetchAPIData({
              limit: pageSize,
              skip: pageSize * pageIndex,
            })
          }
        },
        []
      );

    // const { data, isValidating } = useSWR(
    //     loading ? false : "/stock/all/owned",
    //     api.get,
    //     {
    //         onSuccess: data => {
    //             setTableData(data.data);
    //             console.log(data.data);
    //         }
    //     }
    //   );

    //   useEffect(() => {
    //       api.get("/stock/all/owned").then(response => {
    //           setTableData(response.data);
    //           setIsValidating(false);
    //           console.log(tableData, response);
    //       });
    //   }, []);

    const showSkeleton = isValidating || loading;

    const columns = useMemo(
    () => [
        {
        Header: 'Stock',
        accessor: 'symbol', 
        show: true
        },
        {
        Header: 'Value',
        accessor: 'price', 
        show: true
        },
        {
            Header: "Shares",
            accessor: "amount", 
            show: true
        },
        {
        Header: "Change in percentage",
        accessor: "change", 
        show: true
        },
    ],
    []
    )

    return (
        <div>
            <p>This is the owned stocks section</p>
            <Table
            pageCount={pageCount}
            fetchData={fetchData}
            columns={columns}
            loading={loading}
            data={data}
            />
        </div>
    )
}

export default OwnedStocksLayout;

// NOTE:
// Create loading animation when loading stocks - use protected file as template
// Load stocks with a for loop in this file and load them into a table
// In DisplayStock file, display the individual stock

// {showSkeleton && <ContentLoader><rect y="10" rx="3" ry="3" width="200" height="20" /></ContentLoader>}

// Create loading spinner - react-table has a built in loading spinner that I can use