var express = require('express');
var router = express.Router();
const Conexao = require('../models/index').Conexao;

const conexaoController = require('../controllers/conexaoController');

router.get('/', conexaoController.getConexoes);

router.post('/', conexaoController.storeConexao);

router.delete('/:pessoa_origem/:pessoa_destino', conexaoController.deleteConexao);

module.exports = router;
