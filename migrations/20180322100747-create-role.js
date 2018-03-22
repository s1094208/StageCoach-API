'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Roles', {
      title: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Roles');
  }
};
