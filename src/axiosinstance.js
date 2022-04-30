import axios from "axios";

const instace = axios.create({
  baseURL: "https://mazappsupply.ab-inbev.com/mangyver-back",
});

instace.defaults.headers.common["auth"] = localStorage.token;

export default instace;
