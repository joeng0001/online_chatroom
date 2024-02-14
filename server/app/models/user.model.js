//const Promise = require('bluebird')
const bcrypt = require('bcrypt');
async function hashPassword(user, options) {

  if (!user.changed('password')) {
    return
  }
  const salt = await bcrypt.genSalt(8)
  const hash = await bcrypt.hash(user.password, salt)
  user.setDataValue('password', hash);
}

module.exports = async (sequelize, Sequelize) => {
  const user =await  sequelize.define("user", {
    name: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    online: {
      type: Sequelize.BOOLEAN
    },
    curr_online_account: {
      type: Sequelize.INTEGER
    },
    active_status: {//can be banned by admin
      type: Sequelize.BOOLEAN
    },
    description: {
      type: Sequelize.STRING
    },
  }, {
    hooks: {
      beforeCreate: hashPassword,
    }
  });
  user.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
  }
  return user;
};