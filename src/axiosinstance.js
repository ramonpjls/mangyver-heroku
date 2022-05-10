import axios from "axios";

const instace = axios.create({
  // baseURL: "https://mazappsupply.ab-inbev.com/mangyver-back",
  baseURL: "https://sta-mangyver.herokuapp.com/api/v1",
  // baseURL: "https://mangyver-back.azurewebsites.net/api/v1",
});

instace.defaults.headers.common["auth"] = localStorage.token;

export default instace;
