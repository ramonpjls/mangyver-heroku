import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ArchiveIcon from "@mui/icons-material/Archive";
import { CSVLink } from "react-csv";
import axios from "../axiosinstance";

const Notificationsreport = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [info, setInfo] = useState([]);

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
    axios
      .get("/notifications", {
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
    { label: "Numero de OT", key: "OTCode" },
    { label: "Fecha de inicio de la tarea", key: "startHour" },
    { label: "Fecha de finalizacion de la tarea", key: "endHour" },
    { label: "Codigo del equipo", key: "equipmentCode" },
    { label: "¿Se realizo la orden?", key: "isDone" },
    { label: "Comentarios", key: "comments" },
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
          Reporte de notificaciones
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
              <CSVLink
                style={{ textDecoration: "none" }}
                {...ReportSet}
                separator={","}
              >
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<CloudDownloadIcon />}
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

export default Notificationsreport;
