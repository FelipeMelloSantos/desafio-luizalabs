const request = require('supertest')
const app = require('../../app')
describe('Retorna todas pessoas', () => {
    it('Deve retornar status 200', async () => {
        const res = await request(app)
            .get('/api/v1/pessoas')
        expect(res.statusCode).toEqual(200)
    })
})