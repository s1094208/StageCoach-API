'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Roles', [{
        title: 'Student',
        description: 'This is the default student role.'
      }, {
        title: 'Mentor',
        description: 'This is the default mentor role, you can assign students so so he can track their progress throughout the internships.'
      }, {
        title: 'Monitor',
        description: 'This is the default monitor role, you can assign internships to the monitor that he can then manage.'
      }, {
        title: 'Faculty Head',
        description: 'This is the default faculty head role, you can assign a faculty that he can then manage like an admin.'
      }, {
        title: 'Admin',
        description: 'This is the default admin role, he who manages the system.'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Roles', null, {});
  }
};
