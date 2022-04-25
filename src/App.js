import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Header from "./components/Header";
import ShowAvisos from "./components/ShowAvisos";
import ShowNotificaciones from "./components/ShowNotificaciones";
import Home from "./components/notice_mx/home";
import Protected from "./components/Potected";
import Register from "./components/users/Register";
import Notifications from "./components/notifications";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import UserManagement from "./components/users/userManagement";
import UserManagementLanding from "./components/users/UserManagementLanding";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/Login" exact component={Login} />
            <Route path="/" component={Header} />
            <Route path="/ShowAvisos">
              <Protected component={ShowAvisos} />
            </Route>
            <Route path="/ShowNotificaciones">
              <Protected component={ShowNotificaciones} />
            </Route>
            <Route path="/Register">
              <Protected component={Register} />
            </Route>
            <Route path="/UserManagementLanding">
              <Protected component={UserManagementLanding} />
            </Route>
            <Route path="/users">
              <Protected component={UserManagement} />
            </Route>
            <Route path="/Notifications">
              <Protected component={Notifications} />
            </Route>
            <Route path="/Home">
              <Protected component={Home} />
            </Route>
            <Route path="/Home">
              <Protected component={Home} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
