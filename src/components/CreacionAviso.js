import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Select,
  Button,
  LinearProgress,
  MenuItem,
} from "@material-ui/core";
import { useForm } from "react-hook-form";

const Fields = () => {
  const [formStep, setFormStep] = useState(0);
  const { watch, register } = useForm();

  const watchAllFields = watch();

  const completeFormStep = () => {
    setFormStep((cur) => cur + 1);
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

  const barStyle = {
    height: 20,
    borderRadius: 5,
    marginTop: "1rem",
    marginBottom: "2rem",
    backgroundColor: "#d0d6e1",
  };

  const contStyle = {
    Maxwidth: "50rem",
    display: "flex",
    flexDirection: "column",
    marginTop: "10rem",
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
    } else if (formStep > 7) {
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
    if (formStep > 3) {
      return undefined;
    } else if (formStep === 3) {
      return (
        <Button
          style={btnNxtStyle}
          variant="outlined"
          color="primary"
          onClick={completeFormStep}
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

  const rndrFalla = () => {
    if (watchAllFields.Tarea === "si") {
      return (
        <TextField
          {...register("OT")}
          variant="outlined"
          style={gnrStyle}
          fullWidth
          size="small"
          type="number"
          placeholder="Duracion de falla"
        ></TextField>
      );
    }
  };

  const renderCodigoEquipo = () => {
    if (watchAllFields.codigoEquipo === "otras areas") {
      return (
        <div style={gnrStyle}>
          <Typography variant="overline">Codigo de Equipo</Typography>
          <Select
            id="codigoEquipo"
            variant="outlined"
            fullWidth
            size="small"
            style={gnrStyle}
            {...register("codigoEquipo")}
          >
            <MenuItem value="RD-0515">RD-0515</MenuItem>
            <MenuItem value="RD-0895">RD-0895</MenuItem>
            <MenuItem value="RD-0445">RD-0445</MenuItem>
          </Select>
        </div>
      );
    } else if (watchAllFields.codigoEquipo === "envasado") {
      return (
        <div style={gnrStyle}>
          <Typography variant="overline">Linea</Typography>
          <Select
            id="Linea"
            variant="outlined"
            fullWidth
            size="small"
            style={gnrStyle}
            {...register("Linea")}
          >
            <MenuItem value="linea1">Linea 1</MenuItem>
            <MenuItem value="linea2">Linea 2</MenuItem>
            <MenuItem value="linea3">Linea 3</MenuItem>
          </Select>
          <Typography variant="overline">Tipo de Equipo</Typography>
          <Select
            id="Linea"
            variant="outlined"
            fullWidth
            size="small"
            style={gnrStyle}
            {...register("TipoEquipo")}
          >
            <MenuItem value="Tipo1">Tipo 1</MenuItem>
            <MenuItem value="Tipo2">Tipo 2</MenuItem>
            <MenuItem value="Tipo3">Tipo 3</MenuItem>
          </Select>
          <Typography variant="overline">Consecutivo</Typography>
          <Select
            id="Consecutivo"
            variant="outlined"
            fullWidth
            size="small"
            style={gnrStyle}
            {...register("Consecutivo")}
          >
            <MenuItem value="Consecutivo1">Consecutivo 1</MenuItem>
            <MenuItem value="Consecutivo2">Consecutivo 2</MenuItem>
            <MenuItem value="Consecutivo3">Consecutivo 3</MenuItem>
          </Select>
        </div>
      );
    }
  };

  const renderNOT = () => {
    if (watchAllFields.Proceso === "M3") {
      return (
        <div style={gnrStyle}>
          <Typography variant="overline">Numero de OT</Typography>
          <TextField
            variant="outlined"
            {...register("OT")}
            fullWidth
            style={gnrStyle}
            size="small"
            label="Numero de OT"
          ></TextField>
        </div>
      );
    } else {
      return undefined;
    }
  };

  return (
    <div>
      <Container style={contStyle}>
        {formStep === 0 && (
          <section id="1">
            <LinearProgress
              variant="determinate"
              style={barStyle}
              value={15}
            ></LinearProgress>
            <Typography style={gnrStyle} align="center" variant="h5">
              Elige el Proceso
            </Typography>
            <Select
              id="Proceso"
              variant="outlined"
              fullWidth
              size="small"
              style={gnrStyle}
              {...register("Proceso")}
            >
              <MenuItem value="M1">Crear Tarjeta (M1)</MenuItem>
              <MenuItem value="M2">Notificación de falla (M2)</MenuItem>
              <MenuItem value="M3">Aviso derivado de una orden (M3)</MenuItem>
            </Select>
            {renderNOT()}
          </section>
        )}
        {formStep === 1 && (
          <section id="5">
            <LinearProgress
              variant="determinate"
              style={barStyle}
              value={35}
            ></LinearProgress>
            <Typography style={gnrStyle} align="center" variant="h5">
              Se realizo la tarea
            </Typography>
            <Select
              {...register("Tarea")}
              variant="outlined"
              fullWidth
              size="small"
            >
              <MenuItem value={"si"}>Si</MenuItem>
              <MenuItem value={"no"}>No</MenuItem>
            </Select>
            {rndrFalla()}
          </section>
        )}
        {formStep === 2 && (
          <section id="7">
            <LinearProgress
              variant="determinate"
              style={barStyle}
              value={55}
            ></LinearProgress>
            <Typography align="center" variant="h5">
              Departamento
            </Typography>
            <Select
              id="codigoEquipo"
              variant="outlined"
              fullWidth
              size="small"
              style={gnrStyle}
              {...register("codigoEquipo")}
            >
              <MenuItem value="envasado">Envasado</MenuItem>
              <MenuItem value="otras areas">Otras areas</MenuItem>
            </Select>
            {renderCodigoEquipo()}
          </section>
        )}
        {formStep === 3 && (
          <section id="6">
            <LinearProgress
              variant="determinate"
              style={barStyle}
              value={95}
            ></LinearProgress>
            <Typography variant="overline" style={gnrStyle}>
              Tipo de tarjeta
            </Typography>
            <Select
              id="Tarjeta"
              variant="outlined"
              fullWidth
              size="small"
              style={gnrStyle}
              {...register("Tarjeta")}
            >
              <MenuItem value="AM">Amarillo</MenuItem>
              <MenuItem value="RJ">Rojo</MenuItem>
              <MenuItem value="VD">verde</MenuItem>
              <MenuItem value="AZ">Azul</MenuItem>
            </Select>
            <Typography variant="overline" style={gnrStyle}>
              Titulo de la tarjeta
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              style={gnrStyle}
              {...register("tituloTarjeta")}
              size="small"
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
              {...register("prioridad")}
            >
              <MenuItem value="1">Muy Elevado</MenuItem>
              <MenuItem value="2">Elevado</MenuItem>
              <MenuItem value="3">Medio</MenuItem>
              <MenuItem value="4">Bajo</MenuItem>
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
              {...register("componente")}
            >
              <MenuItem value="1">componente 010</MenuItem>
              <MenuItem value="2">componente 012</MenuItem>
              <MenuItem value="3">componente 015</MenuItem>
              <MenuItem value="4">componente 019</MenuItem>
            </Select>
            <Typography variant="overline" style={gnrStyle}>
              Causa de la averia
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              style={gnrStyle}
              size="small"
              {...register("causaAveria")}
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
              {...register("tipoFalla")}
            >
              <MenuItem value="Planeador PRED ENV">Planeador PRED ENV</MenuItem>
              <MenuItem value="Planeador MEC MNG">Planeador MEC MNG</MenuItem>
              <MenuItem value="Planeador ELE MNG">Planeador ELE MNG</MenuItem>
              <MenuItem value="Planeador ELO MNG">Planeador ELO MNG</MenuItem>
              <MenuItem value="Planeador MEC ENV">Planeador MEC ENV</MenuItem>
              <MenuItem value="Planeador ELO ENV">Planeador ELO ENV</MenuItem>
              <MenuItem value="Planeador ELE ENV">Planeador ELE ENV</MenuItem>
              <MenuItem value="Planeador MTO PRED">Planeador MTO PRED</MenuItem>
              <MenuItem value="Planeador  CIV MNG">Planeador CIV MNG</MenuItem>
              <MenuItem value="Planeador SYE">Planeador SYE</MenuItem>
              <MenuItem value="Planeador LCE">Planeador LCE</MenuItem>
              <MenuItem value="Planeador LTAG">Planeador LTAG</MenuItem>
            </Select>

            <Typography variant="overline" style={gnrStyle}>
              Descripcion de la tarjeta
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              {...register("descTarjeta")}
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
              {...register("Afecta1")}
            >
              <MenuItem value="Afecta a equipo">Afecta a equipo</MenuItem>
              <MenuItem value="Afecta la planta">Afecta la planta</MenuItem>
              <MenuItem value="Afecta a personas">Afecta a personas</MenuItem>
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
            ></TextField>
          </section>
        )}
        <Container style={btnContStyle}>
          {renderBckBtn()}
          {renderBtn()}
        </Container>
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </Container>
    </div>
  );
};

export default Fields;
