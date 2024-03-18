const chat_room = require("../../controllers/chat_room.controller.js");
module.exports = (router, jwt_verify) => {
  router.post("/chat_room", jwt_verify, chat_room.get_room_list);
  router.post("/chat_room_creation", jwt_verify, chat_room.create_chatroom);
  router.post("/chat_room_edition", jwt_verify, chat_room.edit_chatroom);
  router.put("/chat_room", jwt_verify, chat_room.remove_chatroom);
  return;
};
