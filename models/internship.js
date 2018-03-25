'use strict';
module.exports = (sequelize, DataTypes) => {
  var internship = sequelize.define('internship', {
    name: DataTypes.STRING
  }, {});
  internship.associate = function(models) {
    // associations can be defined here
  };
  return internship;
};