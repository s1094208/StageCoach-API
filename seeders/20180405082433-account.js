'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Accounts', [
    {
      userId: 's1091394',
      email: 's1091394@student.hsleiden.nl',
      password: '$2a$10$T4eXdICs8yJ122xj4oOnEOzDJUQDK8xI4ArRPxZJRb1dpvblqud0a'
    },
    {
      userId: 's1091396',
      email: 's1091396@student.hsleiden.nl',
      password: '$2a$10$T4eXdICs8yJ122xj4oOnEOzDJUQDK8xI4ArRPxZJRb1dpvblqud0a'
    },
    {
      userId: 's1091395',
      email: 's1091395@student.hsleiden.nl',
      password: '$2a$10$T4eXdICs8yJ122xj4oOnEOzDJUQDK8xI4ArRPxZJRb1dpvblqud0a'
    },
    {
      userId: 'Boere.M',
      email: 'Boere.M@hsleiden.nl',
      password: '$2a$10$T4eXdICs8yJ122xj4oOnEOzDJUQDK8xI4ArRPxZJRb1dpvblqud0a'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Accounts', null, {});
  }
};
