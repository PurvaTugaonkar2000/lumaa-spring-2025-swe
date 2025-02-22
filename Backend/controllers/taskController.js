const taskModel = require('../models/taskModel');

const getTasks = async (req, res) => {
  try {
    // Optionally filter by user if token data is available
    const userId = req.user ? req.user.id : null;
    const tasks = await taskModel.getAllTasks(userId);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user ? req.user.id : null;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  try {
    const newTask = await taskModel.createTask({ title, description, userId });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, isComplete } = req.body;
  try {
    const updatedTask = await taskModel.updateTask(id, { title, description, isComplete });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await taskModel.deleteTask(id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
