import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  MenuItem,
  TextField,
  Select,
  InputLabel,
  Typography,
  Container,
} from "@mui/material";
import axios from "../../axiosinstance";
import Swal from "sweetalert2";

import PasswordStrengthIndicator from "./passwordStrengthIndicator";

const isNumberRegx = /\d/;
// eslint-disable-next-line
const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
const alphaExp = /[A-Z]*$/g;

//todos los campos seran requeridos menos codigo sap y subarea

const Register = () => {
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState(true);
  const [buttonDis, setButtonDis] = useState(true);
  const [helperError, setHelperError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [operations, setOperations] = useState([]);
  const [role, setRole] = useState([]);
  const [area, setArea] = useState([]);

  const [nameValue, setNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [sapCodeValue, setSapCodeValue] = useState("");
  const [sapUserValue, setSapUserValue] = useState("");
  const [plantaValue, setPlantaValue] = useState("");
  const [roleValue, setRoleValue] = useState("");
  const [areaValue, setAreaValue] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidity, setPasswordValidity] = useState({
    minChar: null,
    number: null,
    mayusChar: null,
    specialChar: null,
  });

  const pageHeader = {
    backgroundColor: "#79A9D1",
    color: "white",
    borderRadius: "3px",
    padding: "10px",
    maxWidth: "100%",
  };

  const onChangePassword = (password) => {
    setPassword(password);

    setPasswordValidity({
      mayusChar: alphaExp.test(password) ? true : false,
      minChar: password.length >= 8 ? true : false,
      number: isNumberRegx.test(password) ? true : false,
      specialChar: specialCharacterRegx.test(password) ? true : false,
    });
  };

  useEffect(() => {
    if (password === confirmPassword) {
      setError(false);
      setHelperError("");
      setButtonDis(false);
    } else {
      setButtonDis(true);
      setError(true);
      setHelperError("debe coincidir las contraseñas");
    }
  }, [confirmPassword, password]);

  useEffect(() => {
    setFullName(nameValue + lastNameValue);
  }, [nameValue, lastNameValue]);

  // eslint-disable-next-line
  const data = {
    name: fullName,
    username: emailValue,
    password: password,
    email: emailValue,
    role: roleValue,
    operation: plantaValue,
    area: areaValue,
    line: null,
    SAPCode: sapCodeValue,
    SAPUser: sapUserValue,
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      text: "Creado exitosamente",
      icon: "success",
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    axios.get("/operations").then((response) => {
      setOperations(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/roles").then((response) => {
      setRole(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/areas").then((response) => {
      setArea(response.data);
    });
  }, []);

  return (
    <div>
      <Container className="header" style={pageHeader}>
        <Typography align="left" variant="h6">
          Registro de Usuarios
        </Typography>
      </Container>
      <form style={{ paddingTop: "1rem" }} onSubmit={HandleSubmit}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            container
            spacing={4}
            alignItems="stretch"
            direction="column"
            justifyContent="center"
          >
            <Grid
              container
              item
              alignItems="center"
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Grid item xs={4}>
                <InputLabel> Nombres </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel> Apellidos </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  type="Text"
                  value={lastNameValue}
                  onChange={(e) => setLastNameValue(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              direction="row"
              justifyContent="center"
            >
              <Grid item xs={8}>
                <InputLabel> Email </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="email"
                  size="small"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Grid item xs={4}>
                <InputLabel> Codigo SAP </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  type="number"
                  value={sapCodeValue}
                  onChange={(e) => setSapCodeValue(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel> Usuario SAP </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  type="number"
                  value={sapUserValue}
                  onChange={(e) => setSapUserValue(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Grid item xs={4}>
                <InputLabel> Operacion </InputLabel>
                <Select
                  id="departamento"
                  variant="outlined"
                  fullWidth
                  required
                  value={plantaValue}
                  onChange={(e) => setPlantaValue(e.target.value)}
                  size="small"
                >
                  {operations.map((elemento) => (
                    <MenuItem key={elemento.id} value={elemento.id}>
                      {elemento.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={4}>
                <InputLabel> Rol </InputLabel>
                <Select
                  id="role"
                  variant="outlined"
                  fullWidth
                  required
                  value={roleValue}
                  onChange={(e) => setRoleValue(e.target.value)}
                  size="small"
                >
                  {role.map((elemento) => (
                    <MenuItem key={elemento.id} value={elemento.id}>
                      {elemento.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Grid item xs={4}>
                <InputLabel> Area </InputLabel>
                <Select
                  id="departamento"
                  variant="outlined"
                  fullWidth
                  required
                  value={areaValue}
                  onChange={(e) => setAreaValue(e.target.value)}
                  size="small"
                >
                  {area.map((elemento) => (
                    <MenuItem key={elemento.id} value={elemento.id}>
                      {elemento.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Grid item xs={4}>
                <InputLabel> Contraseña </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  type="Password"
                  value={password}
                  onChange={(e) => onChangePassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel> Confirme su contraseña </InputLabel>
                <TextField
                  error={error}
                  variant="outlined"
                  fullWidth
                  size="small"
                  type="Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  helperText={helperError}
                />
              </Grid>
              <Grid
                container
                item
                alignItems="center"
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Grid item>
                  {passwordFocused && (
                    <PasswordStrengthIndicator validity={passwordValidity} />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Grid>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={buttonDis}
                >
                  Enviar solicitud
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Register;
