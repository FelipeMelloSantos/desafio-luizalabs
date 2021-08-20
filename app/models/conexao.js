'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conexao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Conexao.init({
    pessoa_origem: DataTypes.INTEGER,
    pessoa_destino: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Conexao',
  });
  return Conexao;
};