'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: 's1091394',
      firstName: 'Reno',
      middleName: null,
      lastName: 'Meijer',
      phone: '0610553891',
      email: 's1091394@student.hsleiden.nl',
      password: '$2b$10$wEMs/zXC.AvK0GOceDTZ3.E0sTTFYO954Uj69nd9SSpzWYU9fwHgq'
    },{
      id: 's1091395',
      firstName: 'Bernd',
      middleName: null,
      lastName: 'Oostrum',
      phone: '060522182',
      email: 's1091395@student.hsleiden.nl',
      password: '$2b$10$wEMs/zXC.AvK0GOceDTZ3.E0sTTFYO954Uj69nd9SSpzWYU9fwHgq'
    },{
      id: 's1091396',
      firstName: 'Anna',
      middleName: null,
      lastName: 'Verbree',
      phone: '0638100192',
      email: 's1091396@student.hsleiden.nl',
      password: '$2b$10$wEMs/zXC.AvK0GOceDTZ3.E0sTTFYO954Uj69nd9SSpzWYU9fwHgq'
    },{
      id: 'Boere.M',
      firstName: 'Michiel',
      middleName: null,
      lastName: 'Boere',
      phone: '069912771',
      email: 'Boere.M@hsleiden.nl',
      password: '$2b$10$wEMs/zXC.AvK0GOceDTZ3.E0sTTFYO954Uj69nd9SSpzWYU9fwHgq'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
