import axios from "../axiosinstance";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";

import { Pagination } from "./pagination/Pagination";
import { usePagination } from "../hooks/usePagination";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Backdrop,
  CircularProgress,
  Container,
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

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

function ShowNotificaciones() {
  const classes = useStyles();
  const [notifications, setNotifications] = useState([]); // eslint-disable-next-line
  const [totalInDB, setTotalInDB] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [open, setOpen] = useState(false);
  // const [idValue, setIdValue] = useState("");
  // const [newState, setNewState] = useState([]);

  // const handleClose = () => setOpen(false);

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

  // const boxStyle = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: 600,
  //   bgcolor: "background.paper",
  //   boxShadow: 24,
  //   p: 4,
  // };

  let {
    previousPage,
    nextPage,
    skipBase,
    totalElementsInDB,
    setElementsPerPage,
    elementsPerPage,
    elements,
  } = usePagination(notifications, totalInDB);

  const configCall = {
    headers: {
      auth: localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/notifications?from=${skipBase}&top=${elementsPerPage}`, configCall)
      .then((res) => {
        setNotifications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        window.location.reload();
      }); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/notifications?from=${skipBase}&top=${elementsPerPage}`, configCall)
      .then((res) => {
        setNotifications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        window.location.reload();
      }); // eslint-disable-next-line
  }, [elementsPerPage, skipBase]);

  // useEffect(() => {
  //   if (idValue !== "") {
  //     setOpen(true);
  //     axios
  //       .get(`/notifications/${idValue}`)
  //       .then((res) => {
  //         setNewState(res.data);
  //       })
  //       .catch((err) => {
  //         console.warn(err);
  //       });
  //   }
  // }, [idValue]);

  return (
    <div>
      {/* <Modal onClose={handleClose}>
        <Box sx={boxStyle}>
          <div key={newState.id}>
            <Typography variant="body2">
              <Typography variant="h6">Numero de OT: </Typography>
              {newState.otCode}
            </Typography>
            <Typography variant="body2">
              <Typography variant="h6">Hora de inicio: </Typography>
              {newState.startHour}
            </Typography>
            <Typography variant="body2">
              <Typography variant="h6">Hora de fin: </Typography>
              {newState.endHour}
            </Typography>
            <Typography variant="body2">
              <Typography variant="h6">¿Se realizo la orden?: </Typography>
              {newState.isDone}
            </Typography>
            <Typography variant="body2">
              <Typography variant="h6">Comentario: </Typography>
              {newState.comments}
            </Typography>
          </div>
        </Box>
      </Modal> */}
      <Container className="header" style={Header}>
        <NotificationsIcon style={{ marginRight: "10px" }} />
        <Typography align="left">Notificaciones</Typography>
      </Container>
      <Container className="headerSearch" style={HeaderSearch}>
        <TextField
          name="keyword"
          id="keyword"
          type="text"
          value={keyword}
          fullWidth
          size="small"
          variant="outlined"
          placeholder="¿Cual Notificación desea buscar?"
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
              setElementsPerPage={setElementsPerPage}
              totalElementsInDB={totalElementsInDB}
              nextPage={nextPage}
              skipBase={skipBase}
              previousPage={previousPage}
              elementsPerPage={elementsPerPage}
              elements={notifications}
            />
          </Box>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table stickyHeader className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeaderCell}>
                    Numero de OT
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Fecha
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Hora de Inicio
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Hora de finalizacion
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Comentario
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    ¿Se realizo la orden?
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Autor
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
                      row.otCode.toLowerCase().includes(keyword.toLowerCase())
                    ) {
                      return row;
                    }
                  })
                  .map((row) => (
                    <TableRow key={row.id} hover3>
                      <TableCell>
                        <Typography>{row.otCode}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.date}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.startHour}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.endHour}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.comments}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          className={classes.status}
                          style={{
                            backgroundColor:
                              (row.isDone === true && "#3364ff") ||
                              (row.isDone === false && "#ff3333"),
                          }}
                        >
                          {row.isDone ? "Si" : "No"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.author}</Typography>
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

export default ShowNotificaciones;
