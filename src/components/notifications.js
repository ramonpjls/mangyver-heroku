import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  MenuItem,
  TextField,
  Container,
  Typography,
  Select,
  InputLabel,
} from "@mui/material";
import TimePicker from "@mui/lab/TimePicker";
import axios from "../axiosinstance";

const Header = {
  backgroundColor: "#79A9D1",
  color: "white",
  borderRadius: "3px",
  padding: "10px",
  maxWidth: "100%",
};

const Notifications = () => {
  const [horaInicio, setHoraInicio] = useState(null);
  const [horaFin, setHoraFin] = useState(null);
  const [norden, setNorden] = useState("");
  const [deviation, setDeviation] = useState("");
  const [observation, setObservation] = useState("");
  const [noperacion, setNoperarion] = useState("");
  const [otCode, setOtCode] = useState("");
  const [disSelect, setDisSelect] = useState(true);

  const [deviationArr, setDeviationArr] = useState([]);
  const [opNumArr, setOpNumArr] = useState([]);

  // eslint-disable-next-line
  const data = {
    deviation: deviation,
    operationNum: noperacion,
    OTCode: otCode,
    startHour: horaInicio,
    endHour: horaFin,
    isDone: norden,
    comments: observation,
  };

  useEffect(() => {
    if (norden === true) {
      setDisSelect(false);
    } else {
      setDeviation("");
      setDisSelect(true);
    }
  }, [norden]);

  useEffect(async () => {
    await axios.get("/deviations").then((response) => {
      setDeviationArr(response.data);
    });
    await axios.get("/operation-numbers").then((response) => {
      setOpNumArr(response.data);
    });
  }, []);

  return (
    <div>
      <Container className="header" style={Header}>
        <Typography align="left" variant="h6">
          Creacion de Notificaciones
        </Typography>
      </Container>
      <form style={{ marginTop: "50px" }}>
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
              <InputLabel>Numero de operacion</InputLabel>
              <Select
                variant="outlined"
                id="noperacion"
                fullWidth
                required
                value={noperacion}
                onChange={(e) => setNoperarion(e.target.value)}
              >
                {opNumArr.map((elemento) => (
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
              <InputLabel>Numero de OT</InputLabel>
              <TextField
                size="small"
                varian="outlined"
                fullWidth
                value={otCode}
                onChange={(e) => setOtCode(e.target.value)}
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
            <Grid item xs={2}>
              <InputLabel>Hora inicio de ejecucion</InputLabel>
              <TimePicker
                value={horaInicio}
                onChange={(newValue) => {
                  setHoraInicio(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={2}>
              <InputLabel>Hora fin de ejecucion</InputLabel>
              <TimePicker
                value={horaFin}
                onChange={(newValue) => {
                  setHoraFin(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
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
              <InputLabel>¿Se realizo la orden?</InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                value={norden}
                onChange={(e) => setNorden(e.target.value)}
                select
              >
                <MenuItem value={true}>Si</MenuItem>
                <MenuItem value={false}>No</MenuItem>
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
              <InputLabel>
                Motivo de la desviacion de la notificacion
              </InputLabel>
              <Select
                id="deviation"
                variant="outlined"
                fullWidth
                required
                disabled={disSelect}
                value={deviation}
                onChange={(e) => setDeviation(e.target.value)}
              >
                {deviationArr.map((elemento) => (
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
            justifyContent="center"
            spacing={2}
          >
            <Grid item xs={4}>
              <InputLabel>Observaciones</InputLabel>
              <TextField
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                size="small"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container item alignItems="center" justifyContent="center">
            <Grid>
              <Button color="primary" variant="contained">
                Enviar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Notifications;
