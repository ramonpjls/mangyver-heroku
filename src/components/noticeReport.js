import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ArchiveIcon from "@mui/icons-material/Archive";
import { CSVLink } from "react-csv";
import axios from "../axiosinstance";

const Noticereport = () => {
  const [start, setStart] = useState("");
  const [operation, setOperation] = useState([]);
  const [operationValue, setOperationValue] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [end, setEnd] = useState("");
  const [info, setInfo] = useState([]);

  const data = [start, end, operationValue, timeEnd, timeFrom];

  const Header = {
    backgroundColor: "#79A9D1",
    color: "white",
    borderRadius: "3px",
    padding: "10px",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  useEffect(() => {
    axios.get("/operations").then((response) => {
      setOperation(response.data);
    });
    axios
      .get("/notices", {
        params: {
          sapForm: true,
          dateFrom: start,
          dateEnd: end,
          operationId: operationValue,
          timeEnd: timeEnd,
          timeFrom: timeFrom,
        },
      })
      .then((res) => {
        return setInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [end, operationValue, start, timeEnd, timeFrom]);

  const backBtn = () => {
    console.log(data);
  };

  const headers = [
    { label: "ID del Aviso", key: "IDAviso" },
    { label: "Titulo del aviso (No mas de 30 caracteres)", key: "cardTitle" },
    { label: "Ubicacion Tecnica del equipo", key: "ubication_tecnica" },
    { label: "Codigo del equipo", key: "equipmentCode" },
    { label: "Codidificacion", key: "cardtype" },
    { label: "Descripcion del Problema", key: "cardDescription" },
    { label: "Autor del aviso", key: "autor" },
    { label: "Sintoma de averia", key: "component" },
    { label: "causa de averia", key: "breakdown" },
    { label: "PRIORIDAD", key: "priority" },
    { label: "hora", key: "failureTime" },
    { label: "fecha", key: "created" },
    { label: "Tipo de Aviso", key: "TipoAviso" },
    { label: "Numero de OT", key: "OT" },
    { label: "Si/No", key: "SiNo" },
    { label: "Puesto de trabajo", key: "PuestoTrabajo" },
    { label: "Grupo planificador", key: "GrupoPlanificador" },
    { label: "Centro", key: "Centro" },
  ];

  const ReportSet = {
    filename: "reporte.xls",
    headers: headers,
    data: info,
  };

  return (
    <div>
      <Container className="header" style={Header}>
        <ArchiveIcon style={{ marginRight: "10px" }} />
        <Typography align="left" variant="h6">
          Descarga de Avisos
        </Typography>
      </Container>
      <Container maxWidth="md">
        <form style={{ marginTop: "30px" }}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <InputLabel> Operacion </InputLabel>
              <Select
                id="departamento"
                variant="outlined"
                fullWidth
                required
                value={operationValue}
                onChange={(e) => setOperationValue(e.target.value)}
                size="small"
              >
                <MenuItem value="">
                  <em>-</em>
                </MenuItem>
                {operation.map((elemento) => (
                  <MenuItem key={elemento.id} value={elemento.id}>
                    {elemento.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="timeEnd"
                value={timeFrom}
                onChange={(e) => setTimeFrom(e.target.value)}
                label="Hora de Inicio"
                type="time"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="timeEnd"
                value={timeEnd}
                onChange={(e) => setTimeEnd(e.target.value)}
                label="Hora de Finalizacion"
                type="time"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="start"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                label="Fecha Inicio"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="end"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                label="Fecha Fin"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid container item justifyContent="flex-end">
              <CSVLink
                style={{ textDecoration: "none" }}
                {...ReportSet}
                separator={","}
              >
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<CloudDownloadIcon />}
                  onClick={backBtn}
                >
                  Descargar
                </Button>
              </CSVLink>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Noticereport;
