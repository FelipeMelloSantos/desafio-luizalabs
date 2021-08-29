const request = require('supertest')
const app = require('../../app')
describe('Cadastrar uma pessoa', () => {
    it('Deve retornar o código 201 e ter a propriedade id no corpo indicando que a pessoa foi cadastrada com sucesso', async () => {
        const res = await request(app)
            .post('/api/v1/pessoas')
            .send({
                nome: "Felipe"
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body.message).toBe('Pessoa inserida com sucesso')
    })
})