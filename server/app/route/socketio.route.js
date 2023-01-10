const user_control = require("../controllers/user.controller.js");
module.exports = io => {
    io.on('connection', (socket) => {
        console.log("some one connect")
        socket.on('message', (msg) => {
            io.emit('message', msg)
        });
        socket.on('user_online', (data) => {
            try {
                data.online = true;
                user_control.update_user(data, socket);
                io.emit('user_online', data) //socket used for sending error
            } catch (e) {
                socket.emit('error', e)
            }
        });
    })

};