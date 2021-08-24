import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Select,
  Button,
  MenuItem,
} from "@material-ui/core";
//import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Step1 = () => {
  const [formStep, setFormStep] = useState(0);
  const [tarjeta, setTarjeta] = useState("");
  const [failureTimes, setFailureTimes] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [codigoEquipo, setCodigoEquipo] = useState("");
  const [linea, setLinea] = useState("");
  const [tipoEquipo, setTipoEquipo] = useState("");
  const [consecutivo, setConsecutivo] = useState("");
  const [tarjetaTipo, setTarjetaTipo] = useState("");
  const [tarjetaTitulo, setTarjetaTitulo] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [componente, setComponente] = useState("");
  const [causaAveria, setCausaAveria] = useState("");
  const [tipoFalla, setTipoFalla] = useState("");
  const [descripcionTarjeta, setDescripcionTarjeta] = useState("");
  const [afecta, setAfecta] = useState("");

  //const history = useHistory();

  const m1 = [
    {
      Process: "Aviso",
      didCard: tarjeta,
      failureTime: failureTimes,
      department: departamento,
      equipmentCode: codigoEquipo,
      line: linea,
      equipmentType: tipoEquipo,
      consecutive: consecutivo,
      cardtype: tarjetaTipo,
      cardTitle: tarjetaTitulo,
      priority: prioridad,
      component: componente,
      breakdown: causaAveria,
      failuretype: tipoFalla,
      cardDescription: descripcionTarjeta,
      Affect: afecta,
    },
  ];

  const auth = localStorage.token;

  const completeFormStep = () => {
    setFormStep((cur) => cur + 1);
  };

  console.log(m1[0]);

  const submitForm = () => {
    axios
      .post("https://mangyver.herokuapp.com/api/v1/notices", m1, {
        headers: { auth },
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          text: "Aviso creado exitosamente",
          icon: "success",
          showConfirmButton: false,
        });
        //history.push("/ShowAvisos");
        //window.location.reload();
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
    if (formStep < 0) {
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

  const rndrFalla = () => {
    if (tarjeta === "si") {
      return (
        <TextField
          variant="outlined"
          style={gnrStyle}
          fullWidth
          required
          id="failureTimes"
          value={failureTimes}
          onChange={(e) => setFailureTimes(e.target.value)}
          size="small"
          type="number"
          placeholder="Duracion de falla en minutos"
        ></TextField>
      );
    }
  };

  const renderCodigoEquipo = () => {
    if (departamento === "otras areas") {
      return (
        <div style={gnrStyle}>
          <Typography>Codigo de Equipo</Typography>
          <TextField
            id="codigoEquipo"
            variant="outlined"
            fullWidth
            size="small"
            type="number"
            required
            style={gnrStyle}
            value={codigoEquipo}
            onChange={(e) => setCodigoEquipo(e.target.value)}
          ></TextField>
        </div>
      );
    } else if (departamento === "envasado") {
      return (
        <div style={gnrStyle}>
          <Typography>Linea</Typography>
          <Select
            id="Linea"
            variant="outlined"
            fullWidth
            required
            size="small"
            style={gnrStyle}
            value={linea}
            onChange={(e) => setLinea(e.target.value)}
          >
            <MenuItem value={"linea2"}>Linea 2</MenuItem>
            <MenuItem value={"linea3"}>Linea 3</MenuItem>
            <MenuItem value={"linea4"}>Linea 4</MenuItem>
            <MenuItem value={"linea5"}>Linea 5</MenuItem>
          </Select>
          <Typography>Tipo de Equipo</Typography>
          <Select
            id="tipoEquipo"
            variant="outlined"
            fullWidth
            required
            size="small"
            style={gnrStyle}
            value={tipoEquipo}
            onChange={(e) => setTipoEquipo(e.target.value)}
          >
            <MenuItem value={"Despaletizador"}>Despaletizador</MenuItem>
            <MenuItem value={"Trans de carton vacio"}>
              Trans de carton vacío
            </MenuItem>
            <MenuItem value={"Stewart de vacio"}>Stewart de vacío</MenuItem>
            <MenuItem value={"Abridora"}>Abridora</MenuItem>
          </Select>
          <Typography>Consecutivo</Typography>
          <Select
            id="consecutivo"
            variant="outlined"
            fullWidth
            size="small"
            required
            style={gnrStyle}
            value={consecutivo}
            onChange={(e) => setConsecutivo(e.target.value)}
          >
            <MenuItem value={"A"}>A</MenuItem>
            <MenuItem value={"B"}>B</MenuItem>
            <MenuItem value={"C"}>C</MenuItem>
            <MenuItem value={"no aplica"}>No Aplica</MenuItem>
          </Select>
        </div>
      );
    }
  };

  return (
    <div>
      <Container>
        {formStep >= 0 && (
          <section style={formStep === 0 ? {} : { display: "none" }} id="5">
            <Typography style={gnrStyle} align="left" variant="h5">
              Se realizo la tarjeta
            </Typography>
            <Select
              variant="outlined"
              required
              id="tarjeta"
              value={tarjeta}
              onChange={(e) => setTarjeta(e.target.value)}
              fullWidth
              size="small"
            >
              <MenuItem value={"si"}>Si</MenuItem>
              <MenuItem value={"no"}>No</MenuItem>
            </Select>
            {rndrFalla()}
          </section>
        )}
        {formStep >= 1 && (
          <section style={formStep === 1 ? {} : { display: "none" }} id="7">
            <Typography align="left" variant="h5">
              Departamento
            </Typography>
            <Select
              id="departamento"
              variant="outlined"
              fullWidth
              required
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              size="small"
              style={gnrStyle}
            >
              <MenuItem value={"envasado"}>Envasado</MenuItem>
              <MenuItem value={"otras areas"}>Otras areas</MenuItem>
            </Select>
            {renderCodigoEquipo()}
          </section>
        )}
        {formStep >= 2 && (
          <section style={formStep === 2 ? {} : { display: "none" }} id="6">
            <Typography style={gnrStyle}>Tipo de tarjeta</Typography>
            <Select
              id="tarjetaTipo"
              variant="outlined"
              fullWidth
              size="small"
              required
              style={gnrStyle}
              value={tarjetaTipo}
              onChange={(e) => setTarjetaTipo(e.target.value)}
            >
              <MenuItem value={"Amarillo"}>Amarillo</MenuItem>
              <MenuItem value={"Rojo"}>Rojo</MenuItem>
              <MenuItem value={"Verde"}>Verde</MenuItem>
              <MenuItem value={"Azul"}>Azul</MenuItem>
            </Select>
            <Typography style={gnrStyle}>Titulo de la tarjeta</Typography>
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
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value)}
              style={gnrStyle}
            >
              <MenuItem value={"Muy alta"}>Muy alta</MenuItem>
              <MenuItem value={"Alta"}>Alta</MenuItem>
              <MenuItem value={"Media"}>Media</MenuItem>
              <MenuItem value={"Baja"}>Baja</MenuItem>
            </Select>
            <Typography style={gnrStyle}>Componente dañado</Typography>
            <Select
              id="componente"
              variant="outlined"
              fullWidth
              required
              size="small"
              style={gnrStyle}
              value={componente}
              onChange={(e) => setComponente(e.target.value)}
            >
              <MenuItem value={"cadena"}>Cadena</MenuItem>
              <MenuItem value={"motoreductor"}>Motoreductor</MenuItem>
            </Select>
            <Typography style={gnrStyle}>Causa de la averia</Typography>
            <Select
              id="causaAveria"
              variant="outlined"
              fullWidth
              style={gnrStyle}
              size="small"
              required
              value={causaAveria}
              onChange={(e) => setCausaAveria(e.target.value)}
            >
              <MenuItem value={"Tapad@"}>Tapad@</MenuItem>
              <MenuItem value={"Desgatad@"}>Desgatad@</MenuItem>
              <MenuItem value={"Desgranad@"}>Desgranad@</MenuItem>
              <MenuItem value={"Holgad@"}>Holgad@</MenuItem>
              <MenuItem value={"Reventad@"}>Reventad@</MenuItem>
              <MenuItem value={"Vibration"}>Vibration</MenuItem>
              <MenuItem value={"Desajustad@"}>Desajustad@</MenuItem>
            </Select>
            <Typography style={gnrStyle}>Tipo de falla</Typography>
            <Select
              id="tipoFalla"
              variant="outlined"
              fullWidth
              size="small"
              required
              style={gnrStyle}
              value={tipoFalla}
              onChange={(e) => setTipoFalla(e.target.value)}
            >
              <MenuItem value={"Lubricación de espreas"}>
                Lubricación de espreas
              </MenuItem>
              <MenuItem value={"Luve Drive"}>Luve Drive</MenuItem>
              <MenuItem value={"Producción"}>Producción</MenuItem>
              <MenuItem value={"Mecánica"}>Mecánica</MenuItem>
              <MenuItem value={"Eléctrica"}>Eléctrica</MenuItem>
              <MenuItem value={"Electrónica"}>Electrónica</MenuItem>
              <MenuItem value={"Civil"}>Civil</MenuItem>
              <MenuItem value={"Climas"}>Climas</MenuItem>
              <MenuItem value={"Predictivo"}>Predictivo</MenuItem>
              <MenuItem value={"Lubricación ToolKits"}>
                Lubricación ToolKits
              </MenuItem>
            </Select>
            <Typography style={gnrStyle}>Descripcion de la tarjeta</Typography>
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
              value={afecta}
              onChange={(e) => setAfecta(e.target.value)}
            >
              <MenuItem value={"calidad"}>Calidad</MenuItem>
              <MenuItem value={"GLY/LEF"}>GLY/LEF</MenuItem>
            </Select>
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
export default Step1;
