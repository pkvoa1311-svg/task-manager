import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import config, { connectDB } from './config.js';
import { errorHandler, asyncHandler, notFoundHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
await connectDB();

// Task Schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model('Task', taskSchema);

// ===== API Routes =====

// GET all tasks
app.get('/api/tasks', asyncHandler(async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
}));

// GET single task
app.get('/api/tasks/:id', asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found',
    });
  }
  res.json({
    success: true,
    data: task,
  });
}));

// POST create task
app.post('/api/tasks', asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Title is required and cannot be empty',
    });
  }

  const task = new Task({
    title: title.trim(),
    description: description?.trim() || '',
  });

  await task.save();
  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: task,
  });
}));

// PUT update task
app.put('/api/tasks/:id', asyncHandler(async (req, res) => {
  const { title, description, completed } = req.body;

  if (title !== undefined && (!title || title.trim() === '')) {
    return res.status(400).json({
      success: false,
      error: 'Title cannot be empty',
    });
  }

  const updateData = {
    updatedAt: Date.now(),
  };

  if (title !== undefined) updateData.title = title.trim();
  if (description !== undefined) updateData.description = description.trim();
  if (completed !== undefined) updateData.completed = completed;

  const task = await Task.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found',
    });
  }

  res.json({
    success: true,
    message: 'Task updated successfully',
    data: task,
  });
}));

// DELETE task
app.delete('/api/tasks/:id', asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found',
    });
  }

  res.json({
    success: true,
    message: 'Task deleted successfully',
  });
}));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    environment: config.node_env,
    uptime: process.uptime(),
  });
});

// API Info
app.get('/api', (req, res) => {
  res.json({
    name: 'Task Manager API',
    version: '1.0.0',
    endpoints: {
      'GET /api/tasks': 'Get all tasks',
      'GET /api/tasks/:id': 'Get single task',
      'POST /api/tasks': 'Create task',
      'PUT /api/tasks/:id': 'Update task',
      'DELETE /api/tasks/:id': 'Delete task',
      'GET /api/health': 'Health check',
    },
  });
});

// Not found handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${config.node_env}`);
  console.log(`🌐 Open http://localhost:${PORT}`);
  console.log(`📚 API docs: http://localhost:${PORT}/api`);
});
