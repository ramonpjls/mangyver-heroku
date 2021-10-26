import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  MenuItem,
  TextField,
  Select,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "../axiosinstance";

import LogoG from "../assets/LogoG.png";
import PasswordStrengthIndicator from "./passwordStrengthIndicator";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

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

  const [nameValue, setNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [sapCodeValue, setSapCodeValue] = useState("");
  const [sapUserValue, setSapUserValue] = useState("");
  const [plantaValue, setPlantaValue] = useState("");
  const [roleValue, setRoleValue] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidity, setPasswordValidity] = useState({
    minChar: null,
    number: null,
    mayusChar: null,
    specialChar: null,
  });

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
    area: null,
    line: null,
    SAPCode: sapCodeValue,
    SAPUser: sapUserValue,
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

  return (
    <div>
      <Grid>
        <Link style={{ textDecoration: "none" }} to="/Login" replace>
          <Button
            color="info"
            variant="contained"
            startIcon={<KeyboardBackspaceIcon />}
          >
            Ir a inicio de sesion
          </Button>
        </Link>
      </Grid>
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
          <Grid container alignItems="center" justifyContent="center">
            <img src={LogoG} alt={LogoG} />
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
              <Button color="primary" variant="contained" disabled={buttonDis}>
                Enviar solicitud
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
