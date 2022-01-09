import React, { useState, useEffect } from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { useAuth } from "../shared/context/auth";
import LoginDialog from "../components/Auth/Login";
import SearchBar from "../components/SearchBar/SearchBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Router from "next/router";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const StyledAcUnitIcon = styled(AcUnitIcon)(({ theme }) => ({
  width: "24",
  height: "24",
  color: theme.palette.text.primary,
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
  color: theme.palette.text.primary,
  width: "100%",
  "&:hover": {
    backgroundColor: alpha(theme.palette.text.primary, 0.1),
    transition: "background-color 0.5s linear",
  },
}));

const HeaderLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
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
  color: theme.palette.text.primary,
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
    backgroundColor: theme.palette.text.primary,
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
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({
  color: theme.palette.text.primary,
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

const StyledMenuIcon = styled(MenuIcon)(({ theme }) => ({
  width: "32px",
  height: "32px",
  [theme.breakpoints.down("xs")]: {
    width: "20px",
    height: "20px",
  },
}));

const MenuIconButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(2),
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    padding: "1",
  },
  [theme.breakpoints.down("sm")]: {
    margin: `${theme.spacing(1)} 0 ${theme.spacing(1)} 0`,
    padding: theme.spacing(1),
  },
}));

const LogoBox = styled(Box)(({ theme }) => ({
  margin: "4px",
  marginTop: theme.spacing(0.75),
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Source Serif Pro, serif",
  [theme.breakpoints.down("md")]: {
    margin: "auto",
    fontWeight: "bold",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "1rem",
  },
  marginTop: theme.spacing(0.5),
}));

const HeaderTypographyDrawer = styled(Typography)(({ theme }) => ({
  fontFamily: "Source Serif Pro, serif",
  margin: "auto 0 auto 5px",
  color: theme.palette.text.primary,
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
  [theme.breakpoints.down("xs")]: {
    marginLeft: "2px",
  },
}));

const LogInText = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  textTransform: "none",
  fontSize: theme.typography.fontSize,
  marginLeft: "3px",
  [theme.breakpoints.down("xs")]: {
    marginLeft: "0",
  },
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

const StyledAccountCircle = styled(AccountCircle)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const StyledLogoIcon = styled("img")(({ theme }) => ({
  width: "24px",
  height: "24px",
  [theme.breakpoints.down("xs")]: {
    width: "20px",
    height: "20px",
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  marginTop: "45px",
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.grey.main,
  },
}));

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const theme = useTheme();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => setIsDrawerOpen(false);
  const openDrawer = () => setIsDrawerOpen(true);

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const openLoginDialog = () => setIsLoginDialogOpen(true);
  const closeLoginDialog = () => setIsLoginDialogOpen(false);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settingsFunc = () => Router.push("/settings");
  const logOutFunc = () => {
    Router.push("/logged-out");
    logout();
  };

  const settingsIconStyling = {
    color: theme.palette.white.main,
    width: "24px",
    height: "24px",
    marginRight: theme.spacing(0.8),
  };

  const settings = [
    {
      name: "Indstillinger",
      func: settingsFunc,
      icon: <SettingsIcon sx={settingsIconStyling} />,
    },
    {
      name: "Log ud",
      func: logOutFunc,
      icon: <LogoutIcon sx={settingsIconStyling} />,
    },
  ];

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
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={openDrawer}
              >
                <StyledMenuIcon />
              </MenuIconButton>
              <HeaderLink href="/" underline="none">
                <Box sx={{ display: "flex" }}>
                  <LogoBox>
                    <StyledLogoIcon src="/logo.svg" />
                  </LogoBox>
                  <HeaderTypography variant="h6" noWrap component="div">
                    Aktiekampen
                  </HeaderTypography>
                </Box>
              </HeaderLink>
              <SearchBar />
              <InvisibleBox />
              <MenuItemBox>
                <MenuItemLink href="#" underline="none">
                  Overblik
                </MenuItemLink>
                <MenuItemLink href="#" underline="none">
                  Om os
                </MenuItemLink>
              </MenuItemBox>
              {isAuthenticated && (
                <div>
                  <Tooltip title="Profil">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      size="small"
                      sx={{ ml: 2 }}
                    >
                      <Avatar
                        sx={{ width: 32, height: 32 }}
                        src={user.picture}
                      />
                    </IconButton>
                  </Tooltip>
                  <StyledMenu
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting.name} onClick={setting.func}>
                        <Box
                          variant="div"
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {setting.icon}
                          <Typography textAlign="center">
                            {setting.name}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </StyledMenu>
                </div>
              )}
              {!isAuthenticated && (
                <LogInButton
                  variant="outlined"
                  color="white"
                  onClick={openLoginDialog}
                >
                  <StyledAccountCircle />
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
            <HeaderTypographyDrawer variant="h6" noWrap component="div">
              Aktiekampen
            </HeaderTypographyDrawer>
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
