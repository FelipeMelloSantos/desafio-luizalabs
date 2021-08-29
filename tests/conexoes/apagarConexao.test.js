const request = require('supertest')
const app = require('../../app')
describe('Apaga Conexão', () => {
    it('Deve retornar status: true, indicando que a conexão foi apagada com sucesso', async () => {
        const res = await request(app)
            .delete('/api/v1/conexoes/1/2')
        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toBe(true)
    })
})