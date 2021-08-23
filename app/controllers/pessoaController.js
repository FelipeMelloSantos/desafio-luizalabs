const Pessoa = require('../models/index').Pessoa;
const Conexao = require('../models/index').Conexao;
const sequelize = require('../models/index').sequelize;
const Sequelize = require('../models/index').Sequelize;

exports.getPessoas = async (req, res) => {

    await Pessoa.findAll({
        // include: ["conhecidos"]
    }).then(pessoas => {
        res.status(200).json(pessoas);
    }).catch(err => {
        console.log(err);
        res.status(500).send({ error: err.name });
    })

}

exports.storePessoa = async (req, res, next) => {

    await Pessoa.create({
        nome: req.body.nome
    }).then(async pessoa => {
        statusConexoes = [];
        if (conexoes = req.body.conexoes) {
            for (let index = 0; index < conexoes.length; index++) {
                const element = conexoes[index];

                await statusConexoes.push(await Conexao.conectar(pessoa.id, element))
            }
        }
        res.status(201).json({
            pessoa: pessoa,
            message: "Pessoa inserida com sucesso",
            statusConexoes
        });
    }).catch(err => {
        console.log(err);
        res.status(500).send({ error: err.name });
    });

}

exports.getPessoa = async (req, res, next) => {

    const id = req.params.id;

    Pessoa.findByPk(id, {
        include: ["conhecidos"]
    })
        .then(pessoa => {
            if (pessoa) {
                res.json(pessoa);
            } else {
                res.status(404).json({ message: "Pessoa não encontrada" });
            }
        }).catch(err => {
            res.status(500).send({
                message: err.name
            })
        });

}

exports.getPessoaNivel2 = async (req, res, next) => {

    const id = req.params.id;

    pessoa = await Pessoa.findByPk(id, { raw: true }).catch(err => {
        res.status(500).send({
            message: err.name
        })
    }).catch(err => {
        res.status(500).send({
            message: err.name
        })
    });

    if (pessoa) {
        pessoa.conhecidosNivel2 = await sequelize.query('SELECT Pessoas.* FROM(SELECT * FROM Conexaos c WHERE c.pessoa_origem = ?) AS conexoes JOIN Conexaos ON Conexaos.pessoa_origem = conexoes.pessoa_destino AND Conexaos.pessoa_destino <> conexoes.pessoa_origem AND Conexaos.pessoa_destino NOT IN(SELECT a.pessoa_destino FROM Conexaos a WHERE a.pessoa_origem = ?) JOIN Pessoas ON Pessoas.id = Conexaos.pessoa_destino',
            {
                raw: true,
                replacements: [id, id],
                type: Sequelize.QueryTypes.SELECT
            }).catch(err => {
                res.status(500).send({
                    message: err.name
                })
            });

        res.json(pessoa);
    } else {
        res.status(404).json({ message: "Pessoa não encontrada" });
    }

}

exports.updatePessoa = async (req, res, next) => {

    const id = req.params.id;

    Pessoa.update(req.body, {
        where: { id: id }
    })
        .then(status => {
            if (status == 1) {
                res.json({
                    status: true,
                    message: "A pessoa foi atualizada com sucesso!"
                })
            } else {
                res.json({
                    status: false,
                    message: "Não foi possivel atualizar a pessoa com id: " + id
                })
            }
        }).catch(err => {
            res.status(500).send({
                message: err.name
            })
        });

}

exports.deletePessoa = async (req, res, next) => {

    const id = req.params.id;

    Pessoa.destroy({
        where: { id: id }
    })
        .then(status => {
            if (status == 1) {
                res.json({
                    message: "A pessoa foi apagada com sucesso!"
                })
            } else {
                res.json({
                    message: "Não foi possivel apagar a pessoa com id: " + id
                })
            }
        }).catch(err => {
            res.status(500).send({
                message: err.name
            })
        });

}