'use strict';

const dataFaker = require('src/infra/support/dataFaker');

module.exports = {
  up: function (queryInterface) {
    const testUsers = [];

    for(let i = 0; i < 20; i++) {
      testUsers.push({
        name: dataFaker.company(),
        address: dataFaker.address(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    return queryInterface.bulkInsert('companies', testUsers, {});
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('companies', null, {});
  }
};
