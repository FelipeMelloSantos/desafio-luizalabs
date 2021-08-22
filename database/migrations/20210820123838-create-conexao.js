'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Conexaos', {
      pessoa_origem: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'pessoas', key: 'id' }
      },
      pessoa_destino: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'pessoas', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Conexaos');
  }
};