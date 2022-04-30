import React from "react";
import IconButton from "@mui/material/IconButton";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material/";

import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import Box from "@mui/material/Box";

export const Pagination = ({
  loading,
  skipBase,
  firstPage,
  previousPage,
  nextPage,
  lastPage,
  elementsPerPage,
  setElementsPerPage,
  setSkipBase,
  currentPage,
  totalPages,
  totalElementsInDB,
  isVisible = true,
}) => {
  const setElements = (e) => {
    let elements = Number(e.target.value);
    if (elements >= totalElementsInDB) {
      elements = totalElementsInDB;
    }
    setElementsPerPage(elements);
  };

  return (
    <Box sx={{ my: 1, mx: 3, display: "flex" }}>
      {isVisible ? <span style={{ marginTop: 3 }}>Elementos</span> : <></>}
      <FormControl sx={{ mx: 1 }}>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          style={{ height: 32 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={elementsPerPage}
          onChange={setElements}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <hr className="m-0" />
          <MenuItem value={elementsPerPage}>{elementsPerPage}</MenuItem>
        </Select>
      </FormControl>

      {isVisible ? (
        <Box sx={{ mx: 1 }}>
          <IconButton
            sx={{ mt: 0 }}
            disabled={loading || skipBase <= 0}
            onClick={firstPage}
            aria-label="Anterior"
            size="small"
          >
            <FirstPageRoundedIcon fontSize="small" />
          </IconButton>

          <IconButton
            sx={{ mr: 1, mt: 0 }}
            disabled={loading || skipBase <= 0}
            onClick={previousPage}
            aria-label="Anterior"
            size="small"
          >
            <ChevronLeftRoundedIcon fontSize="small" />
          </IconButton>

          {elementsPerPage === 1 ? (
            <span
              className="m-0 mt-4 text small"
              style={{ width: "25%", color: "var(--orange-abi)" }}
            >
              {skipBase + 1} de {totalElementsInDB}
            </span>
          ) : (
            <span
              className="m-0 mt-4 text small"
              style={{ width: "25%", color: "var(--orange-abi)" }}
            >
              {skipBase + 1}{" "}
              {skipBase + 1 !== totalElementsInDB
                ? ` - ${
                    elementsPerPage + skipBase <= totalElementsInDB
                      ? elementsPerPage + skipBase
                      : totalElementsInDB
                  }`
                : ""}{" "}
              de {totalElementsInDB}
            </span>
          )}
          <IconButton
            sx={{ ml: 1, mt: 0 }}
            disabled={
              loading || skipBase + elementsPerPage >= totalElementsInDB
            }
            onClick={nextPage}
            aria-label="Anterior"
            size="small"
          >
            <ChevronRightRoundedIcon fontSize="small" />
          </IconButton>

          <IconButton
            sx={{ mr: 1, mt: 0 }}
            disabled={
              loading || skipBase + elementsPerPage >= totalElementsInDB
            }
            onClick={lastPage}
            aria-label="Anterior"
            size="small"
          >
            <LastPageRoundedIcon fontSize="small" />
          </IconButton>
          <span style={{ width: "25%", fontWeight: "bold" }}>
            Pagina {currentPage} de {totalPages}
          </span>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};
