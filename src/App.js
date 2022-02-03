import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Header from "./components/Header";
import ShowAvisos from "./components/ShowAvisos";
import Home from "./components/notice_mx/home";
import Protected from "./components/Potected";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Login" exact component={Login} />
          <Route path="/Register" exact component={Register} />
          <Route path="/" component={Header} />
          <Route path="/ShowAvisos">
            <Protected component={ShowAvisos} />
          </Route>
          <Route path="/Home">
            <Protected component={Home} />
          </Route>
          <Route path="/home">
            <Protected component={Home} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
