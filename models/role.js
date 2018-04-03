'use strict';
module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      validate: {
        isAlpha: true,
        len: [1, 50]
      }
    },
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  Role.associate = function(models) {
    Role.belongsToMany(models.User, {
       as: 'users',
       through: {
         model: models.UserRoles,
         unique: true,
       },
       foreignKey: 'roleTitle'
     });
  };
  return Role;
};
