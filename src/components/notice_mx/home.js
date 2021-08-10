import React, { Component } from "react";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import { MenuItem, Select, Typography, Container } from "@material-ui/core";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

class DropDown extends Component {
  onChange = (e) => {
    this.props.history.push(`/${e.target.value}`);
  };

  render() {
    return (
      <Container style={{ marginTop: "30px" }}>
        <Typography align="left" variant="h5">
          Elige el Proceso
        </Typography>
        <Select
          id="Proceso"
          variant="outlined"
          fullWidth
          size="small"
          defaultValue=""
          onChange={this.onChange}
        >
          <MenuItem value={"Step1"}>Crear Tarjeta (M1)</MenuItem>
          <MenuItem value={"Step2"}>Notificación de falla (M2)</MenuItem>
          <MenuItem value={"Step3"}>Aviso derivado de una orden (M3)</MenuItem>
        </Select>
      </Container>
    );
  }
}

const Menu = withRouter(DropDown);

const Home = () => {
  const Header = {
    backgroundColor: "#79A9D1",
    color: "white",
    borderRadius: "3px",
    padding: "10px",
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Container className="header" style={Header}>
          <Typography align="left" variant="h6">
            Creacion de Aviso
          </Typography>
        </Container>
        <Container className="formContainer" maxWidth="sm">
          <Menu />
          <Route path="/Step1" component={Step1} />
          <Route path="/Step2" component={Step2} />
          <Route path="/Step3" component={Step3} />
        </Container>
      </div>
    </BrowserRouter>
  );
};

export default Home;
