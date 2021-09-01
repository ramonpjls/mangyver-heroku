import axios from "../axiosinstance";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  Backdrop,
  CircularProgress,
  Container,
  TextField,
  InputAdornment,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 400,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 10px",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: "#79A9D1",
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
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
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function ShowAvisos() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [notice, setNotice] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const Header = {
    color: "white",
    borderRadius: "3px",
    padding: "30px",
    maxWidth: "100%",
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("/notices")
      .then((res) => {
        setNotice(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        console.log("error from GET", err.status);
        setLoading(false);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Container className="header" style={Header}>
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
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  Titulo de Aviso
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Titulo de Tarjeta
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
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                // eslint-disable-next-line array-callback-return
                .filter((row) => {
                  if (keyword === "") {
                    return row;
                  } else if (
                    row.cardDescription
                      .toLowerCase()
                      .includes(keyword.toLocaleLowerCase())
                  ) {
                    return row;
                  }
                })
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Typography>{row.cardTitle}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.ubication_tecnica}</Typography>
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
                          backgroundColor:
                            (row.priority === "Muy elevado" && "#B855E5") ||
                            (row.priority === "Alto" && "#E05E54") ||
                            (row.priority === "Medio" && "#E8AB51") ||
                            (row.priority === "Bajo" && "#86A9E1"),
                        }}
                      >
                        {row.priority}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              count={notice.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default ShowAvisos;
