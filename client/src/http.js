import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:8089/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 500,
});
