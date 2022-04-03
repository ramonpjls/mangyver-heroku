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
  const [tipoEquipoValue, setTipoEquipoValue] = useState("");

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

  const [componente, setComponente] = useState([]);
  const [prioridad, setPrioridad] = useState([]);
  const [tipoFalla, setTipoFalla] = useState([]);
  const [afecta, setAfecta] = useState([]);

  const [disButton, setDisButton] = useState(true);

  const [keyword, setKeyword] = useState("");

  const [loading, setLoading] = useState(false);

  const [photoPath, setPhotoPath] = useState({});

  const [objetoValue, setObjetoValue] = useState("");
  const [causaValue, setCausaValue] = useState("");
  const [sintomaValue, setSintomaValue] = useState("");
  const [objeto, setObjeto] = useState([]);
  const [causa, setCausa] = useState([]);
  const [sintoma, setSintoma] = useState([]);
  const [txtCausa, setTxtCausa] = useState("");
  const [txtSintoma, setTxtSintoma] = useState("");
  const [groupCode, setGroupCode] = useState("");

  const history = useHistory();

  const data = {
    processId: noticeType.processId,
    failureTime: failureTimes,
    departmentId: departamentoValue,
    lineId: lineValue,
    equipmentId: tipoEquipoValue,
    cardTypeId: tarjetaTipoValue,
    cardTitle: tarjetaTitulo,
    priorityId: prioridadValue,
    componentsId: componenteValue,
    breakdownId: causaAveriaValue,
    failureTypeId: tipoFallaValue,
    cardDescription: descripcionTarjeta,
    affectsId: afectaValue,
    objectId: objetoValue,
    causeId: causaValue,
    symptomId: sintomaValue,
    textCause: txtCausa,
    textSymptom: txtSintoma,
    urlPhoto: photoPath,
  };

  const completeFormStep = () => {
    setFormStep((cur) => cur + 1);
    setTipoEquipo([]);
    setSintoma([]);
    setCausa([]);
    setObjeto([]);
  };

  const backBtn = () => {
    setFormStep((cur) => cur - 1);
  };

  const fetchData = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    const url = "https://photo-mangyver.herokuapp.com/api/v1/photos";
    data.append("image", files[0]);

    await axios.post(url, data).then((res) => {
      setPhotoPath(res?.data);
    });
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
    if (formStep === 0) {
      return (
        <Button style={gnrStyle} variant="outlined" disabled>
          Atras
        </Button>
      );
    } else if (formStep > 2) {
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
      return undefined;
    } else if (formStep === 2) {
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
  };

  //TODO: setear el parametro para recibir lineas por machines

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (formStep === 2) {
      setLoading(true);
      await axios
        .get("/cards", {
          params: {
            process: noticeType.processId,
          },
        })
        .then((response) => {
          setTarjetaTipo(response.data);
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
        setLoading(false);
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formStep]);

  useEffect(() => {
    if (departamentoValue !== 0) {
      axios
        .get("/lines", {
          params: {
            areaId: departamentoValue,
          },
        })
        .then((response) => {
          setLines(response.data);
          setLoading(false);
        });
    }
  }, [departamentoValue]);

  useEffect(() => {
    if (lineValue !== 0) {
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
    }
  }, [lineValue]);

  const backHome = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (formStep === 0)
      axios.get("/areas").then((response) => {
        setDepartamento(response.data);
      });
  }, [formStep]);

  useEffect(() => {
    if (groupCode !== "")
      axios
        .get("/objects", {
          params: {
            groupCode: groupCode,
          },
        })
        .then((response) => {
          setObjeto(response.data);
        });
    axios
      .get("/causes", {
        params: {
          groupCode: groupCode,
        },
      })
      .then((response) => {
        setCausa(response.data);
      });
    axios
      .get("/symptoms", {
        params: {
          groupCode: groupCode,
        },
      })
      .then((response) => {
        setSintoma(response.data);
      });
  }, [groupCode]);

  const renderCodigoEquipo = () => {
    if (departamentoValue !== "") {
      return (
        <div style={gnrStyle}>
          <Typography>SubArea</Typography>
          <Select
            id="tipoEquipo"
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
            value={setCausaValue}
            onChange={(e) => setCausaAveria(e.target.value)}
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
            onChange={(e) => setTxtCausa(e.target.value)}
          ></TextField>
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
            {renderCodigoEquipo()}
          </section>
        )}
        {formStep >= 2 && (
          <section style={formStep === 2 ? {} : { display: "none" }} id="6">
            <Typography style={gnrStyle}>
              Codificacion / Tipo de tarjeta
            </Typography>
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
            <Typography style={gnrStyle}>
              Texto corto del aviso / Titulo de la tarjeta
            </Typography>
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
            <Typography style={gnrStyle}>
              Descripción del aviso / Descripción de la tarjeta
            </Typography>
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
