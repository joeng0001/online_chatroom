const express=require("express");
const cors=require("cors");
const bodyParser = require("body-parser");
const app=express();
const http=require('http').Server(app)
const io=require('socket.io')(http,{
    cors: {
      origin: "*",
    }
  })
var corsOptions={
    //origin:"http://10.0.2.15:8088" 
    origin:"*" //set this to * and url to 127.0.0.1 ,both window and ubuntu can connect
};
app.use (cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./app/models");
db.sequelize.sync();
require("./app/route/router.route.js")(app);
require("./app/route/socketio.route.js")(io);

const PORT = 8089;
http.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
})
