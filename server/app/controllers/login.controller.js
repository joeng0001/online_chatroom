const {db} = require("../models");
const user=db.user
const jwt = require("jsonwebtoken");
const jwt_config = require("../config/jwt.config.js");
function jwtSignUser(user) {
  const one_week = 60 * 60 * 24 * 7;
  return jwt.sign(user, jwt_config.jwtSecret, {
    expiresIn: one_week,
  });
}

exports.login = async (req, res) => {
  await user
    .findOne({
      where: {
        name: req.body.name,
        active_status: true,
      },
    })
    .then(async (target_user) => {
      if(!target_user){
        res.status(404).json({message:'user not found'});
        return
      }
      const valid = await target_user.comparePassword(req.body.password);
      if (!valid) {
        res.status(403).json({message:'incorrect user info'});
        return
      }
      await user.update(
        {
          curr_online_account: target_user.curr_online_account + 1,
          online: true,
        },
        {
          where: {
            id: target_user.id,
          },
        }
      );
      res.send({
        user_id: target_user.dataValues.id,
        user_name: target_user.dataValues.name,
        token: jwtSignUser(target_user.toJSON()),
      });
    })
    .catch((err) => {
      res.status(403).json({message:'incorrect user info'});
    });
};

exports.add_online_account = async (req, res) => {
  await user
    .findOne({
      where: {
        id: req.body.id
      },
    })
    .then(async (target_user) => {
      if(!target_user){
        res.status(404).json({message:'user not found'});
        return
      }
      if(!target_user.active_status){
        res.status(401).json({message:'user being block'});
        return
      }
      await user.update(
        {
          curr_online_account: target_user.curr_online_account + 1,
          online: true,
        },
        {
          where: {
            id: target_user.id,
          },
        }
      );
      res.send({
        message: "success",
      });
    })
    .catch((err) => {
      res.status(409).json({message:'server error,fail to update user online'});
    });
};
