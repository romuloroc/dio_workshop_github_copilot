const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store for tasks
let tasks = [
  { id: 1, title: 'Learn GitHub Copilot', description: 'Complete the DIO workshop', completed: false },
  { id: 2, title: 'Build an API', description: 'Create a REST API with Express', completed: false }
];

let nextId = 3;

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to DIO Workshop API - GitHub Copilot',
    version: '1.0.0',
    endpoints: {
      tasks: {
        'GET /api/tasks': 'Get all tasks',
        'GET /api/tasks/:id': 'Get task by ID',
        'POST /api/tasks': 'Create a new task',
        'PUT /api/tasks/:id': 'Update a task',
        'DELETE /api/tasks/:id': 'Delete a task'
      }
    }
  });
});

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// GET task by ID
app.get('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  
  if (!task) {
    return res.status(404).json({
      success: false,
      message: `Task with id ${id} not found`
    });
  }
  
  res.json({
    success: true,
    data: task
  });
});

// POST create new task
app.post('/api/tasks', (req, res) => {
  const { title, description, completed } = req.body;
  
  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Title is required'
    });
  }
  
  const newTask = {
    id: nextId++,
    title,
    description: description || '',
    completed: completed || false
  };
  
  tasks.push(newTask);
  
  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: newTask
  });
});

// PUT update task
app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Task with id ${id} not found`
    });
  }
  
  const { title, description, completed } = req.body;
  
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title !== undefined ? title : tasks[taskIndex].title,
    description: description !== undefined ? description : tasks[taskIndex].description,
    completed: completed !== undefined ? completed : tasks[taskIndex].completed
  };
  
  res.json({
    success: true,
    message: 'Task updated successfully',
    data: tasks[taskIndex]
  });
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Task with id ${id} not found`
    });
  }
  
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'Task deleted successfully',
    data: deletedTask
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}`);
});

module.exports = app;
