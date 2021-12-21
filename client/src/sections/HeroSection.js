import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";

import landingPageHeaderTheme from "../themes/landing-page-header";

// This button needs to be changed. Add arrow animation on hover
// https://codepen.io/nicholaspetersen/pen/mEmOjb

const SpanBox = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  fontSize: "1rem",
  width: "15rem",
  height: "3rem",
  color: theme.palette.common.white,

  "& span": {
    display: "inline-block",
    position: "relative",
    transition: "all 300ms ease-out",
    willChange: "transform",
  },
  "&:hover span": {
    transform: "translate3d(-1rem, 0, 0)",
  },
  "& svg": {
    position: "relative",
    color: theme.palette.common.white,
    width: "1.1rem",
    right: "0px",
    opacity: "0",
    top: "50%",
    transition: "all 300ms ease-out",
    willChange: "right, opacity",
    "& *": {
      strokeWidth: "5",
      strokeColor: "transparent",
    },
  },
  "&:hover svg": {
    opacity: "1",
    right: "-2rem",
  },

  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
  },
}));

const SubHeaderTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "1.1rem",
  margin: `0 0 ${theme.spacing(4)} 0`,
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: "bold",
  fontSize: "3rem",
  margin: `0 0 ${theme.spacing(2.5)} 0`,
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    fontSize: "2.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

const HeroSectionBox = styled(Box)(({ theme }) => ({
  minHeight: "30rem",
  overflow: "hidden",
  width: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "row",
  padding: `0 ${theme.spacing(2)}`,

  backgroundColor: "red",
}));

const TextSideBox = styled(Box)(({ theme }) => ({
  flex: "1 1 50%",
  display: "flex",
  alignItems: "center",
  backgroundColor: "blue",
  [theme.breakpoints.down("md")]: {
    flex: "1",
  },
}));

const TextBox = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "0 0 0 auto",
  [theme.breakpoints.down("md")]: {
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const ImageSideBox = styled(Box)(({ theme }) => ({
  width: "50%",
  backgroundColor: "yellow",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const HeroSection = () => {
  return (
    <Container width="md">
      <HeroSectionBox>
        <TextSideBox>
          <TextBox>
            <ThemeProvider theme={landingPageHeaderTheme}>
              <HeaderTypography variant="h2" component="div">
                Fiktive penge<SpanBox component="span">,</SpanBox>
                <br />
                rigtig markedsdata.
              </HeaderTypography>
            </ThemeProvider>
            <SubHeaderTypography variant="p" component="div">
              Hos Aktiekampen kan du oprette aktiespil, så du kan investere
              fiktive penge på rigtig markedsdata
            </SubHeaderTypography>
            <ActionButton variant="contained" disableRipple>
              <span>
                Opret dig nu
                <svg
                  x="0px"
                  y="0px"
                  viewBox="0 0 36.1 25.8"
                  enable-background="new 0 0 36.1 25.8"
                >
                  <g>
                    <line
                      fill="none"
                      stroke="#FFFFFF"
                      stroke-width="3"
                      stroke-miterlimit="10"
                      x1="0"
                      y1="12.9"
                      x2="34"
                      y2="12.9"
                    ></line>
                    <polyline
                      fill="none"
                      stroke="#FFFFFF"
                      stroke-width="3"
                      stroke-miterlimit="10"
                      points="22.2,1.1 34,12.9 22.2,24.7   "
                    ></polyline>
                  </g>
                </svg>
              </span>
            </ActionButton>
          </TextBox>
        </TextSideBox>
        <ImageSideBox></ImageSideBox>
      </HeroSectionBox>
    </Container>
  );
};

export default HeroSection;
