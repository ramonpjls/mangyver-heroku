import React, { useState } from "react";
import {
  Grid,
  Button,
  InputAdornment,
  InputLabel,
  Input,
  IconButton,
  Snackbar,
  Hidden,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import axios from "../axiosinstance";

import LogoG from "../assets/LogoG.png";
import LandingLogin from "../assets/landing.png";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [values, setValues] = useState({ password: "" });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    const data = { username, password };

    setLoading(true);

    axios
      .post("/auth/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data);
        setLoading(false);
        setRedirect(true);
      })
      .catch((err) => {
        setOpen(true);
        setLoading(false);
      });
  };

  if (redirect) {
    return <Redirect to="/ShowAvisos" />;
  }

  return (
    <div>
      {loading ? (
        <Backdrop className={classes.backdrop} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
      <Grid
        container
        style={{
          minHeight: "90vh",
          justifyContent: "space-evenly",
        }}
      >
        <Hidden smDown>
          <Grid item style={{ textAlignLast: "center", alignSelf: "center" }}>
            <img
              src={LandingLogin}
              alt="landing"
              style={{ objectFit: "cover" }}
            />
          </Grid>
        </Hidden>
        <Grid
          container
          item
          alignItems="center"
          direction="column"
          style={{
            justifyContent: "center",
            placeContent: "center",
            width: "40vh",
          }}
        >
          <div />
          <form onSubmit={HandleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: "300px",
                rowGap: "1rem",
              }}
            >
              <Grid container>
                <img src={LogoG} alt="logo" />
              </Grid>
              <InputLabel variant="standard">Nombre de usuario</InputLabel>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                required
                fullWidth
              />
              <InputLabel variant="standard">Contraseña</InputLabel>
              <Input
                name="password"
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={password}
                required
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <div style={{ height: 20 }} />
              <Button
                color="primary"
                variant="contained"
                type="submit"
                size="small"
              >
                Entrar
              </Button>
            </div>
          </form>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
          >
            <Alert severity="error">
              Nombre de usuario y/o Contraseña incorectos
            </Alert>
          </Snackbar>
        </Grid>
        <div />
      </Grid>
    </div>
  );
};

export default Login;
