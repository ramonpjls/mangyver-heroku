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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
  },
}));

const Step2 = () => {
  const noticeType = useSelector((state) => state.notice.noticeType);
  const classes = useStyles();
  const [formStep, setFormStep] = useState(0);
  const [failureTimes, setFailureTimes] = useState("");
  const [departamentoValue, setDepartamentoValue] = useState(0);
  const [lineValue, setLineValue] = useState(0);
  const [tipoEquipoValue, setTipoEquipoValue] = useState(null);

  const [tarjetaTipoValue, setTarjetaTipoValue] = useState(null);
  const [tarjetaTitulo, setTarjetaTitulo] = useState(null);
  const [prioridadValue, setPrioridadValue] = useState(null);
  const [tipoFallaValue, setTipoFallaValue] = useState(null);
  const [descripcionTarjeta, setDescripcionTarjeta] = useState(null);
  const [afectaValue, setAfectaValue] = useState(null);

  const [departamento, setDepartamento] = useState([]);
  const [tarjetaTipo, setTarjetaTipo] = useState([]);
  const [lines, setLines] = useState([]);
  const [tipoEquipo, setTipoEquipo] = useState([]);
  const [prioridad, setPrioridad] = useState([]);
  const [tipoFalla, setTipoFalla] = useState([]);
  const [afecta, setAfecta] = useState([]);

  const [disButton, setDisButton] = useState(true);

  const [keyword, setKeyword] = useState("");

  const [loading, setLoading] = useState(false);

  const [photoPath, setPhotoPath] = useState({});

  const [objetoValue, setObjetoValue] = useState(null);
  const [causaValue, setCausaValue] = useState(null);
  const [sintomaValue, setSintomaValue] = useState(null);
  const [objeto, setObjeto] = useState([]);
  const [causa, setCausa] = useState([]);
  const [sintoma, setSintoma] = useState([]);
  const [txtCausa, setTxtCausa] = useState(null);
  const [txtSintoma, setTxtSintoma] = useState(null);
  const [groupCode, setGroupCode] = useState("");
  const [responsable, setResponsable] = useState([]);
  const [responsableValue, setResponsableValue] = useState("");

  const history = useHistory();

  const [leyendaTituloCorto, setLeyendaTituloCorto] = useState("");
  const [errorTituloCorto, setErrorTituloCorto] = useState(false);
  const [leyendaDepartment, setLeyendaDepartment] = useState(""); // department
  const [errorDepartment, setErrorDepartment] = useState(false); // department
  const [leyendaLineValue, setLeyendaLineValue] = useState(""); // line
  const [errorLineValue, setErrorLineValue] = useState(false); // line
  const [leyendaTipoEquipo, setLeyendaTipoEquipo] = useState(""); // equipmentType
  const [errorTipoEquipo, setErrorTipoEquipo] = useState(false); // equipmentType
  const [leyendaTarjetaTipo, setLeyendaTarjetaTipo] = useState(""); // cardType
  const [errorTarjetaTipo, setErrorTarjetaTipo] = useState(false); // cardType
  const [leyendaPrioridadValue, setLeyendaPrioridadValue] = useState(""); // priority
  const [errorPrioridadValue, setErrorPrioridadValue] = useState(false); // priority
  const [leyendaTipoFallaValue, setLeyendaTipoFallaValue] = useState(""); // failureType
  const [errorTipoFallaValue, setErrorTipoFallaValue] = useState(false); // failureType
  const [leyendaDescripcionTarjeta, setLeyendaDescripcionTarjeta] = useState(""); // cardDescription
  const [errorDescripcionTarjeta, setErrorDescripcionTarjeta] = useState(false); // cardDescription

  const data = {
    processId: noticeType.processId,
    failureTime: failureTimes,
    departmentId: departamentoValue,
    lineId: lineValue,
    equipmentId: tipoEquipoValue,
    cardTypeId: tarjetaTipoValue,
    cardTitle: tarjetaTitulo,
    priorityId: prioridadValue,
    failureTypeId: tipoFallaValue,
    cardDescription: descripcionTarjeta,
    affectsId: afectaValue,
    objectId: objetoValue,
    causeId: causaValue,
    symptomId: sintomaValue,
    textCause: txtCausa,
    textSymptom: txtSintoma,
    urlPhoto: photoPath,
    responsableId: responsableValue,
  };

  const completeFormStep = () => {
    if (formStep === 0) {
      setFormStep((cur) => cur + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setTipoEquipo([]);

    } else if (formStep === 1) {    // ------------------------ Validacion Departamento Lista
      console.log("Formulario 1", formStep)

      if (data?.departmentId === 0) {
        setLeyendaDepartment("Campo Requerido")
        setErrorDepartment(true)
      } else if (data?.lineId === 0) {
        setLeyendaLineValue("Campo Requerido")
        setErrorLineValue(true)
      } else if (keyword === "") {
        console.log("Equipo")
        setLeyendaTipoEquipo("Campo Requerido")
        setErrorTipoEquipo(true)
      } else {
        setLeyendaTipoEquipo("")
        setErrorTipoEquipo(false)

        setFormStep((cur) => cur + 1);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setTipoEquipo([]);
      }

    } else if (formStep === 2) {    // ------------------------ Validacion Departamento Lista
      console.log("Formulario 2", formStep)

      setFormStep((cur) => cur + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setTipoEquipo([]);
    }
  };

  const backBtn = () => {
    setFormStep((cur) => cur - 1);
  };

  const fetchData = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    const url = "https://photo-mangyver.herokuapp.com/api/v1/photos";
    data.append("image", files[0]);

    axios.post(url, data).then((res) => {
      const response = res.data.url;
      setPhotoPath(response);
    });
  };

  const submitForm = () => {
    if (data?.cardTypeId === null) {
      setLeyendaTarjetaTipo("Campo requerido");
      setErrorTarjetaTipo(true);

    } else if (data?.cardTitle === null) {
      setLeyendaTarjetaTipo("");
      setErrorTarjetaTipo(false);
      setLeyendaTituloCorto("Campo requerido");
      setErrorTituloCorto(true);

    } else if (data?.priorityId === null) {
      setLeyendaTituloCorto("");
      setErrorTituloCorto(false);
      setLeyendaPrioridadValue("Campo requerido");
      setErrorPrioridadValue(true);

    } else if (data?.failureTypeId === null) {
      setLeyendaPrioridadValue("");
      setErrorPrioridadValue(false);
      setLeyendaTipoFallaValue("Campo requerido");
      setErrorTipoFallaValue(true);

    } else if (data?.cardDescription === null) {
      setLeyendaTipoFallaValue("");
      setErrorTipoFallaValue(false);
      setLeyendaDescripcionTarjeta("Campo requerido");
      setErrorDescripcionTarjeta(true);

    } else {
      axios
      .post("/notices", data, {
        headers: { auth: localStorage.getItem("token") },
      })
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
    }

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
    if (formStep < 0) {
      return (
        <Button style={gnrStyle} variant="outlined" disabled>
          Atras
        </Button>
      );
    } else if (formStep > 3) {
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
    if (formStep > 2) {
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
          onClick={completeFormStep}
          variant="contained"
          disabled={disButton}
        >
          Siguiente
        </Button>
      );
    }
  };

  const handleListItemClick = (event, index) => {
    setTipoEquipoValue(index.id);
    setGroupCode(index.groupCode);
    setKeyword(index.name)  //  -------- Para que llenar el campo Equipo (Solo es de prueba) - Yefri.
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await axios
      .get("/areas", { headers: { auth: localStorage.getItem("token") } })
      .then((response) => {
        setDepartamento(response.data);
      });
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (departamentoValue !== 0) {
      await axios
        .get("/lines", {
          params: {
            areaId: departamentoValue,
          },
          headers: { auth: localStorage.getItem("token") },
        })
        .then((response) => {
          setLines(response.data);
          setLoading(false);
        });
    }
  }, [departamentoValue]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (lineValue !== 0) {
      setLoading(true);
      await axios
        .get("/machines", {
          params: {
            lineId: lineValue,
          },
          headers: { auth: localStorage.getItem("token") },
        })
        .then((response) => {
          setTipoEquipo(response.data);
          setLoading(false);
        });
    }
  }, [lineValue]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (groupCode !== "") {
      await axios
        .get("/objects", {
          params: {
            groupCode: groupCode,
          },
          headers: { auth: localStorage.getItem("token") },
        })
        .then((response) => {
          setObjeto(response.data);
        });
      await axios
        .get("/causes", {
          params: {
            groupCode: groupCode,
          },
          headers: { auth: localStorage.getItem("token") },
        })
        .then((response) => {
          setCausa(response.data);
        });
      await axios
        .get("/symptoms", {
          params: {
            groupCode: groupCode,
          },
          headers: { auth: localStorage.getItem("token") },
        })
        .then((response) => {
          setSintoma(response.data);
        });
    }
  }, [groupCode]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (formStep === 3) {
      setLoading(true);
      await axios
        .get("/cards", {
          params: {
            process: noticeType.processId,
          },
          headers: { auth: localStorage.getItem("token") },
        })
        .then((response) => {
          setTarjetaTipo(response.data);
        });
      await axios
        .get("/priorities", {
          headers: { auth: localStorage.getItem("token") },
        })
        .then((response) => {
          setPrioridad(response.data);
        });
      await axios
        .get("/type-fails", {
          headers: { auth: localStorage.getItem("token") },
        })
        .then((response) => {
          setTipoFalla(response.data);
        });
      await axios
        .get("/affects", {
          headers: { auth: localStorage.getItem("token") },
        })
        .then((response) => {
          setAfecta(response.data);
          setLoading(false);
        });
      await axios
        .get("/responsables", {
          headers: { auth: localStorage.getItem("token") },
        })
        .then((response) => {
          setResponsable(response.data);
        });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formStep]);

  const backHome = () => {
    window.location.reload();
  };

  const renderCodigoEquipo = () => {
    if (departamentoValue !== "") {
      return (
        <div style={gnrStyle}>
          <Typography>SubArea *</Typography>
          <Select
            id="tipoEquipo"
            variant="outlined"
            fullWidth
            required
            error={errorLineValue}
            helperText={leyendaLineValue}
            size="small"
            style={gnrStyle}
            value={lineValue}
            onChange={(e) => {
              setLineValue(e.target.value)
              if (e.target.value !== "null") {
                setErrorLineValue(false);
                setLeyendaLineValue("")
              }
            }}
          //TODO: setear el parametro para recibir lineas por lineas
          >
            {lines.map((elemento) => (
              <MenuItem key={elemento.id} value={elemento.id}>
                {elemento.name}
              </MenuItem>
            ))}
          </Select>
          {leyendaLineValue ? <span style={{ color: "#d32f2f", fontSize: "14px" }} >Campo Requerido</span> : null}

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
                  error={errorTipoEquipo}
                  helperText={leyendaTipoEquipo}
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value)
                    if (e.target.value !== null) {
                      setErrorTipoEquipo(false);
                      setLeyendaTipoEquipo("")
                    }
                  }}
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
                    item.name.toLowerCase().includes(keyword.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((item) => (
                  <ListItemButton
                    dense
                    divider
                    key={item.id}
                    disableGutters
                    selected={tipoEquipoValue === item.id}
                    onClick={(event) => handleListItemClick(event, item)}
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

  useEffect(() => {
    if (failureTimes !== "") {
      setDisButton(false);
    } else {
      setDisButton(true);
    }
  }, [failureTimes]);

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
          <section style={formStep === 0 ? {} : { display: "none" }} id="9">
            <Typography align="left" variant="h5">
              Duración de la falla
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              onChange={(e) => setFailureTimes(e.target.value)}
              value={failureTimes}
              size="small"
              required
              style={gnrStyle}
              inputProps={{ min: 15 }}
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
            <Select
              id="departamento"
              variant="outlined"
              fullWidth
              required
              value={departamentoValue}
              error={errorDepartment}
              onChange={(e) => {
                setDepartamentoValue(e.target.value)
                if (e.target.value !== "null") {
                  setErrorDepartment(false);
                  setLeyendaDepartment("")
                }
              }}
              size="small"
              style={gnrStyle}
            >
              {departamento.map((elemento) => (
                <MenuItem key={elemento.id} value={elemento.id}>
                  {elemento.name}
                </MenuItem>
              ))}
            </Select>
            {leyendaDepartment ? <span style={{ color: "#d32f2f", fontSize: "14px" }} >Campo Requerido</span> : null}
            {renderCodigoEquipo()}
          </section>
        )}
        {formStep >= 2 && (
          <section style={formStep === 2 ? {} : { display: "none" }} id="6">
            <Typography>Parte Objeto | Componente dañado</Typography>
            <Select
              id="Linea"
              variant="outlined"
              fullWidth
              required
              size="small"
              style={gnrStyle}
              value={objetoValue}
              onChange={(e) => setObjetoValue(e.target.value)}
            >
              {objeto.map((elemento) => (
                <MenuItem key={elemento.id} value={elemento.id}>
                  {elemento.name}
                </MenuItem>
              ))}
            </Select>
            <Typography>Sintoma avería</Typography>
            <Select
              id="Linea"
              variant="outlined"
              fullWidth
              required
              size="small"
              style={gnrStyle}
              value={sintomaValue}
              onChange={(e) => setSintomaValue(e.target.value)}
            >
              {sintoma.map((elemento) => (
                <MenuItem key={elemento.id} value={elemento.id}>
                  {elemento.name}
                </MenuItem>
              ))}
            </Select>
            <Typography>Texto sintoma</Typography>
            <TextField
              id="tarjetaTitulo"
              variant="outlined"
              fullWidth
              style={gnrStyle}
              required
              size="small"
              value={txtSintoma}
              onChange={(e) => setTxtSintoma(e.target.value)}
            ></TextField>
            <Typography>Causa avería</Typography>
            <Select
              id="Linea"
              variant="outlined"
              fullWidth
              required
              size="small"
              style={gnrStyle}
              value={causaValue}
              onChange={(e) => setCausaValue(e.target.value)}
            >
              {causa.map((elemento) => (
                <MenuItem key={elemento.id} value={elemento.id}>
                  {elemento.name}
                </MenuItem>
              ))}
            </Select>
            <Typography>Texto causa</Typography>
            <TextField
              id="tarjetaTitulo"
              variant="outlined"
              fullWidth
              style={gnrStyle}
              required
              size="small"
              value={txtCausa}
              onChange={(e) => setTxtCausa(e.target.value)}
            ></TextField>
          </section>
        )}
        {formStep >= 3 && (
          <section style={formStep === 3 ? {} : { display: "none" }} id="6">
            <Typography style={gnrStyle}>
              {" "}
              Codificacion / Tipo de tarjeta *{" "}
            </Typography>
            <Select
              id="tarjetaTipo"
              variant="outlined"
              fullWidth
              required
              error={errorTarjetaTipo}
              helperText={leyendaTarjetaTipo}
              size="small"
              style={gnrStyle}
              value={tarjetaTipoValue}
              onChange={(e) => {
                setTarjetaTipoValue(e.target.value)
                if (e.target.value !== "null") {
                  setErrorTarjetaTipo(false);
                  setLeyendaTarjetaTipo("")
                }
              }}
            >
              {tarjetaTipo.map((elemento) => (
                <MenuItem key={elemento.id} value={elemento.id}>
                  {elemento.name}
                </MenuItem>
              ))}
            </Select>
            {leyendaTarjetaTipo ? <span style={{ color: "#d32f2f", fontSize: "14px" }} >Campo Requerido</span> : null}

            <Typography style={gnrStyle}>
              Texto corto del aviso / Titulo de la tarjeta *
            </Typography>
            <TextField
              id="tarjetaTitulo"
              variant="outlined"
              fullWidth
              style={gnrStyle}
              required
              error={errorTituloCorto}
              helperText={leyendaTituloCorto}
              size="small"
              value={tarjetaTitulo}
              onChange={(e) => {
                setTarjetaTitulo(e.target.value)
                if (e.target.value !== "null") {
                  setErrorTituloCorto(false);
                  setLeyendaTituloCorto("")
                }
              }}
            ></TextField>
            <Typography style={gnrStyle}>Prioridad *</Typography>
            <Select
              id="prioridad"
              variant="outlined"
              required
              fullWidth
              error={errorPrioridadValue}
              helperText={leyendaPrioridadValue}
              size="small"
              value={prioridadValue}
              onChange={(e) => {
                setPrioridadValue(e.target.value)
                if (e.target.value !== "null") {
                  setErrorPrioridadValue(false);
                  setLeyendaPrioridadValue("")
                }
              }}
              style={gnrStyle}
            >
              {prioridad.map((elemento) => (
                <MenuItem key={elemento.id} value={elemento.id}>
                  {elemento.name}
                </MenuItem>
              ))}
            </Select>
            {leyendaPrioridadValue ? <span style={{ color: "#d32f2f", fontSize: "14px" }} >Campo Requerido</span> : null}

            <Typography style={gnrStyle}>Grupo planificador *</Typography>
            <Select
              id="tipoFalla"
              variant="outlined"
              fullWidth
              size="small"
              error={errorTipoFallaValue}
              helperText={leyendaTipoFallaValue}
              required
              style={gnrStyle}
              value={tipoFallaValue}
              onChange={(e) => {
                setTipoFallaValue(e.target.value)
                if (e.target.value !== "null") {
                  setLeyendaTipoFallaValue("");
                  setErrorTipoFallaValue(false);
                }
              }}
            >
              {tipoFalla.map((elemento) => (
                <MenuItem key={elemento.id} value={elemento.id}>
                  {elemento.name}
                </MenuItem>
              ))}
            </Select>
            {leyendaTipoFallaValue ? <span style={{ color: "#d32f2f", fontSize: "14px" }} >Campo Requerido</span> : null}

            <Typography style={gnrStyle}>Responsable</Typography>
            <Select
              id="responsable"
              variant="outlined"
              fullWidth
              size="small"
              required
              style={gnrStyle}
              value={responsableValue}
              onChange={(e) => setResponsableValue(e.target.value)}
            >
              {responsable.map((elemento) => (
                <MenuItem key={elemento.id} value={elemento.id}>
                  {elemento.name}
                </MenuItem>
              ))}
            </Select>
            <Typography style={gnrStyle}>
              Descripción del aviso / Descripción de la tarjeta *
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              style={gnrStyle}
              multiline
              error={errorDescripcionTarjeta}
              helperText={leyendaDescripcionTarjeta}
              rows="6"
              id={descripcionTarjeta}
              value={descripcionTarjeta}
              onChange={(e) => {
                setDescripcionTarjeta(e.target.value)
                if (e.target.value !== "null") {
                  setErrorDescripcionTarjeta(false);
                  setLeyendaDescripcionTarjeta("")
                }
              }}
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
            <Typography style={{ fontSize: "20px", padding: "10px" }}>
              Foto
            </Typography>
            <div
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                border: "solid #bababa 1px",
                borderRadius: "5px",
              }}
            >
              <form>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <input accept="image/*" type="file" onChange={fetchData} />
                  <Button accept="image/*" type="reset" color="error">
                    <CancelIcon style={{ fontSize: "20px" }} />
                  </Button>
                </div>
              </form>
            </div>
            <Typography style={{ fontSize: "20px", padding: "10px" }}>
              Video
            </Typography>
            <div
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                border: "solid #bababa 1px",
                borderRadius: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <input accept="image/*" type="file" disabled />
                <Button accept="image/*" disabled color="error">
                  <CancelIcon style={{ fontSize: "20px" }} />
                </Button>
              </div>
            </div>
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

export default Step2;
