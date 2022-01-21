import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import ContentLoader from "react-content-loader";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Router from "next/router";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import api from "../../services/api";
import Chart from "../../components/Chart/index";
import IntervalButtons from "../../components/Chart/IntervalButtons";
import ChangeChartButtons from "../../components/Chart/ChangeChartButtons";
import TradeDialog from "../../components/TradeDialog/TradeDialog";
import PurchaseHistory from "../../sections/PurchaseHistory";

const TradeButton = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  margin: `${theme.spacing(0.5)} 0 ${theme.spacing(10)} 0`,
  padding: `${theme.spacing(1.6)} ${theme.spacing(15)}`,
  fontSize: "1rem",
  background: `linear-gradient(100deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  margin: `${theme.spacing(3)} 0 0 0`,
}));

const LogoImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: "100%",
  border: `2px solid ${theme.palette.white.main}`,
}));

const CompanyProfileBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: "1",
}));

const CompanyProfileLogoBox = styled(Box)(({ theme }) => ({
  height: "7rem",
  width: "7rem",
  marginRight: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    height: "5rem",
    width: "5rem",
  },
  [theme.breakpoints.down("sm")]: {
    height: "3rem",
    width: "3rem",
  },
}));

const CompanyProfileTextBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
  justifyContent: "center",
}));

const CompanyProfileHeaderTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Source Serif Pro, serif",
  fontWeight: "600",
  fontSize: "1.8rem",
  color: theme.palette.text.primary,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.3rem",
  },
}));

const CompanyProfileSubHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.secondary,
  [theme.breakpoints.down("md")]: {
    fontSize: "0.9rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
}));

const CompanyProfileSubHeaderLineBox = styled(Box)(({ theme }) => ({
  height: "1rem",
  width: "2px",
  backgroundColor: theme.palette.grey.main,
  display: "inline-block",
  margin: `0 ${theme.spacing(1)}`,
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

const LatestDataBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  marginBottom: theme.spacing(4),
}));

const LatestDataLeftSideBox = styled(Box)(({ theme }) => ({
  display: "flex",
  maxWidth: "30rem",
  flexDirection: "column",
  maxHeight: "20rem",
}));

const LatestDataRightSideBox = styled(Box)(({ theme }) => ({
  display: "flex",
  maxWidth: "50rem",
  flexDirection: "column",
  maxHeight: "20rem",
}));

const LatestDataPrimaryTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.primary,
  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
  },
}));

const LatestDataSecondaryTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.secondary,
  marginRight: theme.spacing(5),
  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
  },
}));

const LatestDataHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  color: theme.palette.text.primary,
  fontWeight: "bold",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
  },
}));

const LatestDataHorizontalBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: "1",
  justifyContent: "space-between",
}));

const LatestDataHorizontalNumbersBox = styled(Box)(({ theme }) => ({
  display: "flex",
  maxWidth: "8rem",
  [theme.breakpoints.down("md")]: {
    // width: "5rem"
  },
}));

const TradeButtonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
}));

const StyledChart = styled(Chart)(({ theme }) => ({}));

const StockOverview = () => {
  const router = useRouter();
  const theme = useTheme();

  const [companyProfile, setCompanyProfile] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [latestData, setLatestData] = useState([]);

  const [chartType, setChartType] = useState("areaChart");
  const [interval, setInterval] = useState("1d");
  const [currentTab, setCurrentTab] = useState(0); // used to decide if chart layout or purchase history should be shown

  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false);

  const handleTradeDialogClose = () => setIsTradeDialogOpen(false);

  useEffect(() => {
    const getCompanyInformation = async function () {
      await api
        .get(`stock/get_company_information?symbol=${router.query.symbol}`)
        .then((response) => {
          setCompanyProfile(response.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getChartData = async function () {
      await api
        .get(
          `stock/get_chart_data?symbol=${router.query.symbol}&interval=${router.query.interval}`
        )
        .then((response) => {
          setChartData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getLatestData = async function () {
      await api
        .get(`stock/get_latest_data?symbol=${router.query.symbol}`)
        .then((response) => {
          setLatestData(response.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // get company information
    if (router.query.symbol) {
      getLatestData();
    }

    // get chart data
    if (router.query.symbol) {
      if (router.query.interval) {
        if (router.query.charttype) getChartData();
      }
    }

    if (router.query.symbol && router.query.interval) {
      getCompanyInformation();
    }

    // set query params to useState
    if (router.query.charttype) {
      setChartType(router.query.charttype);
    }
    if (router.query.interval) {
      setInterval(router.query.interval);
    }
  }, [router.query.symbol, router.query.charttype, router.query.interval]);

  function a11yProps(index) {
    return {
      id: `action-tab-${index}`,
      "aria-controls": `action-tabpanel-${index}`,
    };
  }

  const onChartTypeChange = (newChartType) => {
    Router.push({
      pathname: "/stock/overview",
      query: {
        symbol: router.query.symbol,
        market: "NASDAQ",
        charttype: newChartType,
        interval,
        currentTab,
      },
    });
  };

  const onIntervalChange = (newInterval) => {
    Router.push({
      pathname: "/stock/overview",
      query: {
        symbol: router.query.symbol,
        market: "NASDAQ",
        charttype: chartType,
        interval: newInterval,
        currentTab,
      },
    });
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const bigNumberToNameString = (volume) => {
    const namesList = [
      ["Thousand", 3],
      ["Million", 6],
      ["Billion", 9],
      ["Trillion", 12],
      ["Quadrillion", 15],
      ["Quintillion", 18],
      ["Sextillion", 21],
      ["Septillion", 24],
      ["Octillion", 27],
      ["Nonillion", 30],
      ["Decillion", 33],
    ];
    let name = "";

    if (volume < 1000) {
      name = volume.toString();
    } else {
      const volumeStringLength = volume.toString().length;
      let hasFoundNumberFittingNumber = false;

      for (let i = 0; i < namesList.length; ++i) {
        if (
          volumeStringLength >= namesList[i][1] &&
          volumeStringLength < namesList[i][1] + 3
        ) {
          name = `${(volume / Math.pow(10, namesList[i][1])).toFixed(3)} ${
            namesList[i][0]
          }`;
          hasFoundNumberFittingNumber = true;
          break;
        }
      }
      if (hasFoundNumberFittingNumber == false) {
        console.log("oisjef");
        name = `${(
          volume / Math.pow(10, namesList[namesList.length - 1][1])
        ).toFixed(3)} ${namesList[namesList.length - 1][0]}`;
      }
    }

    return name;
  };

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

  return (
    <div>
      <Container maxWidth="lg">
        {companyProfile.length != 0 && (
          <div>
            <HeaderBox variant="div">
              <CompanyProfileBox variant="div">
                <CompanyProfileLogoBox variant="div">
                  <LogoImage src={companyProfile.image} />
                </CompanyProfileLogoBox>
                <CompanyProfileTextBox variant="div">
                  <CompanyProfileHeaderTypography variant="h1">
                    {companyProfile.companyName}
                  </CompanyProfileHeaderTypography>
                  <CompanyProfileSubHeaderTypography variant="h3">
                    {companyProfile.symbol}
                    <CompanyProfileSubHeaderLineBox variant="div" />
                    {router.query.market}
                  </CompanyProfileSubHeaderTypography>
                </CompanyProfileTextBox>
              </CompanyProfileBox>
              {currentTab == 0 && ( // only show change chart buttons if tab = chart tab
                <ChangeChartButtons
                  onChartTypeChange={onChartTypeChange}
                  chartType={chartType}
                />
              )}
            </HeaderBox>
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
                  label="Grafer"
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
                  label="Købshistorik"
                  {...a11yProps(1)}
                />
              </StyledTabs>
            </ChangeTabBox>
          </div>
        )}
        {companyProfile.length == 0 && (
          <ContentLoader>
            <rect y="10" rx="3" ry="3" width="1000" height="20" />
          </ContentLoader>
        )}
        {latestData.length != 0 && (
          <LatestDataBox variant="div">
            <LatestDataLeftSideBox variant="div">
              <LatestDataSecondaryTypography variant="body1" component={"span"}>
                Seneste lukkekurs
              </LatestDataSecondaryTypography>
              <LatestDataHeaderTypography variant="body1" component={"span"}>
                ${latestData.close.toFixed(2)}
              </LatestDataHeaderTypography>
              <LatestDataPrimaryTypography
                sx={{
                  color:
                    latestData.changePercent > 0
                      ? theme.palette.green.main
                      : theme.palette.red.main,
                  fontWeight: "bold",
                }}
                variant="body1"
                component={"span"}
              >
                {latestData.changePercent.toFixed(2)}%
              </LatestDataPrimaryTypography>
            </LatestDataLeftSideBox>
            <LatestDataRightSideBox variant="div" component={"span"}>
              <LatestDataHorizontalBox>
                <LatestDataSecondaryTypography
                  variant="body1"
                  component={"span"}
                >
                  Høj:{" "}
                </LatestDataSecondaryTypography>
                <LatestDataPrimaryTypography variant="body1" component={"span"}>
                  <LatestDataHorizontalNumbersBox>
                    ${latestData.high.toFixed(2)}
                  </LatestDataHorizontalNumbersBox>
                </LatestDataPrimaryTypography>
              </LatestDataHorizontalBox>
              <LatestDataHorizontalBox>
                <LatestDataSecondaryTypography
                  variant="body1"
                  component={"span"}
                >
                  Lav:{" "}
                </LatestDataSecondaryTypography>
                <LatestDataPrimaryTypography variant="body1" component={"span"}>
                  <LatestDataHorizontalNumbersBox>
                    ${latestData.low.toFixed(2)}
                  </LatestDataHorizontalNumbersBox>
                </LatestDataPrimaryTypography>
              </LatestDataHorizontalBox>
              <LatestDataHorizontalBox>
                <LatestDataSecondaryTypography
                  variant="body1"
                  component={"span"}
                >
                  Volume:{" "}
                </LatestDataSecondaryTypography>
                <LatestDataPrimaryTypography variant="body1" component={"span"}>
                  <LatestDataHorizontalNumbersBox>
                    {bigNumberToNameString(latestData.volume)}
                  </LatestDataHorizontalNumbersBox>
                </LatestDataPrimaryTypography>
              </LatestDataHorizontalBox>
            </LatestDataRightSideBox>
          </LatestDataBox>
        )}
      </Container>
      {currentTab == 0 && ( // tab = chart tab
        <div>
          <IntervalButtons
            interval={interval}
            onIntervalChange={onIntervalChange}
          />
          <StyledChart
            chartData={chartData}
            chartType={chartType}
            interval={interval}
          />
          <TradeButtonBox>
            <TradeButton
              variant="contained"
              onClick={() => setIsTradeDialogOpen(true)}
            >
              Køb eller sælg
            </TradeButton>
            <TradeDialog
              open={isTradeDialogOpen}
              handleClose={handleTradeDialogClose}
              companyProfile={companyProfile}
            />
          </TradeButtonBox>
        </div>
      )}
      {currentTab == 1 && ( // tab = purchase history tab
        <Container maxWidth="md">
          {companyProfile.length != 0 && (
            <PurchaseHistory
              symbol={companyProfile.symbol}
              data={DUMMY_DATA}
              defaultShowAmount={10}
            />
          )}
        </Container>
      )}
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

export default StockOverview;
