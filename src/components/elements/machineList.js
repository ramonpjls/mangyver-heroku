import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListSubheader,
  TextField,
  InputAdornment,
  ListItemButton,
  ListItem,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Pagination } from "../pagination/Pagination";
import { usePagination } from "../../hooks/usePagination";
import { useDispatch } from "react-redux";
import axios from "../../axiosinstance";
import { useDebounce } from "../../hooks/useDebounce";

const gnrStyle = {
  marginTop: "1rem",
  marginBottom: "2.5rem",
};

const pgnStyle = {
  display: "flex",
  justifyContent: "end",
};

const MachineList = ({ param, endpoint, tittle, isMachine, type }) => {
  const [keyword, setKeyword] = useState("");
  const [machineArr, setMachineArr] = useState([]);
  const [machineLabel, setMachineLabel] = useState(""); // eslint-disable-next-line
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();
  // eslint-disable-next-line
  const debouncedSearchTerm = useDebounce(keyword, 500);

  const handleListItemClick = (event, index) => {
    setMachineLabel(index.label);
    if (isMachine) {
      dispatch({
        type: "MACHINE",
        payload: index.id,
      });
      dispatch({
        type: "GROUPCODE",
        payload: index.groupCode,
      });
    } else {
      dispatch({
        type: `${type}`,
        payload: index.id,
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  } = usePagination(machineArr);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    axios
      .get(`/${endpoint}`, {
        params: {
          lineId: param,
          from: Number(skipBase),
          top: Number(elementsPerPage),
          name: String(debouncedSearchTerm),
        },
        headers: { auth: localStorage.getItem("token") },
      })
      .then((res) => {
        setMachineArr(res.data);
      })
      .catch((err) => {
        console.warn(err);
        window.location.reload();
      });

    // eslint-disable-next-line
  }, [elementsPerPage, skipBase, debouncedSearchTerm, param]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {tittle}:
        </Typography>
        <Typography variant="body2">{machineLabel}</Typography>
      </div>
      <div style={pgnStyle}>
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
          elements={machineArr}
          isVisible={isVisible}
        />
      </div>
      <List
        style={gnrStyle}
        sx={{
          width: "100%",
          maxWidth: 500,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          paddingTop: "0",
        }}
      >
        <ListSubheader
          style={{
            backgroundColor: "white",
          }}
        >
          <TextField
            type="text"
            size="small"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Seleccione el campo"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="large" />
                </InputAdornment>
              ),
            }}
          />
        </ListSubheader>
        {elements
          // eslint-disable-next-line array-callback-return
          .filter((item) => {
            if (keyword === "") {
              return item;
            } else if (
              item.name.toLowerCase().includes(keyword.toLowerCase())
            ) {
              return item;
            }
          })
          .map((item) => (
            <ListItemButton
              dense
              divider
              disableGutters
              style={{}}
              key={item.id}
              onClick={(event) => handleListItemClick(event, item)}
            >
              <ListItem key={item.id}>
                <ListItemText primary={item.name} />
              </ListItem>
            </ListItemButton>
          ))}
      </List>
    </div>
  );
};

export default MachineList;
