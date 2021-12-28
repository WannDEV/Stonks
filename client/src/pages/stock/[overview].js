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
}));

const CompanyProfileSubHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.secondary,
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
  maxWidth: "30rem",
  justifyContent: "center",
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.grey.main}`,
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
}));

const LatestDataSecondaryTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.secondary,
  marginRight: theme.spacing(5),
}));

const LatestDataHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  color: theme.palette.text.primary,
  fontWeight: "bold",
}));

const LatestDataHorizontalBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: "1",
  justifyContent: "space-between",
}));

const LatestDataHorizontalNumbersBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "8rem",
}));

const StockOverview = () => {
  const router = useRouter();
  const theme = useTheme();

  const [companyProfile, setCompanyProfile] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [latestData, setLatestData] = useState([]);

  const [chartType, setChartType] = useState("areaChart");
  const [interval, setInterval] = useState("1d");
  const [currentTab, setCurrentTab] = useState(0); // used to decide if chart layout or purchase history should be shown

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
        {latestData.length != 0 && currentTab == 0 && (
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
                  Højeste kurs:{" "}
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
                  Laveste kurs:{" "}
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
          <Chart
            chartData={chartData}
            chartType={chartType}
            interval={interval}
          />
        </div>
      )}
      {currentTab == 1 && ( // tab = purchase history tab
        <div>
          <p>Købshistorik</p>
        </div>
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
