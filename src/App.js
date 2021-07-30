import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Header from "./components/Header";
import CreacionAviso from "./components/CreacionAviso";
import ShowAvisos from "./components/ShowAvisos";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Login" exact component={Login} />
          <Route path="/" component={Header} />
          <Route path="/Formulario" component={CreacionAviso} />
          <Route path="/ShowAvisos" component={ShowAvisos} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
