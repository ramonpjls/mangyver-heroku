import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Select,
  Button,
  MenuItem,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../axiosinstance";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";

const Step3 = () => {
  const noticeType = useSelector((state) => state.notice.noticeType);
  const [formStep, setFormStep] = useState(0);
  const [nOt, setNOt] = useState("");
  const [tarjetaTipoValue, setTarjetaTipoValue] = useState("");
  const [tarjetaTitulo, setTarjetaTitulo] = useState("");
  const [prioridadValue, setPrioridadValue] = useState("");
  const [componenteValue, setComponenteValue] = useState("");
  const [causaAveriaValue, setCausaAveriaValue] = useState("");
  const [tipoFallaValue, setTipoFallaValue] = useState("");
  const [descripcionTarjeta, setDescripcionTarjeta] = useState("");
  const [afectaValue, setAfectaValue] = useState("");
  const [causaAveria, setCausaAveria] = useState([]);
  const [tarjetaTipo, setTarjetaTipo] = useState([]);
  const [componente, setComponente] = useState([]);
  const [prioridad, setPrioridad] = useState([]);
  const [tipoFalla, setTipoFalla] = useState([]);
  const [afecta, setAfecta] = useState([]);

  const [disButton, setDisButton] = useState(true);

  const history = useHistory();

  const data = {
    processId: noticeType.processId,
    otCode: nOt,
    cardTypeId: tarjetaTipoValue,
    cardTitle: tarjetaTitulo,
    priorityId: prioridadValue,
    componentsId: componenteValue,
    breakdownId: causaAveriaValue,
    failureTypeId: tipoFallaValue,
    cardDescription: descripcionTarjeta,
    affectsId: afectaValue,
  };

  const completeFormStep = () => {
    setFormStep((cur) => cur + 1);
  };

  const submitForm = () => {
    axios
      .post("/notices", data)
      .then((res) => {
        Swal.fire({
          text: "Aviso creado exitosamente",
          icon: "success",
          showConfirmButton: false,
        });
        history.push("/ShowAvisos");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          text: "Hubo un error en el proceso",
          icon: "error",
          showConfirmButton: false,
        });
      });
  };

  const backBtn = () => {
    setFormStep((cur) => cur - 1);
  };

  const btnBckStyle = {
    textTransform: "none",
    marginTop: "1rem",
    marginBottom: "1rem",
    fontSize: 16,
    lineHeight: 1.5,
    backgroundColor: "#d06345",
    color: "#fff",
  };

  const btnNxtStyle = {
    textTransform: "none",
    marginTop: "1rem",
    marginBottom: "1rem",
    fontSize: 16,
    lineHeight: 1.5,
    color: "#fff",
  };

  const gnrStyle = {
    marginTop: "1rem",
    marginBottom: "1rem",
  };

  const btnContStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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

  const renderBckBtn = () => {
    if (formStep === 0) {
      return (
        <Button style={gnrStyle} variant="outlined" disabled>
          Atras
        </Button>
      );
    } else if (formStep > 1) {
      return undefined;
    } else {
      return (
        <Button style={btnBckStyle} variant="outlined" onClick={backBtn}>
          Atras
        </Button>
      );
    }
  };

  const renderBtn = () => {
    if (formStep > 1) {
      return undefined;
    } else if (formStep === 1) {
      return (
        <Button
          type="submit"
          style={btnNxtStyle}
          variant="contained"
          color="primary"
          onClick={submitForm}
        >
          Enviar Aviso
        </Button>
      );
    } else {
      return (
        <Button
          style={btnNxtStyle}
          variant="contained"
          onClick={completeFormStep}
          disabled={disButton}
        >
          Siguiente
        </Button>
      );
    }
  };

  //TODO: setear el parametro para recibir lineas por machines

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await axios.get("/breakdowns").then((response) => {
      setCausaAveria(response.data);
    });
    await axios.get("/components").then((response) => {
      setComponente(response.data);
    });
    await axios.get("/priorities").then((response) => {
      setPrioridad(response.data);
    });
    await axios.get("/type-fails").then((response) => {
      setTipoFalla(response.data);
    });
    await axios.get("/affects").then((response) => {
      setAfecta(response.data);
    });
  }, []);

  useEffect(() => {
    console.log(noticeType.processId);
    axios
      .get("/cards", {
        params: {
          process: noticeType.processId,
        },
      })
      .then((response) => {
        setTarjetaTipo(response.data);
      }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nOt]);

  useEffect(() => {
    if (nOt !== "") {
      setDisButton(false);
    } else {
      setDisButton(true);
    }
  }, [nOt]);

  const backHome = () => {
    window.location.reload();
  };

  return (
    <div>
      <Container style={Header}>
        <ArrowBackIcon
          style={{ marginRight: "15px", fontWeight: "50px" }}
          onClick={backHome}
        />
        <Typography variant="h5">{noticeType.name}</Typography>
      </Container>
      <Container className="formContainer" maxWidth="sm">
        {formStep >= 0 && (
          <section style={formStep === 0 ? {} : { display: "none" }} id="4">
            <Typography align="left" variant="h5">
              Numero de OT
            </Typography>
            <TextField
              variant="outlined"
              onChange={(e) => setNOt(e.target.value)}
              value={nOt}
              type="number"
              required
              fullWidth
              style={gnrStyle}
              size="small"
              label="Numero de OT"
            ></TextField>
          </section>
        )}
        {formStep >= 1 && (
          <section style={formStep === 1 ? {} : { display: "none" }} id="6">
            <Typography style={gnrStyle}>
              Codificacion / Tipo de tarjeta{" "}
            </Typography>
            <Select
              id="departamento"
              variant="outlined"
              fullWidth
              required
              size="small"
              style={gnrStyle}
              value={tarjetaTipoValue}
              onChange={(e) => setTarjetaTipoValue(e.target.value)}
            >
              {tarjetaTipo.map((elemento) => (
                <MenuItem key={elemento.id} value={elemento.id}>
                  {elemento.name}
                </MenuItem>
              ))}
            </Select>
            <Typography style={gnrStyle}>
              Texto corto del aviso / Titulo de la tarjeta
            </Typography>
            <TextField
              id="tarjetaTitulo"
              variant="outlined"
              fullWidth
              style={gnrStyle}
              required
              size="small"
              value={tarjetaTitulo}
              onChange={(e) => setTarjetaTitulo(e.target.value)}
            ></TextField>
            <Typography style={gnrStyle}>Prioridad</Typography>
            <Select
              id="prioridad"
              variant="outlined"
              required
              fullWidth
              size="small"
              value={prioridadValue}
              onChange={(e) => setPrioridadValue(e.target.value)}
              style={gnrStyle}
            >
              {prioridad.map((elemento) => (
                <MenuItem key={elemento.id} value={elemento.id}>
                  {elemento.name}
                </MenuItem>
              ))}
            </Select>
            <Typography style={gnrStyle}>Componente dañado</Typography>
            <Select
              id="componente"
              variant="outlined"
              fullWidth
              required
              size="small"
              style={gnrStyle}
              value={componenteValue}
              onChange={(e) => setComponenteValue(e.target.value)}
            >
              {componente.map((elemento) => (
                <MenuItem key={elemento.id} value={elemento.id}>
                  {elemento.name}
                </MenuItem>
              ))}
            </Select>
            <Typography style={gnrStyle}>Causa de la averia</Typography>
            <Select
              id="causaAveria"
              variant="outlined"
              fullWidth
              required
              size="small"
              style={gnrStyle}
              value={causaAveriaValue}
              onChange={(e) => setCausaAveriaValue(e.target.value)}
            >
              {causaAveria.map((elemento) => (
                <MenuItem key={elemento.id} value={elemento.id}>
                  {elemento.name}
                </MenuItem>
              ))}
            </Select>
            <Typography style={gnrStyle}>Grupo planificador</Typography>
            <Select
              id="tipoFalla"
              variant="outlined"
              fullWidth
              size="small"
              required
              style={gnrStyle}
              value={tipoFallaValue}
              onChange={(e) => setTipoFallaValue(e.target.value)}
            >
              {tipoFalla.map((elemento) => (
                <MenuItem key={elemento.id} value={elemento.id}>
                  {elemento.name}
                </MenuItem>
              ))}
            </Select>
            <Typography style={gnrStyle}>
              Descripción del aviso / Descripción de la tarjeta
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              style={gnrStyle}
              multiline
              rows="6"
              id={descripcionTarjeta}
              value={descripcionTarjeta}
              onChange={(e) => setDescripcionTarjeta(e.target.value)}
            ></TextField>
            <Typography style={gnrStyle}>Afecta a</Typography>
            <Select
              id="afecta"
              variant="outlined"
              fullWidth
              size="small"
              required
              style={gnrStyle}
              value={afectaValue}
              onChange={(e) => setAfectaValue(e.target.value)}
            >
              {afecta.map((elemento) => (
                <MenuItem key={elemento.id} value={elemento.id}>
                  {elemento.name}
                </MenuItem>
              ))}
            </Select>
          </section>
        )}
      </Container>
      <Container style={btnContStyle} maxWidth="sm">
        {renderBckBtn()}
        {renderBtn()}
      </Container>
    </div>
  );
};

export default Step3;
