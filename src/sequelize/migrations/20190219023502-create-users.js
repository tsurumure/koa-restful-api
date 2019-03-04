'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER(10).UNSIGNED
        },
        uid: {
            allowNull: false,
            unique: true,
            comment: '用户唯一Id',
            type: Sequelize.STRING(11)
        },
        username: {
            allowNull: false,
            unique: true,
            comment: '用户名',
            type: Sequelize.STRING(100)
        },
        password: {
            allowNull: false,
            comment: '用户密码',
            type: Sequelize.STRING(100)
        },
        remember_token: {
            type: Sequelize.STRING(100)
        }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
