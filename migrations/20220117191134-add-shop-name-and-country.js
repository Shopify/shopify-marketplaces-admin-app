'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Shops', 'name', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Shops', 'country', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Shops', 'name');
    await queryInterface.removeColumn('Shops', 'country');
  },
};
