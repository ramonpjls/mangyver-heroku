import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Grid } from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ArchiveIcon from "@mui/icons-material/Archive";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import axios from "../axiosinstance";

import Protected from "./Potected";
import Noticereport from "./noticeReport";
import Notifications from "./notifications";
import Home from "./notice_mx/home";
import ShowAvisos from "./ShowAvisos";
import logopeq from "../assets/LogoP.png";

import { Link, Route } from "react-router-dom";

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const forgetToken = () => {
    localStorage.clear();
  };

  useEffect(() => {
    axios
      .get("/profiles")
      .then((res) => {
        return setUserInfo(res.data.profile.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#3f51b5",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon style={{ fontSize: 40 }} />
          </IconButton>
          <img src={logopeq} alt="logo" />
          <IconButton edge="end">
            <Link to="/Login">
              <ExitToAppIcon
                onClick={forgetToken}
                style={{ fontSize: 40, color: "white" }}
              />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Grid
            container
            spacing={3}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid item>
              <Avatar alt={userInfo} src="./" />
            </Grid>
            {open !== false ? (
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  {userInfo}
                </Typography>
              </Grid>
            ) : null}
          </Grid>
          <Divider />
          <Link to="/ShowAvisos">
            <ListItem>
              <ListItemIcon>
                <ModeCommentIcon style={{ color: "#3f51b5", fontSize: 40 }} />
              </ListItemIcon>
              <ListItemText primary="Avisos" />
            </ListItem>
          </Link>
          <Link to="/Home">
            <ListItem>
              <ListItemIcon>
                <AddCommentIcon style={{ color: "#3f51b5", fontSize: 40 }} />
              </ListItemIcon>
              <ListItemText primary="Creacion de avisos" />
            </ListItem>
          </Link>
          <Link to="/Notifications">
            <ListItem>
              <ListItemIcon>
                <NotificationsActiveIcon
                  style={{ color: "#3f51b5", fontSize: 40 }}
                />
              </ListItemIcon>
              <ListItemText primary="Creacion de Notificaciones" />
            </ListItem>
          </Link>
          <Link to="/Noticereport">
            <ListItem>
              <ListItemIcon>
                <ArchiveIcon style={{ color: "#3f51b5", fontSize: 40 }} />
              </ListItemIcon>
              <ListItemText primary="Descargar Avisos" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <Route path="/Noticereport">
          <Protected component={Noticereport} />
        </Route>
        <Route path="/ShowAvisos">
          <Protected component={ShowAvisos} />
        </Route>
        <Route path="/Home">
          <Protected component={Home} />
        </Route>
        <Route path="/Notifications">
          <Protected component={Notifications} />
        </Route>
      </Box>
    </Box>
  );
}
