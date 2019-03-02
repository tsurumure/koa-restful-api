'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users_infos', {
        uid: {
            allowNull: false,
            unique: true,
            comment: '用户唯一Id',
            type: Sequelize.STRING(11)
        },
        nickname: {
            type: Sequelize.STRING(100)
        },
        email: {
            type: Sequelize.STRING(100)
        },
        phone: {
            type: Sequelize.STRING(100)
        },
        level_name: {
            allowNull: false,
            comment: '用户级别',
            type: Sequelize.STRING(100)
        },
        level_id: {
            allowNull: false,
            comment: '用户级别Id',
            type: Sequelize.INTEGER(11)
        },
        lastlogin_ip: {
            type: Sequelize.STRING(20)
        },
        lastlogin_at: {
            type: Sequelize.DATE,
            defaultValue: '0000-00-00 00:00:00'
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: '0000-00-00 00:00:00'
        }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users_infos');
  }
};
