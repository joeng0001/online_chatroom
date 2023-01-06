const db = require("../models");
const Chat_record = db.chat_record;
const Op = db.Sequelize.Op;
const io = require("../../server")
exports.get_chat_record = async (req, res) => {
  console.log("received get chat record request with room_id=", req.body)
  await Chat_record.findAll({
    where: {
      room_id: req.body.room_id
    }
  })
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

exports.create_chat_record = async (req, res) => {
  console.log("creating chat_record with req.body", req.body)
  await Chat_record.create(req.body)
    .then(() => {
      //io.emit({message:"you got the socket message"})
      res.send({ message: "ok" })
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });
};