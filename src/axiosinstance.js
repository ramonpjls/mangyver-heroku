import axios from "axios";

const instace = axios.create({
  baseURL: "https://sta-mangyver.herokuapp.com/api/v1",
  // headers: { "Content-Type": "application/json" },
});

instace.defaults.headers.common["auth"] = localStorage.token;
// instace.defaults.headers.common["Authorization"] = localStorage.token;

export default instace;
