const db = require("../models");
const user = db.user;
const jwt = require('jsonwebtoken')
const jwt_config = require('../config/jwt.config.js')
function jwtSignUser(user) {
  const week = 60 * 60 * 24 * 7;
  return jwt.sign(user, jwt_config.jwtSecret, {
    expiresIn: week
  })
}


exports.login = async (req, res) => {
  await user.findOne({
    where: {
      name: req.body.name
    }
  })
    .then(async (target_user) => {
      const valid = await target_user.comparePassword(req.body.password)
      if (!valid) {
        console.log("throwing error in the server side ")
        throw "password not correct"
      }
      await user.update({ curr_online_account: target_user.curr_online_account + 1 }, {
        where: {
          id: target_user.id
        }
      })
      return target_user
    })
    .then((target_user) => {
      res.send({
        user_id: target_user.dataValues.id,
        user_name: target_user.dataValues.name,
        token: jwtSignUser(target_user.toJSON())
      });
      console.log("you are in in thwe server side")
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500, {
        message: err
      });
    });
};