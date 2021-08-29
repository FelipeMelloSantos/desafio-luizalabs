const request = require('supertest')
const app = require('../../app')
describe('Consultar Pessoa', () => {
    it('Deve retornar a pessoa', async () => {
        const res = await request(app)
            .get('/api/v1/pessoas/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('conhecidos')
    })
})