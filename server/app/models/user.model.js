//const Promise = require('bluebird')
const bcrypt =require('bcrypt');
async function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }
  const salt=await bcrypt.genSalt(8)
  const hash=await bcrypt.hash(user.password, salt)
  user.setDataValue('password', hash);
  console.log("after hashing")
  console.log(hash)
}

module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
      name: {
        type: Sequelize.STRING
      },
      password:{
        type:Sequelize.STRING
      },
      online: {
        type: Sequelize.BOOLEAN
      },
      active_status: {//can be banned by admin
        type: Sequelize.BOOLEAN
      },
      description: {
        type: Sequelize.STRING
      },
    },{
      hooks: {
        beforeCreate: hashPassword,
        //beforeUpdate: hashPassword,
        //beforeSave: hashPassword
      }
    });
    user.prototype.comparePassword = function (password) {
      return bcrypt.compare(password, this.password)
    }
    return user;
  };