'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserRole = sequelize.define('UserRoles', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    roleTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  }, {});
  
  UserRole.associate = function(models) {
    // associations can be defined here
  };
  return UserRole;
};
