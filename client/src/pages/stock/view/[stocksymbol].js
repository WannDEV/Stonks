import { useRouter } from "next/router";
import useSWR from "swr";
import ContentLoader from "react-content-loader";

import api from "../../../services/api";
import BuyStockButton from "../../../components/BuyStockButton";

const Stock = () => {
  const router = useRouter();
  const { stocksymbol } = router.query;
  const { data, isValidating } = useSWR("/stock/specific_stock", api.get);

  console.log(data);

  const showSkeleton = isValidating;

  return (
    <div>
      <p>Symbol: {stocksymbol}</p>
      {!showSkeleton && (
        <div>
          <p>Data: </p>
          <p>Name: {data.data.name}</p>
          <p>Price: {data.data.price}</p>
          <p>Stock candle: {JSON.stringify(data.data.stockCandle)}</p>
        </div>
      )}
      {showSkeleton && (
        <ContentLoader>
          <rect y="10" rx="3" ry="3" width="1000" height="20" />
        </ContentLoader>
      )}
      <BuyStockButton stockSymbol={stocksymbol} />
    </div>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: false,
      userTypes: ["user", "admin", "unassigned"],
    },
  };
}

export default Stock;
