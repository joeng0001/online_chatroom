const db = require("../models");
const db_user = db.user;
const io_obj = require("../../server")
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

exports.update_user = async (user) => {
    //console.log("socket is ")
    //console.log(socket)
    await db_user.update({ online: user.online }, {
        where: {
            id: user.id
        }
    })
        .catch(err => {
            console.log("error in update user")
        });

}
exports.edit_user = async (req, res) => {
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

exports.user_offline = async (req, res) => {
    await db_user.findOne({
        where: {
            id: req.body.id
        }
    })
        .then(async (target_user) => {
            await db_user.update({ curr_online_account: target_user.curr_online_account - 1 }, {
                where: {
                    id: req.body.id
                }
            })
            return target_user
        })
        .then(async (target_user) => {
            delete target_user.password;
            if (target_user.curr_online_account - 1 === 0) {
                target_user.online = false;
                await db_user.update({ online: false }, {
                    where: {
                        id: target_user.id
                    }
                })
                console.log("emiting offline message", target_user)
                io_obj.io.emit("user_offline", target_user)
            }
        })
        .then(() => {
            res.send({ message: "success" })
        })
        .catch(err => {
            res.status(500).send({
                message: err
            });
        });
};