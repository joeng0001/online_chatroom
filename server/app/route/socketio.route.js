const user_control = require("../controllers/user.controller.js");
module.exports = io => {
    io.on('connection', (socket) => {
        console.log("some one connect")
        socket.on('message', (msg) => {
            io.emit('message', msg)
        });
        //socket.on('user',async ()=>{
        //    io.emit('user',await user.user(socket)) //socket used for sending error
        //});
        socket.on('user_online', (user) => {
            //try{
            user.online = true;
            user_control.update_user(user, socket);
            io.emit('user_online', user) //socket used for sending error
            //}catch(e){
            //    socket.emit('error',e)
            //}
        });
        socket.on('user_offline', (user) => {
            //try{
            user.online = false;
            user_control.update_user(user, socket);
            io.emit('user_offline', user) //socket used for sending error
            //}catch(e){
            //socket.emit('error',e)
            //}
        });
    })
};