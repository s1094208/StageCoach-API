'use strict';

const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const hashPassword = Promise.promisify(bcrypt.hash);

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
        isAlpha: true,
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 255],
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // Min 8 characters, min 1 letter, special and number
        is: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/
      }
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  },{});

  User.associate = function(models) {
    User.belongsToMany(models.Role, {
       as: 'roles',
       through: {
         model: models.UserRoles,
         unique: true,
       },
       foreignKey: 'userId'
     });
  };

  // This hook, for some reason doesn't work when declared in the define options.
  User.beforeCreate((user, options) => {
    return hashPassword(user.password, 10).then(hashedPw => {
      user.password = hashedPw;
    });
  });

  return User;
};
