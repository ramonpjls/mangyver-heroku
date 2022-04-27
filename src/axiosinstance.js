import axios from "axios";

const instace = axios.create({
  baseURL: "https://mangyver-back.azurewebsites.net/api/v1",
});

instace.defaults.headers.common["auth"] = localStorage.token;

export default instace;
