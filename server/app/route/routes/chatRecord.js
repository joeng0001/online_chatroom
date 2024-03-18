const chat_record = require("../../controllers/chat_record.controller.js");
module.exports = (router, jwt_verify) => {
  router.put("/chat_record", jwt_verify, chat_record.get_chat_record);
  router.put(
    "/chat_record_deletion",
    jwt_verify,
    chat_record.delete_chat_record
  );
  router.post("/chat_record", jwt_verify, chat_record.create_chat_record);
  return;
};
