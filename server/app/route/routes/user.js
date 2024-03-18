const user = require("../../controllers/user.controller.js");
module.exports = (router, jwt_verify) => {
  router.post("/get_users", user.findall_user);
  router.post("/user", jwt_verify, user.delete_user);
  router.put("/user", jwt_verify, user.user_offline);
  router.post("/user_edition", jwt_verify, user.edit_user);
  return;
};
