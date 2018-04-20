'use strict';

const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const hashPassword = Promise.promisify(bcrypt.hash);

module.exports = (sequelize, DataTypes) => {
  var Account = sequelize.define('Account', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
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
    passwordResetToken: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
    },
    accountVerifyToken: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  }, {});

  Account.associate = function(models) {
    Account.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
  };

  // This hook, for some reason doesn't work when declared in the define options.
  Account.beforeCreate((account, options) => {
    return hashPassword(account.password, 10).then(hashedPw => {
      account.password = hashedPw;
    });
  });

  Account.beforeBulkUpdate((account, options) => {
    if(account.attributes.password != undefined) {
      return hashPassword(account.attributes.password, 10).then(hashedPw => {
        account.attributes.password = hashedPw;
      });
    }
  });

  return Account;
};
