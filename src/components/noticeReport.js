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
import axios from "../axiosinstance";

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
      .get("/notices")
      .then((res) => {
        return setInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const headers = [
    { label: "Affect", key: "Affect" },
    { label: "Equipment", key: "Equipment" },
    { label: "Process", key: "Process" },
    { label: "affectsFile", key: "affectsFile" },
    { label: "breakdown", key: "breakdown" },
    { label: "cardDescription", key: "cardDescription" },
    { label: "cardTitle", key: "cardTitle" },
    { label: "cardtype", key: "cardtype" },
    { label: "component", key: "component" },
    { label: "consecutive", key: "consecutive" },
    { label: "created", key: "created" },
    { label: "department", key: "department" },
    { label: "didCard", key: "didCard" },
    { label: "equipmentCode", key: "equipmentCode" },
    { label: "failureTime", key: "failureTime" },
    { label: "failuretype", key: "failuretype" },
    { label: "id", key: "id" },
    { label: "line", key: "line" },
    { label: "otcode", key: "otcode" },
    { label: "priority", key: "priority" },
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
