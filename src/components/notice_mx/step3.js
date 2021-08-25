import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Select,
  Button,
  MenuItem,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../axiosinstace";

const Step3 = () => {
  const [formStep, setFormStep] = useState(0);
  const [nOt, setNOt] = useState(null);
  const [tarjetaTipo, setTarjetaTipo] = useState(null);
  const [tarjetaTitulo, setTarjetaTitulo] = useState(null);
  const [prioridad, setPrioridad] = useState(null);
  const [componente, setComponente] = useState(null);
  const [causaAveria, setCausaAveria] = useState(null);
  const [tipoFalla, setTipoFalla] = useState(null);
  const [descripcionTarjeta, setDescripcionTarjeta] = useState(null);
  const [afecta, setAfecta] = useState(null);

  const history = useHistory();

  const data = {
    process: "CF2B8484-0901-EC11-B563-2818780EF919",
    OTCode: nOt,
    cardType: tarjetaTipo,
    cardTitle: tarjetaTitulo,
    priority: prioridad,
    components: componente,
    breakdown: causaAveria,
    failureType: tipoFalla,
    cardDescription: descripcionTarjeta,
    affects: afecta,
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
              <MenuItem value={"DD2B8484-0901-EC11-B563-2818780EF919"}>
                Amarillo
              </MenuItem>
              <MenuItem value={"DE2B8484-0901-EC11-B563-2818780EF919"}>
                Rojo
              </MenuItem>
              <MenuItem value={"DF2B8484-0901-EC11-B563-2818780EF919"}>
                Verde
              </MenuItem>
              <MenuItem value={"70417E6D-CA03-EC11-B563-2818780EF919"}>
                Negro
              </MenuItem>
              <MenuItem value={"DC2B8484-0901-EC11-B563-2818780EF919"}>
                Azul
              </MenuItem>
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
              <MenuItem value={"EF2B8484-0901-EC11-B563-2818780EF919"}>
                Muy elevado
              </MenuItem>
              <MenuItem value={"F02B8484-0901-EC11-B563-2818780EF919"}>
                Alto
              </MenuItem>
              <MenuItem value={"F12B8484-0901-EC11-B563-2818780EF919"}>
                Medio
              </MenuItem>
              <MenuItem value={"F22B8484-0901-EC11-B563-2818780EF919"}>
                Bajo
              </MenuItem>
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
              <MenuItem value={"E42B8484-0901-EC11-B563-2818780EF919"}>
                Cadena
              </MenuItem>
              <MenuItem value={"E52B8484-0901-EC11-B563-2818780EF919"}>
                Motoreductor
              </MenuItem>
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
              <MenuItem value={"B63E7187-0F01-EC11-B563-2818780EF919"}>
                Tapad@
              </MenuItem>
              <MenuItem value={"B73E7187-0F01-EC11-B563-2818780EF919"}>
                Desgatad@
              </MenuItem>
              <MenuItem value={"1BC8DA91-0F01-EC11-B563-2818780EF919"}>
                Desgranad@
              </MenuItem>
              <MenuItem value={"1CC8DA91-0F01-EC11-B563-2818780EF919"}>
                Holgad@
              </MenuItem>
              <MenuItem value={"82913C9A-0F01-EC11-B563-2818780EF919"}>
                Reventad@
              </MenuItem>
              <MenuItem value={"83913C9A-0F01-EC11-B563-2818780EF919"}>
                Vibration
              </MenuItem>
              <MenuItem value={"967F4BA4-0F01-EC11-B563-2818780EF919"}>
                Desajustad@
              </MenuItem>
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
              <MenuItem value={"FC2B8484-0901-EC11-B563-2818780EF919"}>
                Luve Drive
              </MenuItem>
              <MenuItem value={"FD2B8484-0901-EC11-B563-2818780EF919"}>
                Producción
              </MenuItem>
              <MenuItem value={"F42B8484-0901-EC11-B563-2818780EF919"}>
                Mecánica
              </MenuItem>
              <MenuItem value={"F52B8484-0901-EC11-B563-2818780EF919"}>
                Eléctrica
              </MenuItem>
              <MenuItem value={"F62B8484-0901-EC11-B563-2818780EF919"}>
                Electrónica
              </MenuItem>
              <MenuItem value={"F72B8484-0901-EC11-B563-2818780EF919"}>
                Civil
              </MenuItem>
              <MenuItem value={"F82B8484-0901-EC11-B563-2818780EF919"}>
                Climas
              </MenuItem>
              <MenuItem value={"F92B8484-0901-EC11-B563-2818780EF919"}>
                Predictivo
              </MenuItem>
              <MenuItem value={"FA2B8484-0901-EC11-B563-2818780EF919"}>
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
              <MenuItem value={"FE2B8484-0901-EC11-B563-2818780EF919"}>
                Calidad
              </MenuItem>
              <MenuItem value={"FF2B8484-0901-EC11-B563-2818780EF919"}>
                GLY/LEF
              </MenuItem>
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
