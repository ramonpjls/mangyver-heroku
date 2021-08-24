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

const Step3 = () => {
  const [formStep, setFormStep] = useState(0);
  const [nOt, setNOt] = useState("");
  const [tarjetaTipo, setTarjetaTipo] = useState("");
  const [tarjetaTitulo, setTarjetaTitulo] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [componente, setComponente] = useState("");
  const [causaAveria, setCausaAveria] = useState("");
  const [tipoFalla, setTipoFalla] = useState("");
  const [descripcionTarjeta, setDescripcionTarjeta] = useState("");
  const [afecta, setAfecta] = useState("");

  //const history = useHistory();

  const m3 = [
    {
      Process: "Aviso derivado de una orden",
      otcode: nOt,
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

  const submitForm = () => {
    axios
      .post("https://mangyver.herokuapp.com/api/v1/notices", m3, {
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

export default Step3;
