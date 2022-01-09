import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(({ theme }) => ({
  width: "20rem",
  boxShadow: `0 0 35px -2px ${theme.palette.grey.main}`,
  margin: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.6rem",
  color: theme.palette.text.primary,
  margin: `${theme.spacing(1.5)} 0`,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.4rem",
  },
}));

const ValTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    fontSize: "1.3rem",
  },
}));

const LogoBox = styled(Box)(({ theme }) => ({
  width: "24px",
  height: "24px",
  color: theme.palette.text.primary,
  marginTop: theme.spacing(3),
}));

const GameInformationItem = (props) => {
  const val = props.val;
  const header = props.header;
  const logo = props.logo;
  console.log(props.val);
  return (
    <StyledBox variant="div">
      <Box
        variant="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LogoBox variant="div">{logo}</LogoBox>
        <HeaderTypography variant="h4">{header}</HeaderTypography>
        <ValTypography variant="h5">{val}</ValTypography>
      </Box>
    </StyledBox>
  );
};

export default GameInformationItem;
