import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LinkIcon from "@mui/icons-material/Link";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share";
import { useState } from "react";

import ConnectedPeopleGraphic from "../../assets/connected-people.svg";

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

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const ActionBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "50%",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    alignItems: "center",
  },
}));

const GraphicBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: "40%",
  justifyContent: "center",
  alignItems: "center",
  marginRight: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    flexGrow: "100%",
  },
}));

const StyledConnectedPeopleGraphic = styled(ConnectedPeopleGraphic)(
  ({ theme }) => ({
    width: "100%",
    [theme.breakpoints.down("md")]: {
      width: "50%",
      margin: `${theme.spacing(3)} 0`,
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  })
);

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

const ShareLinkSubHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.secondary,
  margin: `${theme.spacing(1)} 0`,
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
}));

const ShareLinkBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "28rem",
  borderRadius: "8px",
  backgroundColor: theme.palette.background.light,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const LinkTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.secondary,
  display: "block",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
}));

const CopyLinkButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: `${theme.spacing(0.4)} 0`,
    margin: theme.spacing(1),
  },
  "&:focus": {
    backgroundColor: theme.palette.success.main,
  },
}));

const StyledLinkIcon = styled(LinkIcon)(({ theme }) => ({
  width: "24px",
  height: "24px",
  color: theme.palette.text.secondary,
  marginRight: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    width: "20px",
    height: "20px",
    marginRight: theme.spacing(0.5),
  },
}));

const SocialMediaSubHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.secondary,
  margin: `${theme.spacing(1)} 0`,
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
}));

const ShareOptionsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexWrap: "wrap",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
    borderBottom: `1px solid ${theme.palette.grey.main}`,
    paddingBottom: theme.spacing(2),
  },
  [theme.breakpoints.down("sm")]: {
    borderBottom: "none",
  },
}));

const StyledIcon = styled(Box)(({ theme }) => ({
  width: "32px",
  height: "32px",
  "& svg": {
    width: "100%",
    height: "100%",
    borderRadius: "100%",
  },
  margin: theme.spacing(1),
}));

const ShareLinkSection = (props) => {
  const urlId = props.urlId;

  const fullUrl = `https://aktiekampen.dk/${urlId}`;

  const [isLinkCopied, setIsLinkCopied] = useState(false);

  return (
    <StyledBox component="div">
      <HeaderTypography variant="h3">Inviter andre</HeaderTypography>
      <ContentBox component="div">
        <ActionBox component="div">
          <ShareLinkSubHeaderTypography variant="body1">
            Del med dette link.
          </ShareLinkSubHeaderTypography>
          <ShareLinkBox component="div">
            <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
              <StyledLinkIcon />
              <LinkTypography variant="body1">{fullUrl}</LinkTypography>
            </Box>
            <CopyLinkButton
              variant="contained"
              onClick={() => {
                navigator.clipboard.writeText(fullUrl);
                setIsLinkCopied(true);
              }}
              onBlur={() => setIsLinkCopied(false)}
            >
              {isLinkCopied ? "Kopierede" : "Kopier"}
            </CopyLinkButton>
          </ShareLinkBox>
          <SocialMediaSubHeaderTypography variant="body1">
            Eller brug disse medier.
          </SocialMediaSubHeaderTypography>
          <ShareOptionsBox component="div">
            <EmailShareButton url={fullUrl}>
              <StyledIcon component="div">
                <EmailIcon />
              </StyledIcon>
            </EmailShareButton>
            <FacebookShareButton url={fullUrl}>
              <StyledIcon component="div">
                <FacebookIcon />
              </StyledIcon>
            </FacebookShareButton>
            <LinkedinShareButton url={fullUrl}>
              <StyledIcon component="div">
                <LinkedinIcon />
              </StyledIcon>
            </LinkedinShareButton>
            <TwitterShareButton url={fullUrl}>
              <StyledIcon component="div">
                <TwitterIcon />
              </StyledIcon>
            </TwitterShareButton>
          </ShareOptionsBox>
        </ActionBox>
        <GraphicBox component="div">
          <StyledConnectedPeopleGraphic />
        </GraphicBox>
      </ContentBox>
    </StyledBox>
  );
};

export default ShareLinkSection;
