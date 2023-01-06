module.exports = app => {
  const test_get_file = require("../controllers/test_get.controller.js");
  const chat_record = require("../controllers/chat_record.controller.js");
  const user = require("../controllers/user.controller.js");
  const chat_room = require("../controllers/chat_room.controller.js");
  const login_service = require("../controllers/login.controller.js")
  const register = require("../controllers/registration.controller.js")
  var router = require("express").Router();
  router.put("/chat_record", chat_record.get_chat_record);
  router.post("/chat_record", chat_record.create_chat_record);
  router.get("/user", user.findall_user);
  router.get("/chat_room", chat_room.get_room_list);
  router.post("/login", login_service.login)
  router.post("/register", register.create_user)
  router.post("/chat_room_creation", chat_room.create_chatroom)
  router.post("/chat_room_edition", chat_room.edit_chatroom)
  router.put("/chat_room", chat_room.remove_chatroom)
  app.use('/', router);
};