const jwt = require("jsonwebtoken");
const jwt_config = require("../config/jwt.config.js");
const jwt_verify = (req, res, next) => {
  if (!req.body.jwt || !jwt.verify(req.body.jwt, jwt_config.jwtSecret)) {
    res.status(401).json({ message: "authentication failures" });
    return;
  } else {
    next();
  }
};

var router = require("express").Router();

require("./routes/chatRecord.js")(router, jwt_verify);
require("./routes/chatRoom.js")(router, jwt_verify);
require("./routes/loginService.js")(router, jwt_verify);
require("./routes/register.js")(router, jwt_verify);
require("./routes/user.js")(router, jwt_verify);
module.exports = router;
