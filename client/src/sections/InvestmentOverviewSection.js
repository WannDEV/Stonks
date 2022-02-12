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
import Divider from "@mui/material/Divider";

import PurchaseHistory from "../sections/PurchaseHistory";
import EmptyFolder from "../../assets/empty-folder.svg";
import TradeDialog from "../components/TradeDialog/TradeDialog";
import api from "../services/api";

const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.6rem",
  fontWeight: "bold",
  color: theme.palette.text.primary,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.4rem",
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

const HeaderDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.grey.main,
  margin: `${theme.spacing(2)} 0`,
}));

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
  fontSize: "1.1rem",
  color: theme.palette.text.secondary,
  marginRight: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const BankAccountHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  color: theme.palette.text.primary,
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
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

const BankAccountDisplayBalanceTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  color: theme.palette.text.secondary,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    textAlign: "center",
  },
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
  const userDisplayBalance = props.userDisplayBalance;
  const ownedStocks = props.ownedStocks;
  const startBalance = props.startBalance;

  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

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

  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false);

  const handleTradeDialogClose = () => setIsTradeDialogOpen(false);

  const [companyProfile, setCompanyProfile] = useState([]);

  const handleTradeButtonClick = (symbol) => {
    console.log(symbol);
    const getCompanyInformation = async function () {
      await api
        .get(`stock/get_company_information?symbol=${symbol}`)
        .then((response) => {
          setCompanyProfile(response.data[0]);
          setIsTradeDialogOpen(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getCompanyInformation();
  };

  const tradeButtonLayout = (symbol) => {
    return (
      <StyledIconButton
        aria-label="trade stocks"
        onClick={() => handleTradeButtonClick(symbol)}
        color="inherit"
      >
        <StyledShoppingCartIcon />
      </StyledIconButton>
    );
  };

  let finalOwnedStocks = [];
  let totalWorthWithBalance = userDisplayBalance;

  console.log(ownedStocks);

  for (let i = 0; i < ownedStocks.length; ++i) {
    finalOwnedStocks.push({
      name: ownedStocks[i].name,
      amount: Math.round((ownedStocks[i].amount + Number.EPSILON) * 100) / 100,
      sharePrice: `$${ownedStocks[i].newSharePrice}`,
      totalWorth: `$${
        Math.round(
          (ownedStocks[i].newSharePrice * ownedStocks[i].amount +
            Number.EPSILON) *
            100
        ) / 100
      }`,
      change: `${
        Math.round((ownedStocks[i].change + Number.EPSILON) * 100) / 100
      }%`,
      trade: tradeButtonLayout(ownedStocks[i].symbol),
    });
    totalWorthWithBalance +=
      ownedStocks[i].newSharePrice * ownedStocks[i].amount;
  }
  const totalChange = (totalWorthWithBalance / startBalance) * 100 - 100;

  if (ownedStocks.length > 0) {
    // spacing between data and total
    for (let i = 0; i < 2; ++i) {
      finalOwnedStocks.push({
        name: "",
        amount: "",
        sharePrice: "",
        totalWorth: "",
        change: "",
        trade: "",
      });
    }

    finalOwnedStocks.push({
      name: `Total: $${
        Math.round((totalWorthWithBalance + Number.EPSILON) * 100) / 100
      }`,
      amount: "",
      sharePrice: "",
      totalWorth: `$${
        Math.round(
          (totalWorthWithBalance - userDisplayBalance + Number.EPSILON) * 100
        ) / 100
      }`,
      change: `${Math.round((totalChange + Number.EPSILON) * 100) / 100}%`,
      trade: "",
    });
  }

  const data = useMemo(() => finalOwnedStocks, []);

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
      <HeaderTypography variant="h3">Investeringsoverblik</HeaderTypography>
      <HeaderDivider />
      <BankAccountBox variant="div">
        <BankAccountSubHeaderTypography variant="body1">
          Bankkonto:
        </BankAccountSubHeaderTypography>
        <BankAccountHeaderTypography variant="body1">
          ${Math.round((userDisplayBalance + Number.EPSILON) * 100) / 100}
        </BankAccountHeaderTypography>
      </BankAccountBox>
      <BankAccountDisplayBalanceTypography variant="body1">
        Tilgængeligt:{" "}
        <Box
          component="span"
          sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}
        >
          ${Math.round((userBalance + Number.EPSILON) * 100) / 100}
        </Box>
      </BankAccountDisplayBalanceTypography>
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
          {companyProfile.length != 0 && (
            <TradeDialog
              open={isTradeDialogOpen}
              handleClose={handleTradeDialogClose}
              companyProfile={companyProfile}
              currentTab="sell"
            />
          )}
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
