import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  TableHead,
} from "@material-ui/core";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(aviso, ubicacionTecnica, descripcion) {
  return { aviso, ubicacionTecnica, descripcion };
}

const rows = [
  createData(74231843, "CD-01010-FILT AREIA 02", "Lorem ipsum dolor sit amet"),
  createData(
    85497543,
    "CD-01010-FILT AREIA 03     -F101008",
    "Lorem ipsum dolor sit amet"
  ),
  createData(
    17394532,
    "CD-01010-FILT AREIA 04     -PI101021",
    "Lorem ipsum dolor sit amet"
  ),
  createData(42487218, "CD-01010-FILT AREIA 08", "Lorem ipsum dolor sit amet"),
  createData(
    56981782,
    "CD-01010-FILT CARVAO 03    -VM101463",
    "Lorem ipsum dolor sit amet"
  ),
  createData(
    83762868,
    "CD-01010-POCO TUBULAR 01",
    "Lorem ipsum dolor sit amet"
  ),
  createData(
    91222728,
    "CD-01010-POCO TUBULAR 04",
    "Lorem ipsum dolor sit amet"
  ),
  createData(
    4875861,
    "CD-01010-POCO TUBULAR 04   -VM101035",
    "Lorem ipsum dolor sit amet"
  ),
  createData(62667683, "RDSD-512", "Lorem ipsum dolor sit amet"),
  createData(
    22764274,
    "CD-02120-MOINHO 02         -SVM212004",
    "Lorem ipsum dolor sit amet"
  ),
  createData(
    96696257,
    "CD-02120-MOINHO 02         -SVM212006",
    "Lorem ipsum dolor sit amet"
  ),
  createData(
    58811557,
    "CD-06510-GERADOR 06        -RV651014",
    "Lorem ipsum dolor sit amet"
  ),
  createData(
    74232837,
    "CD-01420-RESFRI PROPIL 01",
    "Lorem ipsum dolor sit amet"
  ),
  createData(
    32052451,
    "CD-01310-CALDEIRA 01       -RV131090",
    "Lorem ipsum dolor sit amet"
  ),
  createData(
    25199819,
    "CD-06510-GERADOR 07        -RV651019",
    "Lorem ipsum dolor sit amet"
  ),
  createData(4784679, "RDSD-512", "Lorem ipsum dolor sit amet"),
  createData(
    10194248,
    "CD-01410-COMPRESSOR FRIO 13-RFR141013",
    "Lorem ipsum dolor sit amet"
  ),
  createData(12391486, "CD-01110", "Lorem ipsum dolor sit amet"),
  createData(52616036, "CD-01010", "Lorem ipsum dolor sit amet"),
  createData(20215182, "RDSD-503", "Lorem ipsum dolor sit amet"),
  createData(24331885, "RDSD-623", "Lorem ipsum dolor sit amet"),
  createData(30245118, "RDSD-654", "Lorem ipsum dolor sit amet"),
  createData(55038376, "RDSD-664", "Lorem ipsum dolor sit amet"),
  createData(53768612, "RDSD-604", "Lorem ipsum dolor sit amet"),
  createData(84561748, "RDSD-121", "Lorem ipsum dolor sit amet"),
].sort((a, b) => (a.ubicacionTecnica < b.ubicacionTecnica ? -1 : 1));

const useStyles2 = makeStyles({
  table: {
    minWidth: 400,
  },
});

export default function CustomPaginationActionsTable() {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead style={{ background: "#3f51b5" }}>
            <TableRow>
              <TableCell style={{ fontSize: 18, color: "white" }} align="left">
                Aviso
              </TableCell>
              <TableCell style={{ fontSize: 18, color: "white" }} align="left">
                Ubicacion Tecnica
              </TableCell>
              <TableCell style={{ fontSize: 18, color: "white" }} align="left">
                Descripcion
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.aviso}>
                <TableCell align="left">{row.aviso}</TableCell>
                <TableCell align="left">{row.ubicacionTecnica}</TableCell>
                <TableCell align="left">{row.descripcion}</TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
