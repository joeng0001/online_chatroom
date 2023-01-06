const db = require("../models");
const db_user = db.user;
exports.findall_user =async (req,res) =>{
    await db_user.findAll()
        .then((i)=>{
            i=i.map(i=>i.dataValues);
            res.send(i);
        })
        .catch(err => {
            res.status(500).send({
                message: err
              });
        });
    
 }

exports.update_user =async (user,socket) =>{
    //console.log("socket is ")
    //console.log(socket)
    await db_user.update({ online: user.online }, {
        where: {
           id: user.online
        }
      })
        .catch(err => {
            console.log("error in update user")
            socket.emit('error',err)
        });
    
 }
