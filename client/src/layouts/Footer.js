import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import IconButton from "@mui/material/IconButton";

const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
}));

const FooterBox = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(5)} 0 0 0`,
  backgroundColor: theme.palette.background.main,
  marginTop: "auto",
  filter: "brightness(85%)",
}));

const LogoImage = styled("img")(({ theme }) => ({
  width: "5rem",
  height: "5rem",
  [theme.breakpoints.down("md")]: {
    width: "4rem",
    height: "4rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: "3rem",
    height: "3rem",
  },
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Source Serif Pro, serif",
  fontWeight: "bold",
  fontSize: "1.5rem",
  margin: `${theme.spacing(0.5)} 0 ${theme.spacing(2)} 0`,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: "1",
  justifyContent: "center",
  paddingTop: theme.spacing(2),
  borderTop: `2px solid ${theme.palette.grey.main}`,
  flexWrap: "wrap",
}));

const ContentBoxLink = styled(Link)(({ theme }) => ({
  margin: `0 ${theme.spacing(3)}`,
  textDecoration: "none",
  color: theme.palette.text.secondary,
  "&:after": {
    content: '""',
    position: "absolute",
    width: "100%",
    transform: "scaleX(0)",
    height: "2px",
    bottom: "0",
    left: "0",
    backgroundColor: theme.palette.text.secondary,
    transformOrigin: "bottom right",
    transition: "transform .25s ease-out",
  },
  "&:hover:after": {
    transform: "scaleX(1)",
    transformOrigin: "bottom left",
  },
  position: "relative",
  marginBottom: theme.spacing(2),
  cursor: "pointer",
}));

const FooterMainBox = styled(Box)(({ theme }) => ({}));

const FooterCopyrightBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.dark,
  display: "flex",
  flexGrow: "1",
  justifyContent: "center",
  padding: `${theme.spacing(0.5)} 0`,
}));

const CopyrightTypography = styled("p")(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const SocialMediaIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  width: "24px",
  height: "24px",
  margin: `0 ${theme.spacing(2)} ${theme.spacing(1.5)} ${theme.spacing(2)}`,
  "&:hover": {
    color: theme.palette.white.main,
  },
}));

const Footer = () => {
  return (
    <FooterBox variant="div">
      <FooterMainBox variant="div">
        <Container maxWidth="lg">
          <HeaderBox>
            <LogoImage src="/logo.svg" />
            <HeaderTypography variant="h2">Aktiekampen</HeaderTypography>
          </HeaderBox>
          <ContentBox variant="div">
            <ContentBoxLink>Brugsbetingelser</ContentBoxLink>
            <ContentBoxLink>Privatliv</ContentBoxLink>
            <ContentBoxLink>Kontakt os</ContentBoxLink>
          </ContentBox>
          <ContentBox variant="div">
            <SocialMediaIconButton
              href="https://www.instagram.com/"
              target="_blank"
            >
              <InstagramIcon />
            </SocialMediaIconButton>
            <SocialMediaIconButton
              href="https://www.facebook.com/"
              target="_blank"
            >
              <FacebookIcon />
            </SocialMediaIconButton>
            <SocialMediaIconButton
              href="https://www.twitter.com/"
              target="_blank"
            >
              <TwitterIcon />
            </SocialMediaIconButton>
          </ContentBox>
        </Container>
      </FooterMainBox>
      <FooterCopyrightBox variant="div">
        <CopyrightTypography>
          Copyright &copy; {new Date().getFullYear()} Aktiekampen
        </CopyrightTypography>
      </FooterCopyrightBox>
    </FooterBox>
  );
};

export default Footer;
