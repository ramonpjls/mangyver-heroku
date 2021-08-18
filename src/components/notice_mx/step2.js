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
            <MenuItem value={"Tipo1"}>Despaletizador</MenuItem>
            <MenuItem value={"Tipo2"}>Trans de carton vacío</MenuItem>
            <MenuItem value={"Tipo3"}>Stewart de vacío</MenuItem>
            <MenuItem value={"Tipo3"}>Abridora</MenuItem>
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
            <MenuItem value={"Consecutivo1"}>A</MenuItem>
            <MenuItem value={"Consecutivo2"}>B</MenuItem>
            <MenuItem value={"Consecutivo3"}>C</MenuItem>
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
              <MenuItem value={"VD"}>Verde</MenuItem>
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
              <MenuItem value={"1"}>Muy alta</MenuItem>
              <MenuItem value={"2"}>Alta</MenuItem>
              <MenuItem value={"3"}>Media</MenuItem>
              <MenuItem value={"4"}>Baja</MenuItem>
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
              <MenuItem value={"1"}>Cadena</MenuItem>
              <MenuItem value={"2"}>Motoreductor</MenuItem>
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
              <MenuItem value={"1"}>Lubricación de espreas</MenuItem>
              <MenuItem value={"2"}>Luve Drive</MenuItem>
              <MenuItem value={"3"}>Producción</MenuItem>
              <MenuItem value={"1"}>Mecánica</MenuItem>
              <MenuItem value={"2"}>Eléctrica</MenuItem>
              <MenuItem value={"3"}>Electrónica</MenuItem>
              <MenuItem value={"1"}>Civil</MenuItem>
              <MenuItem value={"2"}>Climas</MenuItem>
              <MenuItem value={"3"}>Predictivo</MenuItem>
              <MenuItem value={"3"}>Lubricación ToolKits</MenuItem>
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
              <MenuItem value={"Afecta a equipo"}>Calidad</MenuItem>
              <MenuItem value={"Afecta la planta"}>GLY/LEF</MenuItem>
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
