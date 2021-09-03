import axios from "axios";

const instace = axios.create({
  baseURL: "https://mangyver.herokuapp.com/api/v1",
});

instace.defaults.headers.common["auth"] = localStorage.token;

export default instace;
