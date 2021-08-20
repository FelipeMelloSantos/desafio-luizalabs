'use strict';
const {
  Model, HasMany
} = require('sequelize');
const models = require('../models/index');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Pessoa, { as: 'origem', through: 'conexaos', foreignKey: 'pessoa_origem', sourceKey: 'id' })
      this.belongsToMany(models.Pessoa, { as: 'conhece', through: 'conexaos', foreignKey: 'pessoa_destino', sourceKey: 'id' })
    }
  };
  Pessoa.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
  });
  return Pessoa;
};