const request = require('supertest')
const app = require('../../app')
describe('Consultar Pessoa', () => {
    it('Deve retornar a pessoa com os conhecidos em nivel 2', async () => {
        const res = await request(app)
            .get('/api/v1/pessoas/1/nivel2')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('conhecidosNivel2')
    })
})