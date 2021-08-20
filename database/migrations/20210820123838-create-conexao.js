'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Conexaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: 'pessoas', key: 'id' }
      },
      pessoa_origem: {
        type: Sequelize.INTEGER,
        references: { model: 'pessoas', key: 'id' }
      },
      pessoa_destino: {
        type: Sequelize.INTEGER,
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