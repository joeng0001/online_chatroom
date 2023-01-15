module.exports = (sequelize, Sequelize) => {
  const chat_record = sequelize.define("chat_record", {
    content: {
      type: Sequelize.STRING
    },
    room_id: {
      type: Sequelize.INTEGER
    },
    publisherID: {
      type: Sequelize.INTEGER
    },
    chat_target: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
  });
  return chat_record;
};