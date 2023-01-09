const db = require("../models");
const db_user = db.user;
exports.findall_user = async (req, res) => {
    await db_user.findAll()
        .then((user) => {
            user = user.map(user => user.dataValues);
            user.forEach((obj) => {
                delete obj.password;
            });
            res.send(user);
        })
        .catch(err => {
            res.status(500).send({
                message: err
            });
        });

}

exports.update_user = async (user, socket) => {
    //console.log("socket is ")
    //console.log(socket)
    await db_user.update({ online: user.online }, {
        where: {
            id: user.id
        }
    })
        .catch(err => {
            console.log("error in update user")
            socket.emit('error', err)
        });

}
exports.edit_user = async (req, res) => {
    console.log(req.body)
    await db_user.update({ ...(req.body) }, {
        where: {
            id: req.body.id
        }
    })
        .then(() => {
            res.send({ message: "success" })
        })
        .catch(err => {
            update
            res.status(500).send({
                message: err
            });
        });

}

exports.delete_user = async (req, res) => {
    await db_user.destroy({
        where: { id: req.body.id },
    })
        .then(() => {
            res.send({ message: "chat record successfully delete" });
        })
        .catch(err => {
            res.status(500).send({
                message: err
            });
        });
};