'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('UserRoles', [{
        userId: 's1091394',
        roleTitle: 'Student',
      }, {
        userId: 's1091395',
        roleTitle: 'Student',
      }, {
        userId: 's1091396',
        roleTitle: 'Student'
      }, {
        userId: 'Boere.M',
        roleTitle: 'Monitor'
      }, {
        userId: 'Boere.M',
        roleTitle: 'Mentor'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('UserRoles', null, {});
  }
};
