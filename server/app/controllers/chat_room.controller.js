const db = require("../models");
const Chat_Room = db.chat_room;


// exports.test_create = async (req, res) => {
//   db.test = require("../models/test.model")(db.sequelize, db.Sequelize, req.body.room_name);
//   db.sequelize.sync();
//   await db.test.create(req.body)
//     .then(() => {
//       res.send({ message: "success" });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: err
//       });
//     });
// };



exports.get_room_list = async (req, res) => {
  await Chat_Room.findAll()
    .then((record) => {
      record = record.map(i => i.dataValues);
      res.send(record);
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });
};
exports.create_chatroom = async (req, res) => {
  await Chat_Room.create(req.body)
    .then(() => {
      res.send({ message: "success" });
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });
};
exports.edit_chatroom = async (req, res) => {
  await Chat_Room.update(req.body, { where: { id: req.body.id } })
    .then(() => {
      res.send({ message: "success" });
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });
};

exports.remove_chatroom = async (req, res) => {
  console.log("receive removing request")
  await Chat_Room.destroy({
    where: { id: req.body.room_id },
  })
    .then(() => {
      res.send({ message: "successfully removed" });
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });
};
