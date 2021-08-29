'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Pessoas', [{
      id: 1,
      nome: "Felipe",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      nome: "João",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      nome: "Carlos",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 57,
      nome: "Julio",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Pessoas', null, {});
  }
};
