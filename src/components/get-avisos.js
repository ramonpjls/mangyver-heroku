import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { CSVLink } from "react-csv";
import axios from "axios";

const Getavisos = () => {
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

  const auth = localStorage.token;

  const HandleSubmit = (e) => {
    e.preventDefault();

    axios
      .get("https://mangyver.herokuapp.com/api/v1/notices", {
        headers: { auth },
      })
      .then((res) => {
        console.log(res);
        setInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(info);

  const headers = [
    { label: "Affect", key: "Affect" },
    { label: "Equipment", key: "Equipment" },
    { label: "Process", key: "Process" },
    { label: "affectsFile", key: "affectsFile" },
    { label: "breakdown", key: "breakdown" },
    { label: "cardDescription", key: "cardDescription" },
    { label: "cardTitle", key: "" },
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
        <form style={{ marginTop: "30px" }} onSubmit={HandleSubmit}>
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
              <Button
                color="primary"
                variant="contained"
                type="submit"
                startIcon={<CloudDownloadIcon />}
              >
                <CSVLink {...ReportSet}>Descargar</CSVLink>
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Getavisos;
