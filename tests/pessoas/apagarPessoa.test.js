const request = require('supertest')
const app = require('../../app')
describe('DELETE Pessoa', () => {
    it('Deve retornar status: true, indicando que a pessoa foi apagada com sucesso', async () => {
        const res = await request(app)
            .delete('/api/v1/pessoas/57')
        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toBe(true)
    })
})