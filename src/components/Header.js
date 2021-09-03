import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Grid,
} from "@material-ui/core";

import { ExitToApp } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import AddCommentIcon from "@material-ui/icons/AddComment";
import ArchiveIcon from "@material-ui/icons/Archive";
import axios from "../axiosinstance";

import Noticereport from "./noticeReport";
import Home from "./notice_mx/home";
import ShowAvisos from "./ShowAvisos";
import logopeq from "../assets/LogoP.png";

import { Link, Route } from "react-router-dom";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "#3f51b5",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0.5),
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [userInfo, setUserInfo] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
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
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon style={{ fontSize: 40 }} />
          </IconButton>
          <img src={logopeq} alt="logo" />
          <IconButton edge="end">
            <Link to="/Login">
              <ExitToApp style={{ fontSize: 40, color: "white" }} />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon style={{ fontSize: 40 }} />
            ) : (
              <ChevronLeftIcon style={{ fontSize: 40 }} />
            )}
          </IconButton>
        </div>
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
              <Avatar className={classes.large} alt={userInfo} src="./" />
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
          <Link to="/noticereport">
            <ListItem>
              <ListItemIcon>
                <ArchiveIcon style={{ color: "#3f51b5", fontSize: 40 }} />
              </ListItemIcon>
              <ListItemText primary="Descargar Avisos" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path="/noticereport" component={Noticereport} />
        <Route path="/Home" component={Home} />
        <Route path="/ShowAvisos" component={ShowAvisos} />
      </main>
    </div>
  );
}
