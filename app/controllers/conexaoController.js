const Conexao = require('../models/index').Conexao;
const sequelize = require('../models/index').sequelize;
const Op = require('../models/index').Sequelize.Op;

exports.getConexoes = async (req, res) => {

    await Conexao.findAll({
        attributes: ['pessoa_origem', 'pessoa_destino']
    }).then(conexoes => {
        res.send(conexoes);
    }).catch(err => {
        res.send(err);
    })

}

exports.storeConexao = async (req, res, next) => {

    res.send(await Conexao.conectar(req.body.pessoa_origem, req.body.pessoa_destino));

}

exports.deleteConexao = async (req, res, next) => {

    const pessoa_destino = req.params.pessoa_destino;
    const pessoa_origem = req.params.pessoa_origem;

    Conexao.destroy({
        where: {
            [Op.or]: [
                { pessoa_origem: pessoa_origem, pessoa_destino: pessoa_destino },
                { pessoa_origem: pessoa_destino, pessoa_destino: pessoa_origem }
            ]
        }
    })
        .then(status => {
            if (status > 0) {
                res.json({
                    status: true,
                    message: "A conexao foi apagada com sucesso!"
                })
            } else {
                res.json({
                    status: false,
                    message: "Não foi possivel apagar a conexao"
                })
            }
        }).catch(err => {
            res.status(500).send({
                message: err.name
            })
        });

}