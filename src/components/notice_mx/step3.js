import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Select,
  Button,
  MenuItem,
} from "@material-ui/core";
import { useLocalStorage } from "./useLocalStorage";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const Step3 = () => {
  const [formStep, setFormStep] = useState(0);

  const [ot, setOt] = useLocalStorage("ot", "");

  const [tipoTarjeta, setTipoTarjeta] = useLocalStorage("tipoTarjeta", "");
  const [tituloTarjeta, setTituloTarjeta] = useLocalStorage(
    "tituloTarjeta",
    ""
  );
  const [prioridad, setPrioridad] = useLocalStorage("prioridad", "");
  const [componenteDanado, setComponenteDanado] = useLocalStorage(
    "componenteDanado",
    ""
  );
  const [causaAveria, setCausaAveria] = useLocalStorage("causaAveria", "");
  const [tipoFalla, setTipoFalla] = useLocalStorage("tipoFalla", "");
  const [descTarjeta, setDescTarjeta] = useLocalStorage("descTarjeta", "");
  const [afecta, setAfecta] = useLocalStorage("afecta", "");
  const [afectaFile, setAfectaFile] = useLocalStorage("afectaFile", "");

  const history = useHistory();

  const completeFormStep = () => {
    setFormStep((cur) => cur + 1);
  };

  const submitForm = () => {
    Swal.fire({
      text: "Aviso creado exitosamente",
      icon: "success",
      showConfirmButton: false,
    });
    history.push("/ShowAvisos");
    localStorage.clear();
    window.location.reload();
  };
  const backBtn = () => {
    setFormStep((cur) => cur - 1);
  };

  const btnBckStyle = {
    textTransform: "none",
    marginTop: "1rem",
    fontSize: 16,
    lineHeight: 1.5,
    backgroundColor: "#d06345",
    color: "#fff",
  };

  const btnNxtStyle = {
    textTransform: "none",
    marginTop: "1rem",
    fontSize: 16,
    lineHeight: 1.5,
    backgroundColor: "#2760B7",
    color: "#fff",
  };

  const gnrStyle = {
    marginTop: "1rem",
  };

  const btnContStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const renderBckBtn = () => {
    if (formStep === 0) {
      return (
        <Button style={gnrStyle} variant="outlined" disabled>
          Back
        </Button>
      );
    } else if (formStep > 1) {
      return undefined;
    } else {
      return (
        <Button style={btnBckStyle} variant="outlined" onClick={backBtn}>
          Back
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
          variant="outlined"
          color="primary"
          onClick={submitForm}
        >
          Submit Form
        </Button>
      );
    } else {
      return (
        <Button
          style={btnNxtStyle}
          variant="outlined"
          onClick={completeFormStep}
        >
          Next
        </Button>
      );
    }
  };

  return (
    <div>
      <Container>
        {formStep === 0 && (
          <section style={gnrStyle} id="4">
            <Typography align="left" variant="h5">
              Numero de OT
            </Typography>
            <TextField
              variant="outlined"
              onChange={(e) => setOt(e.target.value)}
              value={ot}
              type="number"
              fullWidth
              style={gnrStyle}
              size="small"
              label="Numero de OT"
            ></TextField>
          </section>
        )}
        {formStep === 1 && (
          <section style={gnrStyle} id="6">
            <Typography variant="overline" style={gnrStyle}>
              Tipo de tarjeta
            </Typography>
            <Select
              id="Tarjeta"
              variant="outlined"
              fullWidth
              size="small"
              onChange={(e) => setTipoTarjeta(e.target.value)}
              value={tipoTarjeta}
              style={gnrStyle}
            >
              <MenuItem value={"AM"}>Amarillo</MenuItem>
              <MenuItem value={"RJ"}>Rojo</MenuItem>
              <MenuItem value={"VD"}>verde</MenuItem>
              <MenuItem value={"AZ"}>Azul</MenuItem>
            </Select>
            <Typography variant="overline" style={gnrStyle}>
              Titulo de la tarjeta
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              style={gnrStyle}
              size="small"
              onChange={(e) => setTituloTarjeta(e.target.value)}
              value={tituloTarjeta}
            ></TextField>
            <Typography variant="overline" style={gnrStyle}>
              Prioridad
            </Typography>
            <Select
              id="prioridad"
              variant="outlined"
              fullWidth
              size="small"
              style={gnrStyle}
              onChange={(e) => setPrioridad(e.target.value)}
              value={prioridad}
            >
              <MenuItem value={"1"}>Muy Elevado</MenuItem>
              <MenuItem value={"2"}>Elevado</MenuItem>
              <MenuItem value={"3"}>Medio</MenuItem>
              <MenuItem value={"4"}>Bajo</MenuItem>
            </Select>

            <Typography variant="overline" style={gnrStyle}>
              Componente dañado
            </Typography>
            <Select
              id="componente"
              variant="outlined"
              fullWidth
              size="small"
              style={gnrStyle}
              onChange={(e) => setComponenteDanado(e.target.value)}
              value={componenteDanado}
            >
              <MenuItem value={"1"}>componente 010</MenuItem>
              <MenuItem value={"2"}>componente 012</MenuItem>
              <MenuItem value={"3"}>componente 015</MenuItem>
              <MenuItem value={"4"}>componente 019</MenuItem>
            </Select>
            <Typography variant="overline" style={gnrStyle}>
              Causa de la averia
            </Typography>
            <TextField
              id="causaAveria"
              variant="outlined"
              fullWidth
              style={gnrStyle}
              size="small"
              onChange={(e) => setCausaAveria(e.target.value)}
              value={causaAveria}
            ></TextField>
            <Typography variant="overline" style={gnrStyle}>
              Tipo de falla
            </Typography>
            <Select
              id="tipoFalla"
              variant="outlined"
              fullWidth
              size="small"
              style={gnrStyle}
              onChange={(e) => setTipoFalla(e.target.value)}
              value={tipoFalla}
            >
              <MenuItem value={"Planeador PRED ENV"}>
                Planeador PRED ENV
              </MenuItem>
              <MenuItem value={"Planeador MEC MNG"}>Planeador MEC MNG</MenuItem>
              <MenuItem value={"Planeador ELE MNG"}>Planeador ELE MNG</MenuItem>
              <MenuItem value={"Planeador ELO MNG"}>Planeador ELO MNG</MenuItem>
              <MenuItem value={"Planeador MEC ENV"}>Planeador MEC ENV</MenuItem>
              <MenuItem value={"Planeador ELO ENV"}>Planeador ELO ENV</MenuItem>
              <MenuItem value={"Planeador ELE ENV"}>Planeador ELE ENV</MenuItem>
              <MenuItem value={"Planeador MTO PRED"}>
                Planeador MTO PRED
              </MenuItem>
              <MenuItem value={"Planeador  CIV MNG"}>
                Planeador CIV MNG
              </MenuItem>
              <MenuItem value={"Planeador SYE"}>Planeador SYE</MenuItem>
              <MenuItem value={"Planeador LCE"}>Planeador LCE</MenuItem>
              <MenuItem value={"Planeador LTAG"}>Planeador LTAG</MenuItem>
            </Select>

            <Typography variant="overline" style={gnrStyle}>
              Descripcion de la tarjeta
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              onChange={(e) => setDescTarjeta(e.target.value)}
              value={descTarjeta}
              style={gnrStyle}
              multiline
              rows="6"
            ></TextField>
            <Typography variant="overline" style={gnrStyle}>
              Afecta a
            </Typography>
            <Select
              id="Afecta1"
              variant="outlined"
              fullWidth
              size="small"
              style={gnrStyle}
              onChange={(e) => setAfecta(e.target.value)}
              value={afecta}
            >
              <MenuItem value={"Afecta a equipo"}>Afecta a equipo</MenuItem>
              <MenuItem value={"Afecta la planta"}>Afecta la planta</MenuItem>
              <MenuItem value={"Afecta a personas"}>Afecta a personas</MenuItem>
            </Select>
            <Typography variant="overline" style={gnrStyle}>
              Afecta a
            </Typography>
            <TextField
              variant="outlined"
              style={gnrStyle}
              fullWidth
              size="small"
              type="File"
              onChange={(e) => setAfectaFile(e.target.value)}
              value={afectaFile}
            ></TextField>
          </section>
        )}
        <Container style={btnContStyle}>
          {renderBckBtn()}
          {renderBtn()}
        </Container>
      </Container>
    </div>
  );
};

export default Step3;
