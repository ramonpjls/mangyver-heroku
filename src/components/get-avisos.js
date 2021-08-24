import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

const Getavisos = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  console.log(start, end);

  const Header = {
    backgroundColor: "#79A9D1",
    color: "white",
    borderRadius: "3px",
    padding: "10px",
    maxWidth: "100%",
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
              <Button
                color="primary"
                variant="contained"
                type="submit"
                startIcon={<CloudDownloadIcon />}
              >
                descargar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Getavisos;
