const login_service = require("../../controllers/login.controller.js");
module.exports = (router, jwt_verify) => {
  router.put("/login", jwt_verify, login_service.add_online_account);
  router.post("/login", login_service.login);
  return;
};
