const db = require("../models");
const user = db.user;

exports.create_user = async (req, res) => {
    //console.log("socket is ")
    console.log("register receive user ", req.body)
    //find duplicate
    await user.findOne({
        where: {
            name: req.body.name
        }
    })
        .then(() => {
            console.log(req.body)
        })
        .then(async (match) => { //if user found,the account have been used
            if (match) {
                throw "account already in use"
            }
            console.log("before create,this is body\n", req.body)
            const new_user = {
                name: req.body.name,
                password: req.body.password
            }
            await user.create(new_user)
                .then(() => {
                    res.send({ message: "ok" })
                })
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500, {
                message: err
            });
        })

}