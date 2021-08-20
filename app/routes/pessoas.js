var express = require('express');
var router = express.Router();
const Pessoa = require('../models/index').Pessoa;
const Conexao = require('../models/index').Conexao;

router.get('/', async (req, res) => {

    res.send(await Pessoa.findAll(
        {
            attributes: ['id', 'nome'],
            include: ["conhece"]
        }
    ));

});

router.post('/', async (req, res, next) => {

    const pessoa = await Pessoa.create({
        nome: req.body.nome
    });

    res.status(201).json(pessoa);

});

module.exports = router;
