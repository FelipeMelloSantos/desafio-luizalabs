const request = require('supertest')
const app = require('../../app')
describe('UPDATE Pessoa', () => {
    it('Deve retornar status: true, indicando que a pessoa foi atualizada com sucesso', async () => {
        const res = await request(app)
            .put('/api/v1/pessoas/1')
            .send({
                nome: "Otavio"
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toBe(true)
    })
})