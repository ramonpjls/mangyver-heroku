import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Header from "./components/Header";
import ShowAvisos from "./components/ShowAvisos";
import Home from "./components/notice_mx/home";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Login" exact component={Login} />
          <Route path="/" component={Header} />
          <Route path="/ShowAvisos" component={ShowAvisos} />
          <Route path="/Home" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
