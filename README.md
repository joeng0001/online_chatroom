#Start
under /server
"npm install"
"node server.js"

#Config Mysql
/server/app/config/db.config.js

#Apply Mysql
in server.js,uncomment
//const db = require("./app/models");
//db.sequelize.sync();
