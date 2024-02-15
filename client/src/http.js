import axios from "axios";
import router from "./router";
const instance= axios.create({
  baseURL: "http://localhost:8089/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 5000,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (e) => {
    alert(e.response.data.message??e.response.data??'error')
    if(e.response.status=="401"){
      router.push("/")
    }
    return Promise.reject(e)
  }
);
export default instance