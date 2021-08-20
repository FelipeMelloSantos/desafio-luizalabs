var express = require('express');
var router = express.Router();
const Conexao = require('../models/index').Conexao;

router.get('/', async (req, res) => {

    res.send(await Conexao.findAll({
        attributes: ['pessoa_origem', 'pessoa_destino']
    }));

});

router.post('/', async (req, res, next) => {

    const conexao = await Conexao.create({
        pessoa_origem: req.body.pessoa_origem,
        pessoa_destino: req.body.pessoa_destino
    });

    const conexao2 = await Conexao.create({
        pessoa_origem: req.body.pessoa_destino,
        pessoa_destino: req.body.pessoa_origem
    });

    res.status(201).json(conexao.toJSON());

});

module.exports = router;
