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

const Step2 = () => {
  const [formStep, setFormStep] = useState(0);

  const [departamento, setDepartamento] = useLocalStorage("departamento", "");
  const [falla, setFalla] = useLocalStorage("falla", "");
  const [codigoEquipo, setCodigoEquipo] = useLocalStorage("codigoEquipo", "");
  const [linea, setLinea] = useLocalStorage("linea", "");
  const [tipoEquipo, setTipoEquipo] = useLocalStorage("tipoEquipo", "");
  const [consecutivo, setConsecutivo] = useLocalStorage("consecutivo", "");

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

  const backBtn = () => {
    setFormStep((cur) => cur - 1);
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

  const btnBckStyle = {
    textTransform: "none",
    marginTop: "1rem",
    fontSize: 16,
    marginBottom: "1rem",
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
    backgroundColor: "#2760B7",
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

  const renderBckBtn = () => {
    if (formStep === 0) {
      return (
        <Button style={gnrStyle} variant="outlined" disabled>
          Back
        </Button>
      );
    } else if (formStep > 2) {
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
    if (formStep > 2) {
      return undefined;
    } else if (formStep === 2) {
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

  const renderCodigoEquipo = () => {
    if (departamento === "otras areas") {
      return (
        <div style={gnrStyle}>
          <Typography variant="overline">Codigo de Equipo</Typography>
          <Select
            id="codigoEquipo"
            variant="outlined"
            fullWidth
            required
            size="small"
            onChange={(e) => setCodigoEquipo(e.target.value)}
            value={codigoEquipo}
            style={gnrStyle}
          >
            <MenuItem value={"RD-0515"}>RD-0515</MenuItem>
            <MenuItem value={"RD-0895"}>RD-0895</MenuItem>
            <MenuItem value={"RD-0445"}>RD-0445</MenuItem>
          </Select>
        </div>
      );
    } else if (departamento === "envasado") {
      return (
        <div style={gnrStyle}>
          <Typography variant="overline">Linea</Typography>
          <Select
            id="Linea"
            variant="outlined"
            fullWidth
            required
            size="small"
            style={gnrStyle}
            onChange={(e) => setLinea(e.target.value)}
            value={linea}
          >
            <MenuItem value={"linea1"}>Linea 1</MenuItem>
            <MenuItem value={"linea2"}>Linea 2</MenuItem>
            <MenuItem value={"linea3"}>Linea 3</MenuItem>
          </Select>
          <Typography variant="overline">Tipo de Equipo</Typography>
          <Select
            id="tipoEquipo"
            variant="outlined"
            fullWidth
            required="true"
            size="small"
            style={gnrStyle}
            onChange={(e) => setTipoEquipo(e.target.value)}
            value={tipoEquipo}
          >
            <MenuItem value={"Tipo1"}>Tipo 1</MenuItem>
            <MenuItem value={"Tipo2"}>Tipo 2</MenuItem>
            <MenuItem value={"Tipo3"}>Tipo 3</MenuItem>
          </Select>
          <Typography variant="overline">Consecutivo</Typography>
          <Select
            id="Consecutivo"
            variant="outlined"
            fullWidth
            required
            size="small"
            style={gnrStyle}
            onChange={(e) => setConsecutivo(e.target.value)}
            value={consecutivo}
          >
            <MenuItem value={"Consecutivo1"}>Consecutivo 1</MenuItem>
            <MenuItem value={"Consecutivo2"}>Consecutivo 2</MenuItem>
            <MenuItem value={"Consecutivo3"}>Consecutivo 3</MenuItem>
          </Select>
        </div>
      );
    }
  };

  return (
    <div>
      <Container>
        {formStep === 0 && (
          <section style={gnrStyle} id="9">
            <Typography align="left" variant="h5">
              Duracion de la falla
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              onChange={(e) => setFalla(e.target.value)}
              value={falla}
              size="small"
              required
              style={gnrStyle}
              label="Cual a sido la duracion de la falla en minutos"
              type="number"
            ></TextField>
          </section>
        )}
        {formStep === 1 && (
          <section style={gnrStyle} id="7">
            <Typography align="left" variant="h5">
              Departamento
            </Typography>
            <Select
              id="departamento"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setDepartamento(e.target.value)}
              value={departamento}
              size="small"
              style={gnrStyle}
            >
              <MenuItem value={"envasado"}>Envasado</MenuItem>
              <MenuItem value={"otras areas"}>Otras areas</MenuItem>
            </Select>
            {renderCodigoEquipo()}
          </section>
        )}
        {formStep === 2 && (
          <section style={gnrStyle} id="6">
            <Typography variant="overline" style={gnrStyle}>
              Tipo de tarjeta
            </Typography>
            <Select
              id="Tarjeta"
              variant="outlined"
              fullWidth
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
              size="small"
              type="File"
              onChange={(e) => setAfectaFile(e.target.value)}
              value={afectaFile}
            ></TextField>
          </section>
        )}
      </Container>
      <Container style={btnContStyle}>
        {renderBckBtn()}
        {renderBtn()}
      </Container>
    </div>
  );
};

export default Step2;
