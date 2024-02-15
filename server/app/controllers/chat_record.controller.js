const {db} = require("../models");
const Chat_record = db.chat_record;
const { Op } = require("sequelize");
exports.get_chat_record = async (req, res) => {
  await Chat_record.findAll(
      {
        where: {
          room_id: req.body.room_id === -1 ?{
            [Op.gt]: 0 
          }:req.body.room_id
        }
      }
  )
    .then((record) => {
      record = record.map(i => i.dataValues);
      res.send(record);
    })
    .catch(err => {
      res.status(500).json({message:'server error,fail to get rchat record'});
    });
};

exports.create_chat_record = async (req, res) => {
  await Chat_record.create(req.body)
    .then(() => {
      res.send({ message: "success" })
    })
    .catch(err => {
      res.status(500).json({message:'server error,fail to create chat record'});
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
      res.status(500).json({message:'server error,fail to delete chat record'});
    });
};