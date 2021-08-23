var express = require('express');
var router = express.Router();

const pessoaController = require('../controllers/pessoaController');

/**
 * JSON parameters require a model. This one just has "name"
 * @typedef InserePessoaJSON
 * @property {string} nome.required - Nome da pessoa - eg: Rogerio
 * @property {Array.<integer>} conexoes - Id das pessoas que a pessoa que esta sendo inserida conhece - eg: [1, 2]
 */
/**

/**
 * JSON parameters require a model. This one just has "name"
 * @typedef UpdatePessoaJSON
 * @property {string} nome.required - Nome da pessoa - eg: Rogerio
 */
/**

/**
 * Esta rota retorna todas as pessoas cadastradas
 * @route GET /pessoas
 * @group Pessoas
 * @returns {object} 200 - Um vetor com todos usuários
 * @returns {Error}  Erro - Erro
 */
router.get('/', pessoaController.getPessoas);

/**
 * Esta rota insere uma pessoa
 * @route POST /pessoas
 * @group Pessoas
 * @param {InserePessoaJSON.model} conteudo.body.required - O nome da pessoa e um vetor com os ids das pessoas que ela conhece, caso ela não conheca ninguém o vetor não deve ser passado.
 * @returns {object} 201 - Um objeto com o usuário id do usuário cadastrado e o status das conexões
 * @returns {Error}  Erro - Erro
 */
router.post('/', pessoaController.storePessoa);

/**
 * Esta rota retorna uma pessoa com suas conexões em nível 1
 * @route GET /pessoas/{id}
 * @group Pessoas
 * @param {integer} id.path.required
 * @returns {object} 200 - Um objeto com o usuário cadastrado e suas conexões em nível 1
 * @returns {Error}  Erro - Erro
 */
router.get('/:id', pessoaController.getPessoa);

/**
 * Esta rota retorna uma pessoa com suas conexões em nível 2
 * @route GET /pessoas/{id}/nivel2
 * @group Pessoas
 * @param {integer} id.path.required
 * @returns {object} 200 - Um objeto com o usuário cadastrado e o status das conexões em nível 2
 * @returns {Error}  Erro - Erro
 */
router.get('/:id/nivel2', pessoaController.getPessoaNivel2);

/**
 * Esta rota atualiza uma pessoa
 * @route PUT /pessoas/{id}
 * @group Pessoas
 * @param {integer} id.path.required
 * @param {UpdatePessoaJSON.model} nome.body.required - O nome da pessoa
 * @returns {object} 200 - Um objeto com o usuário id do usuário cadastrado e o status das coneões
 * @returns {Error}  Erro - Erro
 */
router.put('/:id', pessoaController.updatePessoa);

/**
 * Esta rota apaga uma pessoa
 * @route DELETE /pessoas/{id}
 * @group Pessoas
 * @param {integer} id.path.required
 * @returns {object} 200 - O status da execução da exclusão da pessoa
 * @returns {Error}  Erro - Erro
 */
router.delete('/:id', pessoaController.deletePessoa);

module.exports = router;
