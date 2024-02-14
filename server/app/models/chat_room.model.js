module.exports =async (sequelize, Sequelize) => {
  const room_list = await sequelize.define("room_lists", {
    room_name: {
      type: Sequelize.STRING
    },
    room_admin: {
      type: Sequelize.STRING
    },
    active_status: {//can be banned by admin
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    welcome_msg: {
      type: Sequelize.STRING
    },
    remark: {
      type: Sequelize.STRING//reserve
    },

  }, {
    freezeTableName: true,
  });

  return room_list;
};