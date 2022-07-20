'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Shops', 'onboardingInfoCompleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
    await queryInterface.addColumn('Shops', 'termsAccepted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
    await queryInterface.addColumn('Shops', 'onboardingCompleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Shops', 'onboardingInfoCompleted');
    await queryInterface.removeColumn('Shops', 'termsAccepted');
    await queryInterface.removeColumn('Shops', 'onboardingCompleted');
  },
};
