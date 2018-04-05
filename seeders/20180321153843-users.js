'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: 's1091394',
      firstName: 'Reno',
      middleName: null,
      lastName: 'Meijer',
      phone: '0610553891',
    },{
      id: 's1091395',
      firstName: 'Bernd',
      middleName: null,
      lastName: 'Oostrum',
      phone: '060522182',
    },{
      id: 's1091396',
      firstName: 'Anna',
      middleName: null,
      lastName: 'Verbree',
      phone: '0638100192',
    },{
      id: 'Boere.M',
      firstName: 'Michiel',
      middleName: null,
      lastName: 'Boere',
      phone: '069912771',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
