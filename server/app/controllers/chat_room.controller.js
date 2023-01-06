const db = require("../models");
const Chat_Room = db.chat_room;
exports.get_room_list = async (req, res) => {
  await Chat_Room.findAll()
    .then((record) => {
      console.log(record)
      record = record.map(i => i.dataValues);
      console.log(record)
      res.send(record);
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });
};
exports.create_chatroom = async (req, res) => {
  console.log("receive create room request")
  console.log(req.body)
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
  console.log("received edition request with", req.body)
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
