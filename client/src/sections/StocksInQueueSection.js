import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

import QueuedStocksOverview from "../sections/QueuedStocksOverview";

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.grey.main,
  margin: `${theme.spacing(2)} 0 ${theme.spacing(1)} 0`,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: "1",
  margin: theme.spacing(3),
  boxShadow: `0 0 35px -2px ${theme.palette.grey.main}`,
  padding: `${theme.spacing(4)} ${theme.spacing(2)}`,
  borderRadius: "8px",
  justifyContent: "space-between",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    margin: `${theme.spacing(3)} ${theme.spacing(1)}`,
  },
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.6rem",
  color: theme.palette.text.primary,
  fontWeight: "bold",
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    fontSize: "1.4rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

const SubHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.secondary,
}));

const StocksInQueueSection = (props) => {
  return (
    <StyledBox component="div">
      <HeaderTypography variant="h3">Handler i kø</HeaderTypography>
      <StyledDivider />
      <SubHeaderTypography variant="body1">
        En annullering tager ca. 20 min.
      </SubHeaderTypography>
      <QueuedStocksOverview data={props.pendingStocks} defaultShowAmount={10} />
    </StyledBox>
  );
};

export default StocksInQueueSection;
