const {db} = require("../models");
const user=db.user

exports.create_user = async (req, res) => {
  //find duplicate
  await user
    .findOne({
      where: {
        name: req.body.name,
      },
    })
    .then(async (match) => {
      //if user found,the account have been used
      if (match) {
        res.status(409).json({message:'user existed,try other'});
        return
      } else {
        const new_user = {
          name: req.body.name,
          password: req.body.password,
          online: true,
          active_status: true,
          curr_online_account: 0,
        };
        await user.create(new_user).then(() => {
          res.send({ message: "ok" });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({message:'server error,fail to register'});
    });
};
