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
    if (notifications.map((row) => row.isDone) === true) {
      setIsDone("No");
    } else {
      setIsDone("Si");
    }
  }, [notifications]);

  return (
    <div>
      <Container className="header" style={Header}>
        <NotificationsIcon style={{ marginRight: "10px" }} />
        <Typography align="left" variant="h6">
          Notificaciones
        </Typography>
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
                    row.OTCode.toLowerCase().includes(keyword.toLowerCase())
                  ) {
                    return row;
                  }
                })
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Typography>{row.OTCode}</Typography>
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
