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
  Button,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { Pagination } from "./pagination/Pagination";
import { usePagination } from "../hooks/usePagination";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 400,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 0",
    maxHeight: 740,
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
  const notice = useSelector((state) => state.notice.notice);

  const classes = useStyles();
  const [totalInDB, setTotalInDB] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [rowDetails, setRowDetails] = useState({});

  const handleClose = () => setOpen(false);

  const openModal = (row) => {
    setRowDetails(row);
    setOpen(true);
  };

  const dispatch = useDispatch();

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
    width: 700,
    maxHeight: 620,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    height: "100%",
    overflowY: "scroll",
    scroll: true,
  };

  let {
    firstPage,
    previousPage,
    nextPage,
    lastPage,
    skipBase,
    totalElementsInDB,
    setElementsPerPage,
    elementsPerPage,
    elements,
    totalPages,
    currentPage,
    // eslint-disable-next-line
  } = usePagination(notice, totalInDB);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/notices`, {
        params: {
          isWeb: true,
          totalRows: 1,
        },
      })
      .then((res) => {
        setTotalInDB(res.data[0]?.totalRows);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        window.location.reload();
      });

    axios
      .get(`/notices`, {
        params: {
          isWeb: true,
          from: Number(skipBase),
          top: Number(elementsPerPage),
        },
      })
      .then((res) => {
        dispatch({
          type: "NOTICE",
          payload: res.data,
        });
        // setNotice(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        window.location.reload();
      });

    return () => {
      dispatch({
        type: "NOTICE",
        payload: [],
      });
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/notices`, {
        params: {
          isWeb: true,
          from: Number(skipBase),
          top: Number(elementsPerPage),
        },
      })
      .then((res) => {
        dispatch({
          type: "NOTICE",
          payload: res.data,
        });
        // setNotice(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        window.location.reload();
      });
    // eslint-disable-next-line
  }, [elementsPerPage, skipBase]);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={boxStyle}>
          <div>
            <Typography variant="body2">
              <Typography variant="h6">Creado por:</Typography>
              {rowDetails.userName}
            </Typography>
            <Typography variant="body2">
              <Typography variant="h6">Departamento:</Typography>
              {rowDetails.department}
            </Typography>
            <Typography variant="body2">
              <Typography variant="h6">Tipo de equipo:</Typography>
              {rowDetails.equipment}
            </Typography>
            <Typography variant="body2">
              <Typography variant="h6">Numero de OT:</Typography>
              {rowDetails.otCode}
            </Typography>
            <Typography variant="body2">
              <Typography variant="h6">Linea:</Typography>
              {rowDetails.lineId}
            </Typography>
            <Typography variant="body2">
              <Typography variant="h6">Prioridad:</Typography>
              {rowDetails.priority}
            </Typography>
            <Typography variant="body2">
              <Typography variant="h6">Titulo de la tarjeta:</Typography>
              {rowDetails.cardTitle}
            </Typography>
            <Typography variant="body2">
              <Typography variant="h6">Tipo de tarjeta:</Typography>
              {rowDetails.cardtype}
            </Typography>
            <Typography variant="body2">
              <Typography variant="h6">Descripción de la tarjeta:</Typography>
              {rowDetails.cardDescription}
            </Typography>
            <Typography variant="body2">
              <Typography variant="h6">Componente dañado:</Typography>
              {rowDetails.components}
            </Typography>
            <Typography variant="body2">
              <Typography variant="h6">Afecta a:</Typography>
              {rowDetails.affects}
            </Typography>
            <Typography variant="body2">
              <Typography variant="h6">Foto:</Typography>
              {rowDetails?.photo?.url}
            </Typography>
          </div>
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
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              firstPage={firstPage}
              lastPage={lastPage}
              setElementsPerPage={setElementsPerPage}
              totalElementsInDB={totalElementsInDB}
              nextPage={nextPage}
              skipBase={skipBase}
              previousPage={previousPage}
              elementsPerPage={elementsPerPage}
              elements={notice}
            />
          </Box>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table stickyHeader className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeaderCell}>
                    Numero de aviso MG
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Tipo de Aviso
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Titulo de Aviso
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Ubicación Técnica
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Tipo de Tarjeta
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Descripción
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Prioridad
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {elements
                  // eslint-disable-next-line array-callback-return
                  .filter((row) => {
                    if (keyword === "") {
                      return row;
                    } else if (
                      row.extendedRow
                        .toLowerCase()
                        .includes(keyword.toLowerCase())
                    ) {
                      return row;
                    }
                  })
                  .map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>
                        <Typography>{row.numNotice}</Typography>
                      </TableCell>
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
                        <Typography style={{ maxWidth: "470px" }}>
                          {row.cardDescription}
                        </Typography>
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
                      <TableCell>
                        <Button
                          onClick={() => openModal(row)}
                          size="small"
                          sx={{ fontSize: 12 }}
                          variant="contained"
                        >
                          Ver detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </div>
  );
}

export default ShowAvisos;
