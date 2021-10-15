import React, { useState, useEffect } from "react";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { Link } from "react-router-dom";

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

  const [nameValue, setNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [sapCodeValue, setSapCodeValue] = useState("");
  const [sapUserValue, setSapUserValue] = useState("");
  const [plantaValue, setPlantaValue] = useState("");
  const [rolValue, setRolValue] = useState("");
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
    role: rolValue,
    operation: plantaValue,
    area: null,
    line: null,
    SAPCode: sapCodeValue,
    SAPUser: sapUserValue,
  };

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
              <TextField
                label="Nombres"
                variant="outlined"
                fullWidth
                size="small"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Apellidos"
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
              <TextField
                label="Email"
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
              <TextField
                label="Codigo SAP"
                variant="outlined"
                fullWidth
                size="small"
                type="number"
                value={sapCodeValue}
                onChange={(e) => setSapCodeValue(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Usuario SAP"
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
              <TextField
                label="Planta"
                variant="outlined"
                fullWidth
                select
                size="small"
                value={plantaValue}
                onChange={(e) => setPlantaValue(e.target.value)}
              >
                <MenuItem value={"Tropico"}>Tropico</MenuItem>
                <MenuItem value={"Apan"}>Apan</MenuItem>
                <MenuItem value={"Mexico"}>Mexico</MenuItem>
                <MenuItem value={"Yucatan"}>Yucatan</MenuItem>
                <MenuItem value={"Merida"}>Merida</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Rol"
                variant="outlined"
                fullWidth
                select
                size="small"
                value={rolValue}
                onChange={(e) => setRolValue(e.target.value)}
              >
                <MenuItem value={"Rol1"}>Rol uno</MenuItem>
                <MenuItem value={"Rol2"}>Rol dos</MenuItem>
                <MenuItem value={"Rol3"}>Rol tres</MenuItem>
                <MenuItem value={"Rol4"}>Rol cuatro</MenuItem>
              </TextField>
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
              <TextField
                label="Contraseña"
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
              <TextField
                error={error}
                label="Confirme su contraseña"
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
