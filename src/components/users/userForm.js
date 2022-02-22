import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  MenuItem,
  TextField,
  Select,
  InputLabel,
} from "@mui/material";
import axios from "../../axiosinstance";

//todos los campos seran requeridos menos codigo sap y subarea

const UserForm = (props) => {
  const [operations, setOperations] = useState([]);
  const [role, setRole] = useState([]);
  const [area, setArea] = useState([]);
  const [userId, setUserId] = useState(props.userValue.id);
  const [authValue, setAuthValue] = useState(props.userValue.auth);
  const [nameValue, setNameValue] = useState(props.userValue.name);
  const [emailValue, setEmailValue] = useState(props.userValue.email);
  const [sapCodeValue, setSapCodeValue] = useState(props.userValue.SAPCode);
  const [sapUserValue, setSapUserValue] = useState(props.userValue.SAPUser);
  const [plantaValue, setPlantaValue] = useState(props.userValue.operation.id);
  const [roleValue, setRoleValue] = useState(props.userValue.role);
  const [areaValue, setAreaValue] = useState(props.userValue.area);

  // eslint-disable-next-line
  const data = {
    name: nameValue,
    email: emailValue,
    role: roleValue,
    operation: plantaValue,
    area: areaValue,
    line: null,
    SAPCode: sapCodeValue,
    SAPUser: sapUserValue,
    auth: authValue,
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    console.log(data);

    axios
      .put(`/users/${userId}`, { data })
      .then((res) => {
        console.log(res);
        //window.location.reload();
      })
      .catch((err) => {
        console.warn(err);
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
              <Grid item xs={8}>
                <InputLabel> Nombres </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
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
                  type="text"
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
                  type="text"
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
              <Grid item xs={4}>
                <InputLabel> Estatus </InputLabel>
                <Select
                  id="role"
                  variant="outlined"
                  fullWidth
                  required
                  value={authValue}
                  onChange={(e) => setAuthValue(e.target.value)}
                  size="small"
                >
                  <MenuItem value={"pending"}>Pendiente</MenuItem>
                  <MenuItem value={"active"}>activo</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Grid>
                <Button type="submit" color="primary" variant="contained">
                  Actualizar usuario
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default UserForm;
