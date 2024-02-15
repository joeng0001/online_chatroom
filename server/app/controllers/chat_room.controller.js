const {db} = require("../models");
const Chat_Room = db.chat_room;

exports.get_room_list = async (req, res) => {
  await Chat_Room.findAll()
    .then((record) => {
      record = record.map((i) => i.dataValues);
      res.send(record);
    })
    .catch((err) => {
      res.status(500).json({message:'server error,fail to get chatroom info'});
    });
};
exports.create_chatroom = async (req, res) => {
  const {room_name,room_admin,active_status}=req.body
  if(!room_name||!room_admin||!active_status){
    res.status(400).json({message:'bad request info'});
    return
  }

  await Chat_Room.create(req.body)
    .then(() => {
      res.send({ message: "success" });
    })
    .catch((err) => {
      res.status(500).json({message:'server error,fail to create chatroom'});
    });
};
exports.edit_chatroom = async (req, res) => {
  await Chat_Room.update(req.body, { where: { id: req.body.id } })
    .then(() => {
      res.send({ message: "success" });
    })
    .catch((err) => {
      res.status(500).json({message:'server error,fail to update chatroom info'});
    });
};

exports.remove_chatroom = async (req, res) => {
  await Chat_Room.destroy({
    where: { id: req.body.room_id },
  })
    .then(() => {
      res.send({ message: "successfully removed" });
    })
    .catch((err) => {
      res.status(500).json({message:'server error,fail to remove chatroom'});
    });
};
