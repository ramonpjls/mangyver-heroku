import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Container,
  Typography,
  TextField,
  Select,
  Button,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListSubheader,
  InputAdornment,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../axiosinstance";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
  },
}));

const Step1 = () => {
  const classes = useStyles();
  const [formStep, setFormStep] = useState(0);
  const [tarjeta, setTarjeta] = useState("");
  const [failureTimes, setFailureTimes] = useState("");
  const [departamentoValue, setDepartamentoValue] = useState("");

  const [tarjetaTipoValue, setTarjetaTipoValue] = useState("");
  const [tarjetaTitulo, setTarjetaTitulo] = useState("");
  const [prioridadValue, setPrioridadValue] = useState("");
  const [componenteValue, setComponenteValue] = useState("");
  const [causaAveriaValue, setCausaAveriaValue] = useState("");
  const [tipoFallaValue, setTipoFallaValue] = useState("");
  const [descripcionTarjeta, setDescripcionTarjeta] = useState("");
  const [afectaValue, setAfectaValue] = useState("");

  const [lineValue, setLineValue] = useState("");
  const [tipoEquipoValue, setTipoEquipoValue] = useState("");

  const [departamento, setDepartamento] = useState([]);
  const [causaAveria, setCausaAveria] = useState([]);
  const [tarjetaTipo, setTarjetaTipo] = useState([]);
  const [componente, setComponente] = useState([]);
  const [prioridad, setPrioridad] = useState([]);
  const [tipoFalla, setTipoFalla] = useState([]);
  const [afecta, setAfecta] = useState([]);

  const [lines, setLines] = useState([]);
  const [tipoEquipo, setTipoEquipo] = useState([]);

  const [keyword, setKeyword] = useState("");

  const [disButton, setDisButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const data = {
    processId: "CD2B8484-0901-EC11-B563-2818780EF919",
    didCard: tarjeta,
    failureTime: failureTimes,
    department: departamentoValue,
    lineId: lineValue,
    equipmentType: tipoEquipoValue,
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
    setTipoEquipo([]);
  };

  const submitForm = () => {
    axios
      .post("/notices", data)
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

  const handleListItemClick = (event, index) => {
    setTipoEquipoValue(index);
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
          variant="contained"
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
          variant="contained"
          onClick={completeFormStep}
          disabled={disButton}
        >
          Next
        </Button>
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
          areaId: departamentoValue,
        },
      })
      .then((response) => {
        setLines(response.data);
      });
  }, [departamentoValue]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/machines", {
        params: {
          lineId: lineValue,
        },
      })
      .then((response) => {
        setTipoEquipo(response.data);
        setLoading(false);
      });
  }, [lineValue]);

  useEffect(() => {
    axios
      .get("/cards", {
        params: {
          process: "CD2B8484-0901-EC11-B563-2818780EF919",
        },
      })
      .then((response) => {
        setTarjetaTipo(response.data);
      });
  }, []);

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

  useEffect(() => {
    if (tarjeta !== "") {
      setDisButton(false);
    }
  }, [tarjeta]);

  const renderCodigoEquipo = () => {
    if (departamentoValue !== "") {
      return (
        <div style={gnrStyle}>
          <Typography>SubArea</Typography>
          <Select
            id="Linea"
            variant="outlined"
            fullWidth
            required
            size="small"
            style={gnrStyle}
            value={lineValue}
            onChange={(e) => setLineValue(e.target.value)}
            //TODO: setear el parametro para recibir lineas por lineas
          >
            {lines.map((elemento) => (
              <MenuItem key={elemento.id} value={elemento.id}>
                {elemento.name}
              </MenuItem>
            ))}
          </Select>
          <Typography>Equipo</Typography>
          {loading ? (
            <Backdrop className={classes.backdrop} open>
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <List
              style={gnrStyle}
              sx={{
                width: "100%",
                maxWidth: 500,
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                maxHeight: 300,
              }}
            >
              <ListSubheader>
                <TextField
                  type="text"
                  size="small"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Seleccione el campo"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="large" />
                      </InputAdornment>
                    ),
                  }}
                />
              </ListSubheader>
              {tipoEquipo
                // eslint-disable-next-line array-callback-return
                .filter((item) => {
                  if (keyword === "") {
                    return item;
                  } else if (
                    item.label
                      .replace(/ /g, " ")
                      .toLowerCase()
                      .includes(keyword.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((item) => (
                  <ListItemButton
                    dense
                    divider
                    disableGutters
                    selected={tipoEquipoValue === item.id}
                    onClick={(event) => handleListItemClick(event, item.id)}
                  >
                    <ListItem key={item.id}>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  </ListItemButton>
                ))}
            </List>
          )}
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
            {loading ? (
              <Backdrop className={classes.backdrop} open>
                <CircularProgress color="inherit" />
              </Backdrop>
            ) : (
              <Select
                id="departamento"
                variant="outlined"
                fullWidth
                required
                value={departamentoValue}
                onChange={(e) => setDepartamentoValue(e.target.value)}
                size="small"
                style={gnrStyle}
              >
                {departamento.map((elemento) => (
                  <MenuItem key={elemento.id} value={elemento.id}>
                    {elemento.name}
                  </MenuItem>
                ))}
              </Select>
            )}
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
export default Step1;
