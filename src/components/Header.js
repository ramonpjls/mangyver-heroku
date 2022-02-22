import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Grid } from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ArchiveIcon from "@mui/icons-material/Archive";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddAlertIcon from "@mui/icons-material/AddAlert";

import Protected from "./Potected";
import Noticereport from "./noticeReport";
import Notifications from "./notifications";
import UserManagementLanding from "./users/UserManagementLanding";
import UserManagement from "./users/userManagement";
import Register from "./users/Register";
import ShowNotificaciones from "./ShowNotificaciones";
import Notificationsreport from "./notificationsReport";
import Home from "./notice_mx/home";
import Logout from "./Logout";
import Landing from "./landing";
import ShowAvisos from "./ShowAvisos";
import logopeq from "../assets/LogoP.png";

import { Link, Route } from "react-router-dom";

const drawerWidth = 291;

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

export default function MiniDrawer() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#3f51b5",
          }}
        >
          <div></div>
          <img src={logopeq} alt="logo" />
          <Logout />
        </Toolbar>
      </AppBar>
      <List style={{ border: "solid #EEEEEA 1px", height: "50rem" }}>
        <Grid
          paddingTop="70px"
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Landing />
        </Grid>
        <Divider />
        <Link style={{ textDecoration: "none" }} to="/ShowAvisos">
          <ListItem>
            <ListItemIcon>
              <ModeCommentIcon style={{ color: "#3f51b5", fontSize: 40 }} />
            </ListItemIcon>
            <ListItemText primary="Avisos" />
          </ListItem>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/Home">
          <ListItem>
            <ListItemIcon>
              <AddCommentIcon style={{ color: "#3f51b5", fontSize: 40 }} />
            </ListItemIcon>
            <ListItemText primary="Creacion de avisos" />
          </ListItem>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/Noticereport">
          <ListItem>
            <ListItemIcon>
              <ArchiveIcon style={{ color: "#3f51b5", fontSize: 40 }} />
            </ListItemIcon>
            <ListItemText primary="Descargar Avisos" />
          </ListItem>
        </Link>
        <Divider />
        <Link style={{ textDecoration: "none" }} to="/ShowNotificaciones">
          <ListItem>
            <ListItemIcon>
              <NotificationsIcon style={{ color: "#3f51b5", fontSize: 40 }} />
            </ListItemIcon>
            <ListItemText primary="Notificaciones" />
          </ListItem>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/Notifications">
          <ListItem>
            <ListItemIcon>
              <AddAlertIcon style={{ color: "#3f51b5", fontSize: 40 }} />
            </ListItemIcon>
            <ListItemText primary="Creacion de Notificaciones" />
          </ListItem>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/Notificationsreport">
          <ListItem>
            <ListItemIcon>
              <ArchiveIcon style={{ color: "#3f51b5", fontSize: 40 }} />
            </ListItemIcon>
            <ListItemText primary="Descargar de Notificaciones" />
          </ListItem>
        </Link>
      </List>
      {/* </Drawer> */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <Route path="/Noticereport">
          <Protected component={Noticereport} />
        </Route>
        <Route path="/ShowAvisos">
          <Protected component={ShowAvisos} />
        </Route>
        <Route path="/ShowNotificaciones">
          <Protected component={ShowNotificaciones} />
        </Route>
        {/* ruta para el manejo de los usuarios */}
        <Route path="/UserManagementLanding">
          <Protected component={UserManagementLanding} />
        </Route>
        <Route path="/Register">
          <Protected component={Register} />
        </Route>
        <Route path="/users">
          <Protected component={UserManagement} />
        </Route>
        <Route path="/Home">
          <Protected component={Home} />
        </Route>
        <Route path="/Notifications">
          <Protected component={Notifications} />
        </Route>
        <Route path="/Notificationsreport">
          <Protected component={Notificationsreport} />
        </Route>
      </Box>
    </Box>
  );
}
