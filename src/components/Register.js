import React, { useState, useEffect } from "react";
import { Button, Grid, MenuItem, TextField } from "@mui/material";

import LogoG from "../assets/LogoG.png";
import PasswordStrengthIndicator from "./passwordStrengthIndicator";

const isNumberRegx = /\d/;
const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
const alphaExp = /[A-Z]*$/g;

//todos los campos seran requeridos menos codigo sap y subarea

const Register = () => {
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState(true);
  const [buttonDis, setButtonDis] = useState(true);
  const [helperError, setHelperError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [sapCodeValue, setSapCodeValue] = useState("");
  const [sapUserValue, setSapUserValue] = useState("");
  const [plantaValue, setPlantaValue] = useState("");
  const [rolValue, setRolValue] = useState("");
  const [areaValue, setAreaValue] = useState("");
  const [subAreaValue, setSubAreaValue] = useState("");
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

  return (
    <div>
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
                <MenuItem>Tropico</MenuItem>
                <MenuItem>Apan</MenuItem>
                <MenuItem>Mexico</MenuItem>
                <MenuItem>Yucatan</MenuItem>
                <MenuItem>Merida</MenuItem>
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
                <MenuItem></MenuItem>
                <MenuItem></MenuItem>
                <MenuItem></MenuItem>
                <MenuItem></MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Grid
            container
            item
            alignItems="center"
            direction="row"
            justifyContent="center"
            spacing={2}
          >
            <Grid item xs={4}>
              <TextField
                label="Area"
                variant="outlined"
                fullWidth
                select
                size="small"
                value={areaValue}
                onChange={(e) => setAreaValue(e.target.value)}
              >
                <MenuItem>Mantenimiento general</MenuItem>
                <MenuItem>Envasado</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="SubArea"
                variant="outlined"
                fullWidth
                select
                size="small"
                value={subAreaValue}
                onChange={(e) => setSubAreaValue(e.target.value)}
              >
                <MenuItem></MenuItem>
                <MenuItem></MenuItem>
                <MenuItem></MenuItem>
                <MenuItem></MenuItem>
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
          <Grid container item alignItems="center" justifyContent="center">
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
