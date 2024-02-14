const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


const db = {};
const connectDB=async ()=>{
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  db.chat_record=await require("./chat_record.model.js")(sequelize, Sequelize);
  db.user=await require("./user.model.js")(sequelize, Sequelize);
  db.chat_room=await require("./chat_room.model.js")(sequelize,Sequelize);
  let DBconnected=false
  while(!DBconnected){
    console.log("connecting")
    await db.sequelize.sync()
    .then(()=>{
      console.log("db connect success")
      DBconnected=true
    })
    .catch(e=>{
      console.log("waiting for db connect...",e)
    });
    await sleep(3000)
  }

  //db connected,init admin
  await db.user.count({ where: { id:1 } })
  .then(async count => {
    if(count==0){
      const new_user = {
          name: "admin",
          password: "admin",
          online: false,
          active_status: true,
          curr_online_account: 0,
        };
      await db.user.create(new_user).catch(e=>{
        console.log(e)
      })
    }
  }).catch(e=>{
    console.log(e)
  })
}

module.exports = {connectDB,db};