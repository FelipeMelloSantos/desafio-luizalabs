const request = require('supertest')
const app = require('../../app')
describe('Cadastrar uma conexão', () => {
    it('Deve retornar status: true indicando que a conexão foi criada', async () => {
        const res = await request(app)
            .post('/api/v1/conexoes')
            .send({
                "pessoa_origem": 1,
                "pessoa_destino": 3
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toBe(true)
    })
})