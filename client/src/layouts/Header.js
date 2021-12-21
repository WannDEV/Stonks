import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import theme from "../themes/navbar-header";
import { ThemeProvider } from "@mui/material/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { useAuth } from "../shared/context/auth";
import LoginDialog from "../components/Auth/Login";

const StyledAcUnitIcon = styled(AcUnitIcon)(({ theme }) => ({
  width: "24",
  height: "24",
  color: theme.palette.common.white,
  margin: `0 ${theme.spacing(2)} 0 ${theme.spacing(2)}`,
}));

const DrawerButtonTypography = styled(Typography)(({ theme }) => ({
  textTransform: "none",
}));

const DrawerButtonContentAlignment = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: 1,
  margin: `${theme.spacing(1)} 0 ${theme.spacing(1)} 0`,
  ":first-of-type": {
    marginTop: theme.spacing(2),
  },
}));

const DrawerButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  width: "100%",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    transition: "background-color 0.5s linear",
  },
}));

const HeaderLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.background.dark,
}));

const LogoBoxDrawer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: 1,
  justifyContent: "center",
  alignContent: "center",
  marginBottom: theme.spacing(2),
}));

const MenuItemLink = styled(Link)(({ theme }) => ({
  margin: `0 ${theme.spacing(5)} 0 0`,
  color: theme.palette.common.white,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  "&:after": {
    content: '""',
    position: "absolute",
    width: "100%",
    transform: "scaleX(0)",
    height: "2px",
    bottom: "0",
    left: "0",
    backgroundColor: theme.palette.common.white,
    transformOrigin: "bottom right",
    transition: "transform .25s ease-out",
  },
  "&:hover:after": {
    transform: "scaleX(1)",
    transformOrigin: "bottom left",
  },
  position: "relative",
}));

const MenuItemBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textAlign: "center",
}));

const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({
  color: theme.palette.common.white,
  width: "2rem",
  height: "2rem",
  margin: theme.spacing(2),
}));

const DrawerBox = styled(Box)(({ theme }) => ({
  width: "300px",
  height: "100%",
  backgroundColor: theme.palette.background.light,
}));

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({}));

const MenuIconButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    margin: `${theme.spacing(1)} 0 ${theme.spacing(1)} 0`,
    padding: theme.spacing(1),
  },
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
}));

const LogoBox = styled(Box)(({ theme }) => ({
  margin: "4px",
  marginTop: theme.spacing(0.75),
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  display: { xs: "none", xs: "block" },
  [theme.breakpoints.down("md")]: {
    margin: "auto",
    fontWeight: "bold",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
  marginTop: theme.spacing(0.5),
}));

const HeaderTypographyDrawer = styled(Typography)(({ theme }) => ({
  margin: "auto 0 auto 5px",
  color: theme.palette.common.white,
  fontSize: "1.5rem",
  fontWeight: "bold",
}));

const LogInButton = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.5),
  },
  marginRight: theme.spacing(1),
}));

const LogInText = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  textTransform: "none",
  fontSize: theme.typography.fontSize,
  marginLeft: "3px",
}));

const InvisibleBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  [theme.breakpoints.down("md")]: {
    justifyContent: "space-between",
  },
  margin: theme.spacing(1),
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(1),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: "100%",
  order: 1,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
    order: 0,
    marginBottom: 0,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    height: "70%",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    [theme.breakpoints.up("lg")]: {
      width: "30ch",
    },
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
}));

export default function Header() {
  const { isAuthenticated, user } = useAuth();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => setIsDrawerOpen(false);
  const openDrawer = () => setIsDrawerOpen(true);

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const openLoginDialog = () => setIsLoginDialogOpen(true);
  const closeLoginDialog = () => setIsLoginDialogOpen(false);

  useEffect(() => {
    if (isAuthenticated) closeLoginDialog();
  });

  return (
    <React.Fragment>
      <Box sx={{ width: "100%" }}>
        <StyledAppBar position="static">
          <StyledContainer width="md">
            <StyledToolbar>
              <MenuIconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={openDrawer}
              >
                <MenuIcon />
              </MenuIconButton>
              <HeaderLink href="/" underline="none">
                <Box sx={{ display: "flex" }}>
                  <LogoBox>
                    <img src="/logo.svg" width="24" height="24" />
                  </LogoBox>
                  <ThemeProvider theme={theme}>
                    <HeaderTypography variant="h6" noWrap component="div">
                      Aktiekampen
                    </HeaderTypography>
                  </ThemeProvider>
                </Box>
              </HeaderLink>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Søg efter aktier..."
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <InvisibleBox />
              <MenuItemBox>
                <MenuItemLink href="#" underline="none">
                  Overblik
                </MenuItemLink>
                <MenuItemLink href="#" underline="none">
                  Om os
                </MenuItemLink>
                {isAuthenticated && (
                  <Tooltip title="Account settings">
                    <IconButton onClick={() => {}} size="small" sx={{ ml: 2 }}>
                      <Avatar
                        sx={{ width: 32, height: 32 }}
                        src={user.picture}
                      />
                    </IconButton>
                  </Tooltip>
                )}
              </MenuItemBox>
              {!isAuthenticated && (
                <LogInButton
                  variant="outlined"
                  color="white"
                  onClick={openLoginDialog}
                >
                  <AccountCircle sx={{ display: { xs: "none", md: "flex" } }} />
                  <LogInText>Log ind</LogInText>
                </LogInButton>
              )}
            </StyledToolbar>
          </StyledContainer>
        </StyledAppBar>
      </Box>
      <StyledSwipeableDrawer
        anchor="left"
        open={isDrawerOpen}
        onClose={closeDrawer}
        onOpen={openDrawer}
      >
        <DrawerBox>
          <Box sx={{ display: "flex", flexGrow: 1, direction: "rtl" }}>
            <IconButton onClick={closeDrawer} aria-label="Close drawer">
              <StyledCloseIcon />
            </IconButton>
          </Box>
          <LogoBoxDrawer>
            <img src="/logo.svg" width="32" height="32" />
            <ThemeProvider theme={theme}>
              <HeaderTypographyDrawer variant="h6" noWrap component="div">
                Aktiekampen
              </HeaderTypographyDrawer>
            </ThemeProvider>
          </LogoBoxDrawer>
          <StyledDivider />
          <DrawerButton href="/">
            <DrawerButtonContentAlignment>
              <StyledAcUnitIcon />
              <DrawerButtonTypography>Test</DrawerButtonTypography>
            </DrawerButtonContentAlignment>
          </DrawerButton>
          <DrawerButton href="#">
            <DrawerButtonContentAlignment>
              <StyledAcUnitIcon />
              <DrawerButtonTypography>Another test</DrawerButtonTypography>
            </DrawerButtonContentAlignment>
          </DrawerButton>
        </DrawerBox>
      </StyledSwipeableDrawer>
      <LoginDialog open={isLoginDialogOpen} handleClose={closeLoginDialog} />
    </React.Fragment>
  );
}
