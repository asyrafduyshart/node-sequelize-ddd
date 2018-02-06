'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('company', {
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        Company.hasMany(models.User);
        // associations can be defined here
      }
    }
  });
  return Company;
};