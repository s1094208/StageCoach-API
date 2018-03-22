'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserRoles', {
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      roleTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Roles',
          key: 'title'
        },
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
    return queryInterface.dropTable('UserRoles');
  }
};
