import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { CSVLink } from "react-csv";
import axios from "../axiosinstace";

const Noticereport = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [info, setInfo] = useState([]);

  const Header = {
    backgroundColor: "#79A9D1",
    color: "white",
    borderRadius: "3px",
    padding: "10px",
    maxWidth: "100%",
  };

  useEffect(() => {
    axios
      .get("/notices", {
        params: {
          dateFrom: start,
          dateEnd: end,
          sapForm: true,
        },
      })
      .then((res) => {
        return setInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [start, end]);

  const headers = [
    { label: "Titulo del aviso (No mas de 30 caracteres)", key: "cardTitle" },
    { label: "Ubicacion Tecnica del equipo", key: "ubication_tecnica" },
    { label: "Codigo del equipo", key: "equipmentCode" },
    { label: "Codidificacion", key: "cardtype" },
    { label: "Descripcion del Problema", key: "cardDescription" },
    { label: "Autor del aviso", key: "" },
    { label: "Sintoma de averia", key: "component" },
    { label: "causa de averia", key: "breakdown" },
    { label: "PRIORIDAD", key: "priority" },
    { label: "hora", key: "failureTime" },
    { label: "fecha", key: "created" },
  ];
  const ReportSet = {
    filename: "reporte.csv",
    headers: headers,
    data: info,
  };

  return (
    <div>
      <Container className="header" style={Header}>
        <Typography align="left" variant="h6">
          Descarga de Avisos
        </Typography>
      </Container>
      <Container maxWidth="md">
        <form style={{ marginTop: "30px" }}>
          <Grid container spacing={3}>
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
              <CSVLink {...ReportSet}>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<CloudDownloadIcon />}
                >
                  descargar
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
