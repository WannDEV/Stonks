import ChoooseUsGraphic from "../../assets/choose-us-graphic.svg";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import lightTheme from "../themes/light-theme";
import AcUnitIcon from "@mui/icons-material/AcUnit";

const StyledAcUnitIcon = styled(AcUnitIcon)(({ theme }) => ({
  width: "auto",
  height: "50%",
  color: theme.palette.primary.main,
  marginLeft: "auto",
}));

const ReasonsTextBox = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    maxWidth: "25rem",
  },
}));

const TextContainerBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: "25rem",
  position: "relative",
  [theme.breakpoints.down("md")]: {
    maxWidth: "none",
    width: "100%",
    alignItems: "center",
  },
}));

const ReasonsParagraphTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "1rem",
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
}));

const ReasonsTitleTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Lato, sans-serif",
  color: theme.palette.text.primary,
  fontSize: "1.25rem",
  fontWeight: "600",
  margin: `${theme.spacing(2)} 0`,
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
}));

const SmallScreenIcon = styled(AcUnitIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  width: "3rem",
  height: "3rem",
}));

const SmallScreenIconBox = styled("div")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

const ReasonsIconBox = styled("div")(({ theme }) => ({
  display: "flex",
  // justifyContent: "right",
  margin: `${theme.spacing(3)} ${theme.spacing(2)} 0 0`,
  height: "5rem",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const ReasonsBox = styled("div")(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(3),
  minHeight: "5rem",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

const CenterReasonsBox = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
}));

const ChooseUsSectionBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
  clipPath: "polygon(0 7rem, 100% 0, 100% 100%, 0 100%)",
  [theme.breakpoints.down("md")]: {
    clipPath: "polygon(0 4rem, 100% 0, 100% 100%, 0 100%)",
  },
  [theme.breakpoints.down("sm")]: {
    clipPath: "polygon(0 2rem, 100% 0, 100% 100%, 0 100%)",
  },
}));

const StyledChoooseUsGraphic = styled(ChoooseUsGraphic)(({ theme }) => ({
  width: "100%",
  height: "100%",
}));

const TitleBox = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(15),
  marginBottom: theme.spacing(4),
  display: "flex",
  flexGrow: "1",
  justifyContent: "center",
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontFamily: "Lato, sans-serif",
  fontSize: "2.5rem",
  fontWeight: "600",
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.3rem",
  },
}));

const TextSideBox = styled("div")(({ theme }) => ({
  flex: "1 1 50%",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flex: "1",
  },

  padding: theme.spacing(2),
}));

const GraphicSideBox = styled("div")(({ theme }) => ({
  flex: "1 1 50%",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  padding: theme.spacing(2),
}));

const ContentBox = styled("div")(({ theme }) => ({
  display: "flex",

  // width: "100%",
}));

const ChooseUsSection = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <ChooseUsSectionBox component="div">
        <Container maxWidth="lg">
          <TitleBox>
            <TitleTypography variant="h2">
              Hvorfor vælge Aktiekampen?
            </TitleTypography>
          </TitleBox>
          {/* <StyledChoooseUsGraphic /> */}
          <ContentBox>
            <TextSideBox>
              <CenterReasonsBox>
                <ReasonsBox>
                  <SmallScreenIconBox>
                    <SmallScreenIcon />
                  </SmallScreenIconBox>
                  <ReasonsIconBox>
                    <StyledAcUnitIcon />
                  </ReasonsIconBox>
                  <TextContainerBox>
                    <ReasonsTextBox>
                      <ReasonsTitleTypography variant="h3">
                        Aktiespil
                      </ReasonsTitleTypography>
                      <ReasonsParagraphTypography variant="body1">
                        Du kan oprette aktiespil og kæmpe mod dine venner, for
                        at finde ud af hvem der er den bedste investor.
                      </ReasonsParagraphTypography>
                    </ReasonsTextBox>
                  </TextContainerBox>
                </ReasonsBox>
                <ReasonsBox>
                  <SmallScreenIconBox>
                    <SmallScreenIcon />
                  </SmallScreenIconBox>
                  <ReasonsIconBox>
                    <StyledAcUnitIcon />
                  </ReasonsIconBox>
                  <TextContainerBox>
                    <ReasonsTextBox>
                      <ReasonsTitleTypography variant="h3">
                        Bredt udvalg af markedsdata
                      </ReasonsTitleTypography>
                      <ReasonsParagraphTypography variant="body1">
                        Du kan vælge at investere i ting lige fra aktier til
                        kryptovaluta og råvarer. Du skal blot søge på den
                        ønskede ting og så vil den poppe frem.
                      </ReasonsParagraphTypography>
                    </ReasonsTextBox>
                  </TextContainerBox>
                </ReasonsBox>
                <ReasonsBox>
                  <SmallScreenIconBox>
                    <SmallScreenIcon />
                  </SmallScreenIconBox>
                  <ReasonsIconBox>
                    <StyledAcUnitIcon />
                  </ReasonsIconBox>
                  <TextContainerBox>
                    <ReasonsTextBox>
                      <ReasonsTitleTypography variant="h3">
                        Risikofrit
                      </ReasonsTitleTypography>
                      <ReasonsParagraphTypography variant="body1">
                        Da du investerer med fiktive penge er der ingen risiko.
                        Det betyder du får læringsudbyttet og samtidig beholder
                        dine penge.
                      </ReasonsParagraphTypography>
                    </ReasonsTextBox>
                  </TextContainerBox>
                </ReasonsBox>
              </CenterReasonsBox>
            </TextSideBox>
            <GraphicSideBox>
              <StyledChoooseUsGraphic />
            </GraphicSideBox>
          </ContentBox>
        </Container>
      </ChooseUsSectionBox>
    </ThemeProvider>
  );
};

export default ChooseUsSection;
