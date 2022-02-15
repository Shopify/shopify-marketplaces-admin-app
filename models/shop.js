'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Shop.init(
    {
      country: DataTypes.STRING,
      domain: {
        type: DataTypes.STRING,
        unique: true,
      },
      name: DataTypes.STRING,
      onboardingCompleted: DataTypes.BOOLEAN,
      storefrontAccessToken: DataTypes.STRING,
      onboardingInfoCompleted: DataTypes.BOOLEAN,
      termsAccepted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Shop',
    },
  );
  return Shop;
};
