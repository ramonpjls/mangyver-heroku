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
  InputAdornment,
  Modal,
  Box,
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
  const [notifications, setNotifications] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState("");
  const [open, setOpen] = useState(false);
  const [idValue, setIdValue] = useState("");
  const [newState, setNewState] = useState([]);

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
    setLoading(true);
    axios
      .get("/notifications")
      .then((res) => {
        setNotifications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        window.location.reload();
      });
  }, []);

  useEffect(() => {
    if (idValue !== "") {
      setOpen(true);
      axios
        .get(`/notifications/${idValue}`)
        .then((res) => {
          setNewState(res.data);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }, [idValue]);

  useEffect(() => {
    if (notifications.map((row) => row.isDone) === true) {
      setIsDone("No");
    } else {
      setIsDone("Si");
    }
  }, [notifications]);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
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
              {isDone}
            </Typography>
            <Typography variant="body2">
              <Typography variant="h6">Comentario: </Typography>
              {newState.comments}
            </Typography>
          </div>
        </Box>
      </Modal>
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
                  Numero de OT
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
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications
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
                  <TableRow
                    key={row.id}
                    hover
                    onClick={() => setIdValue(row.id)}
                  >
                    <TableCell>
                      <Typography>{row.otCode}</Typography>
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
                        {isDone}
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

export default ShowNotificaciones;