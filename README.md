# DIO Workshop GitHub Copilot - API MVP

Repositório para o Bootcamp GitHub Copilot na DIO - by Pachi Parra

## 📋 Sobre o Projeto

Esta é uma API REST simples desenvolvida como MVP (Minimum Viable Product) para o workshop de GitHub Copilot. A API implementa um sistema básico de gerenciamento de tarefas (tasks) com operações CRUD completas.

## 🚀 Tecnologias

- Node.js
- Express.js
- CORS

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/romuloroc/dio_workshop_github_copilot.git
cd dio_workshop_github_copilot
```

2. Instale as dependências:
```bash
npm install
```

## ▶️ Executando o Projeto

Para iniciar o servidor:

```bash
npm start
```

O servidor será iniciado em `http://localhost:3000`

## 📚 Endpoints da API

### Root Endpoint
- **GET /** - Retorna informações sobre a API e lista de endpoints disponíveis

### Tasks (Tarefas)

#### Listar todas as tarefas
```
GET /api/tasks
```

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "title": "Learn GitHub Copilot",
      "description": "Complete the DIO workshop",
      "completed": false
    }
  ]
}
```

#### Buscar tarefa por ID
```
GET /api/tasks/:id
```

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Learn GitHub Copilot",
    "description": "Complete the DIO workshop",
    "completed": false
  }
}
```

**Resposta de erro (404):**
```json
{
  "success": false,
  "message": "Task with id 1 not found"
}
```

#### Criar nova tarefa
```
POST /api/tasks
```

**Body:**
```json
{
  "title": "Nova Tarefa",
  "description": "Descrição da tarefa",
  "completed": false
}
```

**Resposta de sucesso (201):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 3,
    "title": "Nova Tarefa",
    "description": "Descrição da tarefa",
    "completed": false
  }
}
```

#### Atualizar tarefa
```
PUT /api/tasks/:id
```

**Body:**
```json
{
  "title": "Tarefa Atualizada",
  "description": "Nova descrição",
  "completed": true
}
```

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": 1,
    "title": "Tarefa Atualizada",
    "description": "Nova descrição",
    "completed": true
  }
}
```

#### Deletar tarefa
```
DELETE /api/tasks/:id
```

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "id": 1,
    "title": "Learn GitHub Copilot",
    "description": "Complete the DIO workshop",
    "completed": false
  }
}
```

## 🧪 Testando a API

Você pode testar a API usando ferramentas como:
- cURL
- Postman
- Insomnia
- Thunder Client (extensão do VS Code)

### Exemplos com cURL:

```bash
# Listar todas as tarefas
curl http://localhost:3000/api/tasks

# Buscar tarefa por ID
curl http://localhost:3000/api/tasks/1

# Criar nova tarefa
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Nova Tarefa","description":"Teste","completed":false}'

# Atualizar tarefa
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Deletar tarefa
curl -X DELETE http://localhost:3000/api/tasks/1
```

## 🛠️ Estrutura do Projeto

```
dio_workshop_github_copilot/
├── server.js           # Arquivo principal da API
├── package.json        # Dependências e scripts
├── .gitignore         # Arquivos ignorados pelo Git
├── README.md          # Documentação
└── LICENSE            # Licença do projeto
```

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Workshop desenvolvido por Pachi Parra para a DIO (Digital Innovation One)
