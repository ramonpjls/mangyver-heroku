import axios from "../axiosinstance";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Backdrop,
  CircularProgress,
  Container,
  TextField,
  Modal,
  Box,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ModeCommentIcon from "@mui/icons-material/ModeComment";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 400,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 0",
    maxHeight: 540,
    maxWidth: 1050,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: "#79A9D1",
    color: "#fff",
  },
  name: {
    fontWeight: "bold",
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
  backdrop: {
    color: "#fff",
  },
}));

function ShowAvisos() {
  const classes = useStyles();
  const [notice, setNotice] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [newState, setNewState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [idValue, setIdValue] = useState("");

  const handleClose = () => setOpen(false);

  const HeaderSearch = {
    color: "white",
    borderRadius: "3px",
    padding: "30px",
    maxWidth: "100%",
  };
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

  const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    if (setNotice !== []) {
      setLoading(true);
      axios
        .get("/notices")
        .then((res) => {
          setNotice(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.warn(err);
          window.location.reload();
        });
    }
  }, []);

  useEffect(() => {
    if (idValue !== "") {
      setOpen(true);
      axios
        .get(`/notices/${idValue}`)
        .then((res) => {
          setNewState(res.data);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }, [idValue]);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={boxStyle}>
          {newState.map((newRow) => (
            <div key={newRow.id}>
              <Typography variant="body2">
                <Typography variant="h6">Creado por:</Typography>
                {newRow.autor}
              </Typography>
              <Typography variant="body2">
                <Typography variant="h6">Departamento:</Typography>
                {newRow.department}
              </Typography>
              <Typography variant="body2">
                <Typography variant="h6">Tipo de equipo:</Typography>
                {newRow.equipment}
              </Typography>
              <Typography variant="body2">
                <Typography variant="h6">Numero de OT:</Typography>
                {newRow.otCode}
              </Typography>
              <Typography variant="body2">
                <Typography variant="h6">Linea:</Typography>
                {newRow.lineId}
              </Typography>
              <Typography variant="body2">
                <Typography variant="h6">Prioridad:</Typography>
                {newRow.priority}
              </Typography>
              <Typography variant="body2">
                <Typography variant="h6">Titulo de la tarjeta:</Typography>
                {newRow.cardTitle}
              </Typography>
              <Typography variant="body2">
                <Typography variant="h6">Tipo de tarjeta:</Typography>
                {newRow.cardtype}
              </Typography>
              <Typography variant="body2">
                <Typography variant="h6">Descripcion de la tarjeta:</Typography>
                {newRow.cardDescription}
              </Typography>
              <Typography variant="body2">
                <Typography variant="h6">Componente dañado:</Typography>
                {newRow.component}
              </Typography>
              <Typography variant="body2">
                <Typography variant="h6">Tipo de falla:</Typography>
                {newRow.GrupoPlanificador}
              </Typography>
              <Typography variant="body2">
                <Typography variant="h6">Afecta a:</Typography>
                {newRow.affectsId}
              </Typography>
            </div>
          ))}
        </Box>
      </Modal>
      <Container className="header" style={Header}>
        <ModeCommentIcon style={{ marginRight: "10px" }} />
        <Typography align="left" variant="h6">
          Avisos
        </Typography>
      </Container>
      <Container className="header" style={HeaderSearch}>
        <TextField
          name="keyword"
          id="keyword"
          type="text"
          value={keyword}
          fullWidth
          size="small"
          variant="outlined"
          placeholder="¿Cual aviso desea buscar?"
          onChange={(e) => setKeyword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="large" />
              </InputAdornment>
            ),
          }}
        />
      </Container>
      {loading ? (
        <Backdrop className={classes.backdrop} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table stickyHeader className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  Tipo de Aviso
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Titulo de Aviso
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Ubicacion Tecnica
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Tipo de Tarjeta
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Descripcion
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Causa de la averia
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Prioridad
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notice
                // eslint-disable-next-line array-callback-return
                .filter((row) => {
                  if (keyword === "") {
                    return row;
                  } else if (
                    row.cardDescription
                      .toLowerCase()
                      .includes(keyword.toLowerCase()) ||
                    row.priority
                      .toLowerCase()
                      .includes(keyword.toLowerCase()) ||
                    row.breakdown.toLowerCase().includes(keyword.toLowerCase())
                  ) {
                    return row;
                  }
                })
                .map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    onClick={() => setIdValue(row.id)}
                  >
                    <TableCell>
                      <Typography>{row.process}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.cardTitle}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.technicalLocation}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.cardtype}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.cardDescription}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.breakdown}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        className={classes.status}
                        style={{
                          backgroundColor: `#${row.priorityColor}`,
                        }}
                      >
                        {row.priority}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default ShowAvisos;
