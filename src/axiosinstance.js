import axios from "axios";

const instace = axios.create({
<<<<<<< HEAD
  baseURL: "https://mangyver.herokuapp.com/api/v1",
=======
  baseURL: "http://172.18.220.65:8001/api/v1",
>>>>>>> master
});

instace.defaults.headers.common["auth"] = localStorage.token;

export default instace;
