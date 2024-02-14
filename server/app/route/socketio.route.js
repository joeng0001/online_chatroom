const user_control = require("../controllers/user.controller.js");
const jwt_config = require('../config/jwt.config.js')
module.exports = io => {
    io.on('connection', (socket) => {
        console.log("some one connect")
        socket.on('message', (msg) => {
            io.emit('message', msg)
        });
        socket.on('user_online', (data) => {
            try {
                if (!data.jwt||jwt.verify(data.jwt, jwt_config.jwtSecret)) {
                    res.status(401).send({ message: "jwt verification failed" })
                    return
                }
                data.online = true;
                user_control.update_user(data, socket);
                io.emit('user_online', data) 
            } catch (e) {
                socket.emit('error', e)
            }
        });
    })

};