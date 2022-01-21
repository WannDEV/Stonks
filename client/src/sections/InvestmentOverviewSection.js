import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, useMemo, useEffect } from "react";
import { useTable } from "react-table";
import useMediaQuery from "@mui/material/useMediaQuery";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Router from "next/router";

import PurchaseHistory from "../sections/PurchaseHistory";
import EmptyFolder from "../../assets/empty-folder.svg";

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: "1",
  margin: theme.spacing(3),
  boxShadow: `0 0 35px -2px ${theme.palette.grey.main}`,
  padding: `${theme.spacing(4)} ${theme.spacing(2)}`,
  flexDirection: "column",
  borderRadius: "8px",
  [theme.breakpoints.down("sm")]: {
    margin: `${theme.spacing(3)} ${theme.spacing(1)}`,
  },
}));

const BankAccountSubHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.4rem",
  color: theme.palette.text.secondary,
  marginRight: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

const BankAccountHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.4rem",
  color: theme.palette.text.primary,
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

const BankAccountBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));

const ChangeTabBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  display: "flex",
  flexGrow: "1",
  justifyContent: "center",
  borderBottom: `2px solid ${theme.palette.grey.main}`,
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  // padding: `0 ${theme.spacing(5)}`,
  // [theme.breakpoints.down("md")]: {
  //   padding: `0 ${theme.spacing(10)}`,
  // }
}));

const StyledShoppingCartIcon = styled(ShoppingCartIcon)(({ theme }) => ({
  color: theme.palette.text.main,
  width: "24px",
  height: "24px",
  [theme.breakpoints.down("sm")]: {
    width: "16px",
    height: "16px",
  },
}));

const StyledTable = styled("table")(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(0.5),
  fontSize: "1.1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const StyledTr = styled("tr")(({ theme }) => ({}));

const StyledTh = styled("th")(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: "normal",
  backgroundColor: theme.palette.background.light,
  padding: `${theme.spacing(0.8)} 0`,
}));

const StyledThead = styled("thead")(({ theme }) => ({}));

const StyledTbody = styled("tbody")(({ theme }) => ({}));

const StyledTd = styled("td")(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.grey.main}`,
  padding: `${theme.spacing(0.8)} 0`,
}));

const TotalBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
}));

const TotalSubHeaderTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "1.2rem",
  display: "inline",
  marginRight: theme.spacing(0.5),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const TotalHeaderTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "1.2rem",
  fontWeight: "bold",
  display: "inline",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  boxShadow: `0 1px 3px rgba(255, 255, 255, 0.16), 0 1px 3px rgba(255, 255, 255, 0.23)`,
  borderRadius: "0",
}));

const PurchaseHistoryBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
}));

const PurchaseHistoryInnerBox = styled(Box)(({ theme }) => ({
  width: "40rem",
  margin: `0 ${theme.spacing(2)}`,
}));

const ExploreButton = styled(Button)(({ theme }) => ({
  width: "20rem",
  margin: `${theme.spacing(3)} ${theme.spacing(1)}`,
  background: `linear-gradient(100deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  fontSize: "1rem",
}));

const StyledEmptyFolder = styled(EmptyFolder)(({ theme }) => ({
  width: "15rem",
  "& path": {
    fill: theme.palette.text.primary,
  },
  borderRadius: "20%",
  [theme.breakpoints.down("sm")]: {
    width: "10rem",
  },
}));

const EmptyTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "1.8rem",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.4rem",
  },
}));

const EmptySubHeaderTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "1.1rem",
  textAlign: "center",
  marginTop: theme.spacing(0.5),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const EmptyBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const InvestmentOverviewSection = (props) => {
  const theme = useTheme();

  const DUMMY_DATA = [
    {
      price: 123,
      amount: 3,
      dateOfPurchase: new Date(),
      kind: "buy",
      id: "09qqj0fjeefs",
      status: "pending",
      stockGame: "1",
    },
    {
      price: 123,
      amount: 3,
      dateOfPurchase: new Date(),
      kind: "sell",
      id: "drgsrgsweg",
      status: "pending",
      stockGame: "2",
    },
    {
      price: 123,
      amount: 3,
      dateOfPurchase: new Date(),
      kind: "buy",
      id: "yjgkuykggjy",
      status: "success",
      stockGame: "3",
    },
    {
      price: 123,
      amount: 3,
      dateOfPurchase: new Date(),
      kind: "buy",
      id: "hukhukhukhu",
      status: "success",
      stockGame: "4",
    },
    {
      price: 123,
      amount: 3,
      dateOfPurchase: new Date(),
      kind: "sell",
      id: "rytryrtyrtyryyr",
      status: "failure",
      stockGame: "5",
    },
    {
      price: 123,
      amount: 3,
      dateOfPurchase: new Date(),
      kind: "buy",
      id: "tfhhfthssht",
      status: "success",
      stockGame: "6",
    },
    {
      price: 123,
      amount: 3,
      dateOfPurchase: new Date(),
      kind: "buy",
      id: "09qqj0fjeefs",
      status: "pending",
      stockGame: "7",
    },
    {
      price: 123,
      amount: 3,
      dateOfPurchase: new Date(),
      kind: "sell",
      id: "drgsrgsweg",
      status: "pending",
      stockGame: "8",
    },
    {
      price: 123,
      amount: 3,
      dateOfPurchase: new Date(),
      kind: "buy",
      id: "yjgkuykggjy",
      status: "success",
      stockGame: "9",
    },
    {
      price: 123,
      amount: 3,
      dateOfPurchase: new Date(),
      kind: "buy",
      id: "hukhukhukhu",
      status: "success",
      stockGame: "10",
    },
    {
      price: 123,
      amount: 3,
      dateOfPurchase: new Date(),
      kind: "sell",
      id: "rytryrtyrtyryyr",
      status: "failure",
      stockGame: "11",
    },
    {
      price: 123,
      amount: 3,
      dateOfPurchase: new Date(),
      kind: "buy",
      id: "tfhhfthssht",
      status: "success",
      stockGame: "12",
    },
  ];

  const userBalance = props.userBalance;

  const [currentTab, setCurrentTab] = useState(0);

  const showNarrowTable = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (showNarrowTable) {
      setHiddenColumns(["amount", "sharePrice", "totalWorth"]);
    } else {
      setHiddenColumns([]);
    }
  }, [showNarrowTable]);

  function a11yProps(index) {
    return {
      id: `action-tab-${index}`,
      "aria-controls": `action-tabpanel-${index}`,
    };
  }

  const figureOutColor = (column, value) => {
    if (column == "change" && parseFloat(value) > 0)
      return theme.palette.green.main;
    else if (column == "change" && parseFloat(value) < 0)
      return theme.palette.red.main;
    else if (column == "change" && parseFloat(value) == 0)
      return theme.palette.grey.light;
    else return "";
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const tradeButtonLayout = (symbol) => {
    return (
      <StyledIconButton
        aria-label="trade stocks"
        onClick={() => console.log(`Trading: ${symbol}`)}
        color="inherit"
      >
        <StyledShoppingCartIcon />
      </StyledIconButton>
    );
  };

  const data = useMemo(
    () => [
      {
        name: "Tesla Inc.",
        amount: 5,
        sharePrice: `${100} kr.`,
        totalWorth: `${500} kr.`,
        change: `${-0.02}%`,
        trade: tradeButtonLayout("tsla"),
      },
      {
        name: "Apple",
        amount: 3,
        sharePrice: `${700} kr.`,
        totalWorth: `${2100} kr.`,
        change: `${1.2}%`,
        trade: tradeButtonLayout("aapl"),
      },
      {
        name: "Amazon",
        amount: 20,
        sharePrice: `${2000} kr.`,
        totalWorth: `${400000} kr.`,
        change: `${0}%`,
        trade: tradeButtonLayout("amzn"),
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Navn",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Antal",
        accessor: "amount",
      },
      {
        Header: "Kurs",
        accessor: "sharePrice",
      },
      {
        Header: "Kursværdi",
        accessor: "totalWorth",
      },
      {
        Header: "Ændring",
        accessor: "change",
      },
      {
        Header: "Køb/sælg",
        accessor: "trade",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setHiddenColumns,
  } = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns: [],
    },
  });

  return (
    <ContentBox component="div">
      <BankAccountBox variant="div">
        <BankAccountSubHeaderTypography variant="body1">
          Bankkonto:
        </BankAccountSubHeaderTypography>
        <BankAccountHeaderTypography variant="body1">
          {userBalance} kr.
        </BankAccountHeaderTypography>
      </BankAccountBox>
      <ChangeTabBox variant="div">
        <StyledTabs
          value={currentTab}
          onChange={handleTabChange}
          variant="fullWidth"
          aria-label="action tabs example"
          TabIndicatorProps={{
            style: { background: theme.palette.white.main },
          }}
        >
          <StyledTab
            style={{
              color:
                currentTab == 0
                  ? theme.palette.white.main
                  : theme.palette.text.secondary,
              fontWeight: currentTab == 0 ? "bold" : "normal",
            }}
            label="Beholdning"
            {...a11yProps(0)}
          />
          <StyledTab
            style={{
              color:
                currentTab == 1
                  ? theme.palette.white.main
                  : theme.palette.text.secondary,
              fontWeight: currentTab == 1 ? "bold" : "normal",
            }}
            label="Handelshistorik"
            {...a11yProps(1)}
          />
        </StyledTabs>
      </ChangeTabBox>
      {currentTab == 0 && (
        <div>
          {data.length != 0 && (
            <div>
              <StyledTable {...getTableProps()}>
                <StyledThead>
                  {headerGroups.map((headerGroup) => (
                    <StyledTr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <StyledTh {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </StyledTh>
                      ))}
                    </StyledTr>
                  ))}
                </StyledThead>
                <StyledTbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <StyledTr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <StyledTd
                              {...cell.getCellProps()}
                              style={{
                                color: figureOutColor(
                                  cell.column.id,
                                  cell.value
                                ),
                              }}
                            >
                              {cell.render("Cell")}
                            </StyledTd>
                          );
                        })}
                      </StyledTr>
                    );
                  })}
                </StyledTbody>
              </StyledTable>
              <TotalBox component="div">
                <TotalSubHeaderTypography variant="body1">
                  Total:
                </TotalSubHeaderTypography>
                <TotalHeaderTypography variant="body1">
                  123231 kr.
                </TotalHeaderTypography>
              </TotalBox>
            </div>
          )}
          {data.length == 0 && (
            <EmptyBox component="div">
              <StyledEmptyFolder />
              <EmptyTypography variant="h3">
                Du ejer ikke nogle aktier
              </EmptyTypography>
              <EmptySubHeaderTypography variant="body1">
                Du kan udforske markederne og søge efter nogle aktier
              </EmptySubHeaderTypography>
            </EmptyBox>
          )}
          <Box
            component="div"
            sx={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <ExploreButton
              variant="contained"
              onClick={() => Router.push("/explore")}
            >
              Udforsk markederne
            </ExploreButton>
          </Box>
        </div>
      )}
      {currentTab == 1 && (
        <PurchaseHistoryBox component="div">
          <PurchaseHistoryInnerBox component="div">
            <PurchaseHistory
              symbol="TSLA"
              data={DUMMY_DATA}
              defaultShowAmount={5}
            />
          </PurchaseHistoryInnerBox>
        </PurchaseHistoryBox>
      )}
    </ContentBox>
  );
};

export default InvestmentOverviewSection;
