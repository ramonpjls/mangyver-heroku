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
  Select,
  Grid,
  Switch,
  MenuItem,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

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

function UserManagement() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(true);
  const [authValue, setAuthValue] = useState("");
  const [idValue, setIdValue] = useState("");
  // const [reload, setReload] = useState(false);

  const pageHeader = {
    backgroundColor: "#79A9D1",
    color: "white",
    borderRadius: "3px",
    padding: "10px",
    maxWidth: "100%",
  };

  const Header = {
    borderRadius: "3px",
    padding: "30px",
    maxWidth: "100%",
  };

  useEffect(() => {
    axios
      .put(`/users/${idValue}`, { auth: authValue })
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        //window.location.reload();
      });
  }, [authValue, idValue]);

  // const OnUpdate = (id, auth) => {
  //   console.log(id);
  //   console.log(auth);

  // if (auth === "pending") {
  //   setAuthValue("active");
  // } else {
  //   setAuthValue("pending");
  // }

  // console.log(authValue);
  // };

  useEffect(() => {
    setLoading(true);
    axios
      .get("/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        window.location.reload();
      });
  }, [idValue]);

  return (
    <div>
      <Container className="header" style={pageHeader}>
        <Typography align="left" variant="h6">
          Control de Usuarios
        </Typography>
      </Container>
      <Container className="header" style={Header}>
        <Grid container spacing={2} direction="row">
          <Grid item xs={6} md={10}>
            <TextField
              name="keyword"
              id="keyword"
              type="text"
              value={keyword}
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Ingrese el nombre del usuario"
              onChange={(e) => setKeyword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="large" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <Switch
              color="default"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <Typography variant="overline">Cambiar estatus</Typography>
          </Grid>
        </Grid>
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
                  Nombre
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>Email</TableCell>
                <TableCell size="small" className={classes.tableHeaderCell}>
                  Codigo SAP
                </TableCell>
                <TableCell size="small" className={classes.tableHeaderCell}>
                  Usuario SAP
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>Area</TableCell>
                <TableCell className={classes.tableHeaderCell}>Linea</TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Estatus
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                // eslint-disable-next-line array-callback-return
                .filter((row) => {
                  if (keyword === "") {
                    return row;
                  } else if (
                    row.email.toLowerCase().includes(keyword.toLowerCase()) ||
                    row.name.toLowerCase().includes(keyword.toLowerCase())
                  ) {
                    return row;
                  }
                })
                .map((row) => (
                  <TableRow key={row.id} onClick={() => setIdValue(row.id)}>
                    <TableCell>
                      <Typography>{row.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.SAPCode}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.SAPUser}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.area}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.line}</Typography>
                    </TableCell>
                    <TableCell>
                      <Select
                        variant="outlined"
                        required
                        id="authValue"
                        value={row.auth}
                        onChange={(e) => setAuthValue(e.target.value)}
                        fullWidth
                        disabled={checked}
                        // className={classes.status}
                        size="small"
                        // style={{
                        //   backgroundColor:
                        //     (row.auth === "pending" && "#fc0303") ||
                        //     (row.auth === "active" && "#026300"),
                        // }}
                      >
                        <MenuItem value={"pending"}>Pendiente</MenuItem>
                        <MenuItem value={"active"}>activo</MenuItem>
                      </Select>
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

export default UserManagement;
