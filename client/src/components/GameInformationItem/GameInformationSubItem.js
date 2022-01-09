import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "12rem",
  justifyContent: "space-between",
  alignItems: "center",
  border: `1px solid ${theme.palette.grey.main}`,
  borderRadius: "8px",
  margin: theme.spacing(2),
  padding: theme.spacing(1),
}));

const MarketTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.4rem",
  color: theme.palette.text.primary,
  marginRight: theme.spacing(1),
  textTransform: "capitalize",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.2rem",
  },
}));

const LogoBox = styled(Box)(({ theme }) => ({
  "& svg": {
    width: "32px",
    height: "32px",
  },
}));

const GameInformationSubItem = (props) => {
  const market = props.market;
  const logo = props.logo;

  return (
    <StyledBox variant="div">
      <MarketTypography variant="h4">{market}</MarketTypography>
      <LogoBox>{logo}</LogoBox>
    </StyledBox>
  );
};

export default GameInformationSubItem;
