var express = require('express');
var router = express.Router();

const pessoaController = require('../controllers/pessoaController');

router.get('/', pessoaController.getPessoas);

router.post('/', pessoaController.storePessoa);

router.get('/:id/nivel2', pessoaController.getPessoaNivel2);
router.get('/:id', pessoaController.getPessoa);


router.put('/:id', pessoaController.updatePessoa);

router.delete('/:id', pessoaController.deletePessoa);

module.exports = router;
