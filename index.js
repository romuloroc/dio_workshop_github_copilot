const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let initiatives = [
  {
    id: 1,
    name: 'Programa de Reciclagem Comunitária',
    type: 'reciclagem',
    description: 'Iniciativa de coleta seletiva e reciclagem no bairro',
    carbonReduction: 500,
    status: 'ativo'
  },
  {
    id: 2,
    name: 'Meta de Redução de Carbono 2025',
    type: 'reducao_carbono',
    description: 'Reduzir emissões de carbono em 30% até 2025',
    carbonReduction: 3000,
    status: 'em_progresso'
  },
  {
    id: 3,
    name: 'Reflorestamento Urbano',
    type: 'impacto_ambiental',
    description: 'Plantio de 1000 árvores em áreas urbanas',
    carbonReduction: 1200,
    status: 'ativo'
  }
];

let nextId = 4;

app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Sustentabilidade',
    endpoints: {
      'GET /initiatives': 'Lista todas as iniciativas',
      'GET /initiatives/:id': 'Obtém uma iniciativa específica',
      'POST /initiatives': 'Cria uma nova iniciativa',
      'PUT /initiatives/:id': 'Atualiza uma iniciativa',
      'DELETE /initiatives/:id': 'Remove uma iniciativa'
    }
  });
});

app.get('/initiatives', (req, res) => {
  res.json(initiatives);
});

app.get('/initiatives/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initiative = initiatives.find(i => i.id === id);
  
  if (!initiative) {
    return res.status(404).json({ error: 'Iniciativa não encontrada' });
  }
  
  res.json(initiative);
});

app.post('/initiatives', (req, res) => {
  const { name, type, description, carbonReduction, status } = req.body;
  
  if (!name || !type) {
    return res.status(400).json({ error: 'Nome e tipo são obrigatórios' });
  }
  
  const newInitiative = {
    id: nextId++,
    name,
    type,
    description: description || '',
    carbonReduction: carbonReduction || 0,
    status: status || 'ativo'
  };
  
  initiatives.push(newInitiative);
  res.status(201).json(newInitiative);
});

app.put('/initiatives/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = initiatives.findIndex(i => i.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Iniciativa não encontrada' });
  }
  
  const { name, type, description, carbonReduction, status } = req.body;
  
  initiatives[index] = {
    ...initiatives[index],
    ...(name && { name }),
    ...(type && { type }),
    ...(description !== undefined && { description }),
    ...(carbonReduction !== undefined && { carbonReduction }),
    ...(status && { status })
  };
  
  res.json(initiatives[index]);
});

app.delete('/initiatives/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = initiatives.findIndex(i => i.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Iniciativa não encontrada' });
  }
  
  const deleted = initiatives.splice(index, 1)[0];
  res.json({ message: 'Iniciativa removida com sucesso', initiative: deleted });
});

app.listen(PORT, () => {
  console.log(`API de Sustentabilidade rodando na porta ${PORT}`);
});
