import axios from "axios";

const instace = axios.create({
  baseURL: "http://172.18.220.66:8001/api/v1",
});

instace.defaults.headers.common["auth"] = localStorage.token;

export default instace;
