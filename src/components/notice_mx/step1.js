import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Container,
  Typography,
  TextField,
  Select,
  Button,
  MenuItem,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../axiosinstance";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import MachineList from "../elements/machineList";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
  },
}));

const Step1 = () => {
  const noticeType = useSelector((state) => state.notice.noticeType);
  const equipmentId = useSelector((state) => state.machine.machine);
  const groupCode = useSelector((state) => state.groupCode.groupCode);
  const objectId = useSelector((state) => state.object.object);
  const causeId = useSelector((state) => state.cause.cause);
  const symptomId = useSelector((state) => state.symtom.symtom);
  const classes = useStyles();
  const [formStep, setFormStep] = useState(0);
  const [tarjeta, setTarjeta] = useState(null);
  const [failureTimes, setFailureTimes] = useState(null);

  const [departamentoValue, setDepartamentoValue] = useState(0);
  const [lineValue, setLineValue] = useState(0);

  const [tarjetaTipoValue, setTarjetaTipoValue] = useState(null);
  const [tarjetaTitulo, setTarjetaTitulo] = useState(null);
  const [prioridadValue, setPrioridadValue] = useState(null);

  const [tipoFallaValue, setTipoFallaValue] = useState(null);
  const [descripcionTarjeta, setDescripcionTarjeta] = useState(null);
  const [afectaValue, setAfectaValue] = useState(null);

  const [departamento, setDepartamento] = useState([]);
  const [tarjetaTipo, setTarjetaTipo] = useState([]);

  const [prioridad, setPrioridad] = useState([]);
  const [tipoFalla, setTipoFalla] = useState([]);
  const [afecta, setAfecta] = useState([]);
  const [lines, setLines] = useState([]);

  const [disButton, setDisButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const [txtCausa, setTxtCausa] = useState(null);
  const [txtSintoma, setTxtSintoma] = useState(null);
  const [photoPath, setPhotoPath] = useState({});
  const [responsable, setResponsable] = useState([]);
  const [responsableValue, setResponsableValue] = useState("");

  console.log(objectId);

  const history = useHistory();

  const data = {
    processId: noticeType.processId,
    didCard: tarjeta,
    failureTime: failureTimes,
    departmentId: departamentoValue,
    lineId: lineValue,
    equipmentId: equipmentId,
    cardTypeId: tarjetaTipoValue,
    cardTitle: tarjetaTitulo,
    priorityId: prioridadValue,
    failureTypeId: tipoFallaValue,
    cardDescription: descripcionTarjeta,
    affectsId: afectaValue,
    objectId: objectId,
    causeId: causeId,
    symptomId: symptomId,
    textCause: txtCausa,
    textSymptom: txtSintoma,
    urlPhoto: photoPath,
    responsableId: responsableValue,
  };

  const completeFormStep = () => {
    setFormStep((cur) => cur + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fetchData = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    const url = "https://mazappsupply.ab-inbev.com/fotos";
    data.append("image", files[0]);

    axios.post(url, data).then((res) => {
      const response = res.data.url;
      setPhotoPath(response);
    });
  };

  const submitForm = () => {
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
    marginBottom: "2.5rem",
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
          style={btnNxtStyle}
          variant="outlined"
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
          variant="outlined"
          onClick={completeFormStep}
          disabled={disButton}
        >
          Siguiente
        </Button>
      );
    }
  };

  //TODO: setear el parametro para recibir lineas por machines

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
        .get("/responsables", {
          headers: { auth: localStorage.getItem("token") },
        })
        .then((response) => {
          setResponsable(response.data);
        });
      await axios
        .get("/affects", {
          headers: { auth: localStorage.getItem("token") },
        })
        .then((response) => {
          setAfecta(response.data);
          setLoading(false);
        });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formStep]);

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
          placeholder="Duraci??n de falla en minutos"
        ></TextField>
      );
    }
  };

  const backHome = () => {
    window.location.reload();
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
          {lineValue !== 0 ? (
            <MachineList
              param={lineValue}
              endpoint={"machines"}
              tittle={"Equipo"}
              isMachine
              parameters={"lineId"}
            />
          ) : (
            <></>
          )}
        </div>
      );
    }
  };

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
          <section style={formStep === 2 ? {} : { display: "none" }}>
            <MachineList
              param={groupCode}
              endpoint={"objects"}
              tittle={"Parte Objeto | Componente da??ado"}
              type={"OBJECT"}
              parameters={"groupCode"}
            />
            <MachineList
              param={groupCode}
              endpoint={"symptoms"}
              tittle={"sintoma aver??a"}
              type={"SYMTOM"}
              parameters={"groupCode"}
            />
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
            <MachineList
              param={groupCode}
              endpoint={"causes"}
              tittle={"Causa aver??a"}
              type={"CAUSE"}
              parameters={"groupCode"}
            />
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
              Codificacion / Tipo de tarjeta{" "}
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
            <Typography style={gnrStyle}>Responsable / Revision</Typography>
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
              Descripci??n del aviso / Descripci??n de la tarjeta
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
export default Step1;
