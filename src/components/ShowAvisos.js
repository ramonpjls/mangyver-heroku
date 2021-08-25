import axios from "../axiosinstace";
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
  TableFooter,
} from "@material-ui/core";

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
}));

function ShowAvisos() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [notice, setNotice] = useState([]);

  useEffect(() => {
    axios
      .get("/notices")
      .then((res) => {
        return setNotice(res.data);
      })
      .catch((err) => {
        console.log(err);
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
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>
              Tipo de Aviso
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
            <TableCell className={classes.tableHeaderCell}>Prioridad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notice
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Typography>{row.Process}</Typography>
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
        <TableFooter>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={notice.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default ShowAvisos;
