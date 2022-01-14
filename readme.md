# Desafio Luizalabs

A API foi desenvolvida utilizando **Node.js** com a framework **Express** e o padrão **MCV** para permitir uma melhor separação dos módulos e um possível desenvolvimento de uma UI para a API, para acomodar a lógica do grafo foi utilizada uma base de dados SQL com Sqlite, o grafo acabou virando um grafo dirigido por conta dessa escolha para armazenar o grafo.

O banco ficou com 2 tabelas

Uma tabela ***pessoa*** para guardar o nome da pessoa e uma tabela ***conexões*** onde guarda o id da ***pessoa de origem*** da aresta do grafo e o id da ***pessoa de destino***, pode este motivo ao inserir uma conexão a aplicação já insere a conexão contraria, exemplo:

Ao indicar que ***Ana*** conhece ***Maria***, a aplicação também insere uma conexão entre ***Maria*** e ***Ana***.

Para fazer as operações com o banco foi utilizado a **Sequelize ORM**, onde foi responsável por todas as consultas realizadas ao banco exceto na consulta de conhecidos nível 2 onde foi feita uma consulta com a query 'crua'.

```sql
SELECT Pessoas.*
FROM (SELECT * FROM Conexaos c WHERE c.pessoa_origem = ?) AS conexoes
JOIN Conexaos ON Conexaos.pessoa_origem = conexoes.pessoa_destino 
AND Conexaos.pessoa_destino <> conexoes.pessoa_origem 
AND Conexaos.pessoa_destino NOT IN(SELECT a.pessoa_destino FROM Conexaos a WHERE a.pessoa_origem = ?) 
JOIN Pessoas ON Pessoas.id = Conexaos.pessoa_destino
```

Para trazer todas as pessoas conhecidas do nível 2 fiz um SELECT de todas as pessoas que a pessoa consultada conhece com isso fiz um JOIN para trazer todas as pessoas que elas conhecem, nesse JOIN exclui a própria pessoa consultada e as pessoas que ela já conhece.

A aplicação esta documentada com **Swagger** onde pode ser acessado através da rota '**/api-docs**'.

# Rotas

O **base path** da aplicação é **/api/v1/**

### Pessoas

**GET /pessoas** - Retorna todas as pessoas cadastradas

**POST /pessoas** - Insere uma pessoa

Deve ser enviado um Json com o nome da pessoa e um vetor com os ids das pessoas que ela conhece, caso ela não conheça ninguém o vetor não deve ser passado. 

```json
{
	"nome":"Rogerio",
	"conexoes":[1,2]
}
```

**GET /pessoas/{id}** - Retorna uma pessoa com suas conexões em nível 1

**PUT /pessoas/{id}** - Atualiza uma pessoa

Deve ser enviado um Json com o nome da pessoa

```json
{
	"nome":"Rogerio"
}
```

**DELETE /pessoas/{id}** - Apaga uma pessoa

**GET /pessoas/{id}/nivel2** - Retorna uma pessoa com suas conexões em nível 2

# Conexões

**GET /conexoes** - Retorna todas as conexões cadastradas

**POST /conexoes** - Cadastra uma conexão

```json
{
	"pessoa_origem":1,
	"pessoa_destino":2
}
```

**DELETE /conexoes/{pessoa_origem}/{pessoa_destino}** - Apaga uma conexão

O banco incluso na aplicação se encontra no caminho database/data.sqlite3 já contém o grafo definido, para zerar o banco deve ser removido e executado o comando.

```bash
npx sequelize-cli db:migrate
```

Para que a migração seja feita e o banco seja inicializado, outra opção é executar o comando:

```bash
npx sequelize-cli db:migrate:undo:all
```

E depois

```bash
npx sequelize-cli db:migrate
```

# Swagger

Para acessar o swagger basta acessar a rota /api-docs

# Docker

O repositório contém um Dockerfile para a criação da imagem da aplicação, para realizar a criação da imagem basta executar o comando:

```bash
docker build -t desafio-luizalabs .
```

Para iniciar a aplicação no docker basta executar o comando:

```bash
docker run -it -p 9000:3000 desafio-luizalabs
```

A aplicação será executada na porta 9000

# Testes

Foi implementado os testes com Jest, para executar os teste basta executar o comando:

```bash
npm test
```

E será feito os testes de todas as rotas da aplicação.
