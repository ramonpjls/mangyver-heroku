import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Select,
  Button,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../axiosinstance";

const Step2 = () => {
  const [formStep, setFormStep] = useState(0);
  const [failureTimes, setFailureTimes] = useState("");
  const [departamentoValue, setDepartamentoValue] = useState("");
  const [lineValue, setLineValue] = useState("");
  const [tipoEquipoValue, setTipoEquipoValue] = useState("");
<<<<<<< HEAD
=======

>>>>>>> dev
  const [tarjetaTipoValue, setTarjetaTipoValue] = useState("");
  const [tarjetaTitulo, setTarjetaTitulo] = useState("");
  const [prioridadValue, setPrioridadValue] = useState("");
  const [componenteValue, setComponenteValue] = useState("");
  const [causaAveriaValue, setCausaAveriaValue] = useState("");
  const [tipoFallaValue, setTipoFallaValue] = useState("");
  const [descripcionTarjeta, setDescripcionTarjeta] = useState("");
  const [afectaValue, setAfectaValue] = useState("");
  const [departamento, setDepartamento] = useState([]);
  const [causaAveria, setCausaAveria] = useState([]);
  const [tarjetaTipo, setTarjetaTipo] = useState([]);
  const [lines, setLines] = useState([]);
  const [tipoEquipo, setTipoEquipo] = useState([]);
<<<<<<< HEAD
=======

>>>>>>> dev
  const [componente, setComponente] = useState([]);
  const [prioridad, setPrioridad] = useState([]);
  const [tipoFalla, setTipoFalla] = useState([]);
  const [afecta, setAfecta] = useState([]);

  const history = useHistory();

  const data = {
    process: "CE2B8484-0901-EC11-B563-2818780EF919",
    failureTime: failureTimes,
    department: departamentoValue,
    line: lineValue,
    equipmentType: tipoEquipoValue,
<<<<<<< HEAD
=======

>>>>>>> dev
    cardType: tarjetaTipoValue,
    cardTitle: tarjetaTitulo,
    priority: prioridadValue,
    components: componenteValue,
    breakdown: causaAveriaValue,
    failureType: tipoFallaValue,
    cardDescription: descripcionTarjeta,
    affects: afectaValue,
  };

  const completeFormStep = () => {
    setFormStep((cur) => cur + 1);
  };

  const backBtn = () => {
    setFormStep((cur) => cur - 1);
  };

  const submitForm = () => {
    axios
      .post("​/notices​/old_notice", data)
      .then((res) => {
        console.log(res);
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
    if (departamentoValue !== "") {
      return (
        <div style={gnrStyle}>
          <Typography>SubArea</Typography>
<<<<<<< HEAD
          <Select
            id="tipoEquipo"
            variant="outlined"
            fullWidth
            required
=======
          <Autocomplete
            id="lines"
            options={lines}
            style={gnrStyle}
>>>>>>> dev
            size="small"
            renderInput={(params) => <TextField {...params} />}
            inputValue={lineValue}
            onInputChange={(event, newValue) => {
              setLineValue(newValue);
            }}
          />
          <Typography>Equipo</Typography>
          <Autocomplete
            id="tipoEquipo"
            options={tipoEquipo}
            style={gnrStyle}
<<<<<<< HEAD
            value={tipoEquipoValue}
            onChange={(e) => setTipoEquipoValue(e.target.value)}
          >
            {tipoEquipo.map((elemento) => (
              <MenuItem key={elemento.id} value={elemento.id}>
                {elemento.name}
              </MenuItem>
            ))}
          </Select>
=======
            size="small"
            renderInput={(params) => <TextField {...params} />}
            inputValue={tipoEquipoValue}
            onInputChange={(event, newValue) => {
              setTipoEquipoValue(newValue);
            }}
          />
>>>>>>> dev
        </div>
      );
    }
  };

  //TODO: setear el parametro para recibir lineas por machines

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await axios.get("/areas").then((response) => {
      setDepartamento(response.data);
    });
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
    axios
      .get("/lines", {
        params: {
          area: departamentoValue,
        },
      })
      .then((response) => {
        setLines(response.data);
      });
  }, [departamentoValue]);

  useEffect(() => {
    axios
      .get("/machines", {
        params: {
          line: lineValue,
        },
      })
      .then((response) => {
        setTipoEquipo(response.data);
      });
  }, [lineValue]);

  useEffect(() => {
    axios
      .get("/cards", {
        params: {
          process: "CE2B8484-0901-EC11-B563-2818780EF919",
        },
      })
      .then((response) => {
        setTarjetaTipo(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <div>
      <Container>
        {formStep >= 0 && (
          <section style={formStep === 0 ? {} : { display: "none" }} id="9">
            <Typography align="left" variant="h5">
              Duracion de la falla
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              onChange={(e) => setFailureTimes(e.target.value)}
              value={failureTimes}
              size="small"
              required
              style={gnrStyle}
              label="Cual a sido la duracion de la falla en minutos"
              type="number"
            ></TextField>
          </section>
        )}
        {formStep >= 1 && (
          <section style={formStep === 1 ? {} : { display: "none" }} id="7">
            <Typography align="left" variant="h5">
              Departamento
            </Typography>
            <Autocomplete
              id="Departamento"
              options={departamento}
              style={gnrStyle}
              size="small"
              renderInput={(params) => <TextField {...params} />}
              inputValue={departamentoValue}
              onInputChange={(event, newValue) => {
                setDepartamentoValue(newValue);
              }}
            />
            {renderCodigoEquipo()}
          </section>
        )}
        {formStep >= 2 && (
          <section style={formStep === 2 ? {} : { display: "none" }} id="6">
            <Typography style={gnrStyle}>Tipo de tarjeta</Typography>
            <Autocomplete
              id="tarjetaTipo"
              options={tarjetaTipo}
              style={gnrStyle}
              size="small"
              renderInput={(params) => <TextField {...params} />}
              inputValue={tarjetaTipoValue}
              onInputChange={(event, newValue) => {
                setTarjetaTipoValue(newValue);
              }}
            />
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
            <Autocomplete
              id="componente"
              options={componente}
              style={gnrStyle}
              size="small"
              renderInput={(params) => <TextField {...params} />}
              inputValue={componenteValue}
              onInputChange={(event, newValue) => {
                setComponenteValue(newValue);
              }}
            />
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
<<<<<<< HEAD
            <Select
=======
            <Autocomplete
>>>>>>> dev
              id="tipoFalla"
              options={tipoFalla}
              style={gnrStyle}
              size="small"
              renderInput={(params) => <TextField {...params} />}
              inputValue={tipoFallaValue}
              onInputChange={(event, newValue) => {
                setTipoFallaValue(newValue);
              }}
            />
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
      <Container style={btnContStyle}>
        {renderBckBtn()}
        {renderBtn()}
      </Container>
    </div>
  );
};

export default Step2;
