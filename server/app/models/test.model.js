module.exports = (sequelize, Sequelize, room_name) => {
    const room_list = sequelize.define(room_name, {
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