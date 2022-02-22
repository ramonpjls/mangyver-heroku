import React, { useState, useEffect } from "react";
import { MenuItem, Select, Typography, Container } from "@mui/material";
import axios from "../../axiosinstance";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { types } from "../../types/types";
import AddCommentIcon from "@mui/icons-material/AddComment";

const Home = () => {
  const notice = useSelector((state) => state.notice.notice);
  const [processValue, setProcessValue] = useState("");

  const dispatch = useDispatch();
  const configCall = {
    headers: {
      auth: localStorage.getItem("token"),
    },
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
    axios
      .get("/processes", configCall)
      .then((useRes) => {
        dispatch({
          type: types.NOTICE,
          payload: useRes.data,
        });
      })
      .catch((err) => {
        console.log(err);
      }); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch({
      type: types.NOTICETYPE,
      payload: processValue,
    }); // eslint-disable-next-line
  }, [processValue]);

  if (processValue?.id === "CD2B8484-0901-EC11-B563-2818780EF919") {
    return <Step1 />;
  } else if (processValue?.id === "CE2B8484-0901-EC11-B563-2818780EF919") {
    return <Step2 />;
  } else if (processValue?.id === "CF2B8484-0901-EC11-B563-2818780EF919") {
    return <Step3 />;
  }

  return (
    <div>
      <Container style={Header}>
        <AddCommentIcon style={{ marginRight: "10px" }} />
        <Typography align="left" variant="h6">
          Creacion de Aviso
        </Typography>
      </Container>
      <Container maxWidth="sm">
        <Container style={{ marginTop: "30px" }}>
          <Typography align="left" variant="h5">
            Elige el Proceso
          </Typography>
          <Select
            id="Linea"
            variant="outlined"
            fullWidth
            required
            size="small"
            value={processValue}
            onChange={(e) => setProcessValue(e.target.value)}
            //TODO: setear el parametro para recibir lineas por lineas
          >
            {notice.map((elemento) => (
              <MenuItem key={elemento.id} value={elemento}>
                {elemento.SAPCode} - {elemento.name}
              </MenuItem>
            ))}
          </Select>
        </Container>
      </Container>
    </div>
  );
};

export default Home;
