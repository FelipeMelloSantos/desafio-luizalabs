var express = require('express');
var router = express.Router();
const Conexao = require('../models/index').Conexao;

const conexaoController = require('../controllers/conexaoController');

/**
 * JSON parameters require a model. This one just has "name"
 * @typedef ConexaoJSON
 * @property {integer} pessoa_origem.required - Id da pessoa origem - eg: 1
 * @property {integer} pessoa_destino.required - Id da pessoa destino - eg: 2
 */
/**

/**
 * Esta rota retorna todas as conexões cadastradas
 * @route GET /conexoes
 * @group Conexões
 * @returns {object} 200 - Um vetor com todos as conexões
 * @returns {Error}  Erro - Erro
 */
router.get('/', conexaoController.getConexoes);

/**
 * Esta rota cadastra uma conexão
 * @route POST /conexoes
 * @group Conexões
 * @param {ConexaoJSON.model} conteudo.body.required - O nome da pessoa origem
 * @returns {object} 200 - Um vetor com todos as conexões
 * @returns {Error}  Erro - Erro
 */
router.post('/', conexaoController.storeConexao);

/**
 * Esta rota cadastra uma conexão
 * @route DELETE /conexoes/{pessoa_origem}/{pessoa_destino}
 * @group Conexões
 * @param {integer} pessoa_origem.path.required - O nome da pessoa origem
 * @param {integer} pessoa_destino.path.required - O nome da pessoa destino
 * @returns {object} 200 - Um vetor com todos as conexões
 * @returns {Error}  Erro - Erro
 */
router.delete('/:pessoa_origem/:pessoa_destino', conexaoController.deleteConexao);

module.exports = router;
