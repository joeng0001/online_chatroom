const {db} = require("../models");
const Chat_record = db.chat_record;
const { Op } = require("sequelize");
exports.get_chat_record = async (req, res) => {
  console.log(req.body.room_id);
  console.log(req.body.room_id === -1);
  await Chat_record.findAll(
    (req.body.room_id === -1 ?

      {
        where: {
          room_id: {
            [Op.gt]: 0 // all id >0 => find all record
          }
        }
      } :
      {
        where: {
          room_id: req.body.room_id //find by room id
        }
      }
    )
  )
    .then((record) => {
      record = record.map(i => i.dataValues);
      res.send(record);
    })
    .catch(err => {
      res.status(500).send({
        message: "fail to get records"
      });
    });
};

exports.create_chat_record = async (req, res) => {
  console.log("creating chat_record with req.body", req.body)
  await Chat_record.create(req.body)
    .then(() => {
      //io.emit({message:"you got the socket message"})
      res.send({ message: "success" })
    })
    .catch(err => {
      res.status(500).send({
        message: "fail to insert record"
      });
    });
};

exports.delete_chat_record = async (req, res) => {
  await Chat_record.destroy({
    where: { id: req.body.id },
  })
    .then(() => {
      res.send({ message: "Chat record successfully delete" });
    })
    .catch(err => {
      res.status(500).send({
        message: "fail to delete record"
      });
    });
};