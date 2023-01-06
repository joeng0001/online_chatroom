import axios from "axios"
export default axios.create({
    //baseURL: "http://127.0.0.1:8089/",  // set which port to send to -> port of server
    baseURL: "http://10.0.2.15:8089/",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
});