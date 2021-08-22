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

    // Inserir as conexoes entre duas pessoas nos dois destinos no grafo
    static async conectar(pessoaOrigem, pessoaDestino) {
      try {
        //Iniciar transação para inserir as duas conexoes, para se caso uma falhar um rollback ser feito
        await sequelize.transaction(async (t) => {
          //Criar a primeira conexão
          await this.create({
            pessoa_origem: pessoaDestino,
            pessoa_destino: pessoaOrigem,
            transaction: t
          }, {
            fields: ["pessoa_origem", "pessoa_destino"]
          });
          //Criar a segunda conexão
          await this.create({
            pessoa_origem: pessoaOrigem,
            pessoa_destino: pessoaDestino,
            transaction: t
          }, { fields: ["pessoa_origem", "pessoa_destino"] });

        });

        console.log("Conexão de " + pessoaOrigem + " com " + pessoaDestino + " inserida com sucesso!");
        return {
          status: true,
          message: "Conexão de " + pessoaOrigem + " com " + pessoaDestino + " inserida com sucesso!"
        };

      } catch (err) {

        console.log(err);
        return {
          status: false,
          message: "Erro ao inserir conexão de " + pessoaOrigem + " com " + pessoaDestino + ", é possível que esta conexão já exista, ou a pessoa não exista."
        };

      }
    }
  };
  Conexao.init({
    pessoa_origem: DataTypes.INTEGER,
    pessoa_destino: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Conexao'
  });
  return Conexao;
};