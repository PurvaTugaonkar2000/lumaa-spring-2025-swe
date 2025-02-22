// app.js
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Authentication routes (e.g., /auth/register, /auth/login)
const userRoutes = require('./routes/userRoutes');
app.use('/auth', userRoutes);

// Tasks routes (e.g., /api/tasks)
const taskRoutes = require('./routes/taskRoutes');
app.use('/api', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
