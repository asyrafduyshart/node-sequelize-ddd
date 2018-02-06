'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        User.belongsTo(models.Company);
        // associations can be defined here
      }
    }
  });
  return User;
};