import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Select,
  Button,
  MenuItem,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../axiosinstance";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";

const Step3 = () => {
  const noticeType = useSelector((state) => state.notice.noticeType);
  const [formStep, setFormStep] = useState(0);
  const [nOt, setNOt] = useState(null);
  const [tarjetaTipoValue, setTarjetaTipoValue] = useState(null);
  const [tarjetaTitulo, setTarjetaTitulo] = useState(null);
  const [prioridadValue, setPrioridadValue] = useState(null);

  const [tipoFallaValue, setTipoFallaValue] = useState(null);
  const [descripcionTarjeta, setDescripcionTarjeta] = useState(null);
  const [afectaValue, setAfectaValue] = useState(null);

  const [tarjetaTipo, setTarjetaTipo] = useState([]);

  const [prioridad, setPrioridad] = useState([]);
  const [tipoFalla, setTipoFalla] = useState([]);
  const [afecta, setAfecta] = useState([]);
  const [responsable, setResponsable] = useState([]);
  const [responsableValue, setResponsableValue] = useState("");

  const [photoPath, setPhotoPath] = useState("");

  const [disButton, setDisButton] = useState(true);

  const history = useHistory();

  const data = {
    processId: noticeType.processId,
    otCode: nOt,
    cardTypeId: tarjetaTipoValue,
    cardTitle: tarjetaTitulo,
    priorityId: prioridadValue,
    failureTypeId: tipoFallaValue,
    cardDescription: descripcionTarjeta,
    affectsId: afectaValue,
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

  const fetchData = (e) => {
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
    } else if (formStep > 1) {
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
    if (formStep > 1) {
      return undefined;
    } else if (formStep === 1) {
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
          variant="contained"
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
      });
    await axios
      .get("/responsables", {
        headers: { auth: localStorage.getItem("token") },
      })
      .then((response) => {
        setResponsable(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/cards", {
        params: {
          process: noticeType.processId,
        },
        headers: { auth: localStorage.getItem("token") },
      })
      .then((response) => {
        setTarjetaTipo(response.data);
      }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nOt]);

  useEffect(() => {
    if (nOt !== "") {
      setDisButton(false);
    } else {
      setDisButton(true);
    }
  }, [nOt]);

  const backHome = () => {
    window.location.reload();
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
            <Typography style={gnrStyle}>
              Codificacion / Tipo de tarjeta{" "}
            </Typography>
            <Select
              id="departamento"
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

export default Step3;
