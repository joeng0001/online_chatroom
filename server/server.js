const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { connectDB } = require("./app/models"); // init db
connectDB().then(() => {
  const router = require("./app/route/router.route.js");
  app.use("/", router);
  require("./app/route/socketio.route.js")(io);
});

const path = require("path");
const indexPath = path.join(__dirname, "../client/dist/index.html");
app.use(express.static("../client/dist"));
app.get("*", (req, res) => {
  res.sendFile(indexPath);
});

const PORT = 8089;
http.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});

exports.io = io;
