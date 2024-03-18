const register = require("../../controllers/registration.controller.js");
module.exports = (router, jwt_verify) => {
  router.post("/register", register.create_user);
  return;
};
