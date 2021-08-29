const request = require('supertest')
const app = require('../../app')
describe('Retornar Conexões', () => {
    it('Deve retornar statusCode 200 indicando que a rota de exibição das conexões esta funcionando', async () => {
        const res = await request(app)
            .get('/api/v1/conexoes')
        expect(res.statusCode).toEqual(200)
    })
})