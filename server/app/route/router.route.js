const jwt = require('jsonwebtoken')


module.exports = app => {
  const chat_record = require("../controllers/chat_record.controller.js");
  const user = require("../controllers/user.controller.js");
  const chat_room = require("../controllers/chat_room.controller.js");
  const login_service = require("../controllers/login.controller.js")
  const register = require("../controllers/registration.controller.js")
  const jwt_config = require('../config/jwt.config.js')
  const jwt_verify = (req, res, next) => {
    if (!jwt.verify(req.body.jwt, jwt_config.jwtSecret)) {
      res.send({ message: "jwt verification failed" })
      return
    } else {
      next()
    }
  }
  var router = require("express").Router();
  router.put("/chat_record", jwt_verify, chat_record.get_chat_record);
  router.put("/chat_record_deletion", jwt_verify, chat_record.delete_chat_record);
  router.post("/chat_record", jwt_verify, chat_record.create_chat_record);
  router.get("/user", user.findall_user);
  router.post("/user", jwt_verify, user.delete_user);
  router.put("/user", jwt_verify, user.user_offline)
  router.put("/login", jwt_verify, login_service.add_online_account)
  router.post("/user_edition", jwt_verify, user.edit_user);
  router.post("/chat_room", jwt_verify, chat_room.get_room_list);
  router.post("/login", login_service.login)
  router.post("/register", register.create_user)
  router.post("/chat_room_creation", jwt_verify, chat_room.create_chatroom)
  router.post("/chat_room_edition", jwt_verify, chat_room.edit_chatroom)
  router.put("/chat_room", jwt_verify, chat_room.remove_chatroom)
  app.use('/', router);
};