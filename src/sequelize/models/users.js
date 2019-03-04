'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    uid: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    // level_name: DataTypes.STRING,
    // level_id: DataTypes.INTEGER,
    remember_token: DataTypes.STRING
  }, { timestamps: false });
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};
