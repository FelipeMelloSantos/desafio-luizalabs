var express = require('express');
var router = express.Router();
const Pessoa = require('../models/index').Pessoa;

router.get('/', async (req, res) => {

    await Pessoa.findAll({
        attributes: ['id', 'nome'],
        include: ["conhecidos"]
    }).then(pessoas => {
        res.status(200).json(pessoas);
    }).catch(err => {
        console.log(err);
        res.status(500).send({ error: err.name });
    })

});

router.post('/', async (req, res, next) => {

    await Pessoa.create({
        nome: req.body.nome
    }).then(pessoa => {
        res.status(201).json(pessoa);
    }).catch(err => {
        console.log(err);
        res.status(500).send({ error: err.name });
    });

});

router.put('/', async (req, res, next) => {

    res.status(200).json({ message: 'sucesso' });

});

router.delete('/', async (req, res, next) => {

    res.status(200).json({ message: 'sucesso' });

});

module.exports = router;
