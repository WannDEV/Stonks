import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import HeroSectionGraphic from "../components/HeroSectionGraphic/HeroSectionGraphic";

const SpanBox = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  fontSize: "1rem",
  width: "15rem",
  height: "3rem",
  color: theme.palette.primary.contrastText,

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
    color: theme.palette.primary.contrastText,
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
  [theme.breakpoints.down("sm")]: {
    width: "12rem",
  },
}));

const SubHeaderTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "1.1rem",
  lineHeight: "1.5rem",
  letterSpacing: "0.5px",
  margin: `0 0 ${theme.spacing(4)} 0`,
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "lato, sans-serif",
  color: theme.palette.text.primary,
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
}));

const TextSideBox = styled(Box)(({ theme }) => ({
  flex: "1 1 50%",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flex: "1",
  },
}));

const TextBox = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "0 0 0 auto",
  maxWidth: "32rem",
  [theme.breakpoints.down("md")]: {
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
  },
}));

const ImageSideBox = styled(Box)(({ theme }) => ({
  width: "50%",
  position: "relative",
  padding: "0 0 0 5rem",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const HeroSection = () => {
  return (
    // <Container width="md">
    <HeroSectionBox>
      <TextSideBox>
        <TextBox>
          <HeaderTypography variant="h2" component="div">
            Fiktive penge<SpanBox component="span">,</SpanBox>
            <br />
            rigtig markedsdata.
          </HeaderTypography>
          <SubHeaderTypography variant="p" component="div">
            Hos Aktiekampen kan du oprette aktiespil og investere fiktive penge
            på rigtig markedsdata.
          </SubHeaderTypography>
          <ActionButton variant="contained" disableRipple>
            <span>
              Opret dig nu
              <svg
                x="0px"
                y="0px"
                viewBox="0 0 36.1 25.8"
                enableBackground="new 0 0 36.1 25.8"
              >
                <g>
                  <line
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                    x1="0"
                    y1="12.9"
                    x2="34"
                    y2="12.9"
                  ></line>
                  <polyline
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                    points="22.2,1.1 34,12.9 22.2,24.7   "
                  ></polyline>
                </g>
              </svg>
            </span>
          </ActionButton>
        </TextBox>
      </TextSideBox>
      <ImageSideBox>
        <HeroSectionGraphic />
      </ImageSideBox>
    </HeroSectionBox>
    // </Container>
  );
};

export default HeroSection;
