import axios from "axios";
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
    console.log("receive response",response)
    return response;
  },
  (e) => {
    console.log("receive error",e)
    alert(e.response.data.message)
    return e
  }
);
export default instance