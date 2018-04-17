'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        len: [0, 25],
        notEmpty: true
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
        isAlpha: true,
      }
    },
    middleName: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255],
        is: /^[a-zA-Z\s\']*$/,
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
        isAlpha: true,
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [10,10],
        isNumeric: true,
      }
    },
    linkedIn: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        not: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
      }
    }
  },{ timestamps: false });

  User.associate = function(models) {
    User.hasOne(models.Account, {
      as: 'account',
      foreignKey: 'userId'
    });

    User.belongsToMany(models.Role, {
       as: 'roles',
       through: {
         model: models.UserRoles,
         unique: true,
       },
       foreignKey: 'userId'
     });
  };

  return User;
};
