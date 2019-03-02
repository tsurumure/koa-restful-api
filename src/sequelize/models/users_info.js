'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_info = sequelize.define('users_info', {
    uid: DataTypes.STRING,
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    lastlogin_ip: DataTypes.STRING,
    lastlogin_at: DataTypes.DATE
  }, { timestamps: false });
  users_info.associate = function(models) {
    // associations can be defined here
  };
  return users_info;
};
