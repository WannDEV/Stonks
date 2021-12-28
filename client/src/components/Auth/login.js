import { DialogContent } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useAuth } from "../../shared/context/auth";

// Auth providers
import GoogleLoginButton from "./providers/GoogleLoginButton";

const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({}));

const ListBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
}));

const ListBoxItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: 1,
  justifyContent: "center",
  margin: `${theme.spacing(2)} 0`,
  ":first-child": {
    marginTop: theme.spacing(4),
  },
  ":last-child": {
    marginBottom: theme.spacing(4),
  },
}));

const SubHeaderTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textAlign: "center",
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  textAlign: "center",
  fontSize: "2rem",
  [theme.breakpoints.up("md")]: {
    minWidth: "30rem",
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
}));

const LoginDialog = (props) => {
  const { isAuthenticated } = useAuth();

  const handleClose = props.handleClose;
  let open = isAuthenticated ? false : props.open;

  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Dialog
        fullScreen={fullscreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="Login dialog"
      >
        <StyledDialogTitle id="login-dialog-title">
          <Box display="flex" alignItems="center">
            <Box width="40px" />
            <Box flexGrow={1}>Log ind</Box>
            <Box>
              <IconButton
                onClick={handleClose}
                aria-label="Close dialog button"
                color="inherit"
              >
                <StyledCloseIcon />
              </IconButton>
            </Box>
          </Box>
        </StyledDialogTitle>
        <StyledDialogContent>
          <SubHeaderTypography variant="p" component="div">
            Du kan registrere dig med følgende udbydere:
          </SubHeaderTypography>
          <ListBox>
            <ListBoxItem>
              <GoogleLoginButton />
            </ListBoxItem>
          </ListBox>
        </StyledDialogContent>
      </Dialog>
    </div>
  );
};

export default LoginDialog;
