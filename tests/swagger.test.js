const request = require('supertest')
const app = require('../app')
describe('GET Swagger', () => {
    it('Verifica se a rota do swagger esta funcionando', async () => {
        const res = await request(app)
            .get('/api-docs')
        expect(res.statusCode).toEqual(200)
    })
})