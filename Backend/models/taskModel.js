const pool = require('../config/db');

const getAllTasks = async (userId) => {
  let queryText = 'SELECT * FROM tasks';
  let values = [];
  if (userId) {
    queryText += ' WHERE userId = $1';
    values = [userId];
  }
  const result = await pool.query(queryText, values);
  return result.rows;
};

const createTask = async ({ title, description, userId }) => {
  const queryText = `
    INSERT INTO tasks (title, description, userId, isComplete, created_at, updated_at)
    VALUES ($1, $2, $3, false, NOW(), NOW())
    RETURNING *
  `;
  const result = await pool.query(queryText, [title, description, userId]);
  return result.rows[0];
};

const updateTask = async (id, { title, description, isComplete }) => {
  const queryText = `
    UPDATE tasks
    SET title = COALESCE($1, title),
        description = COALESCE($2, description),
        isComplete = COALESCE($3, isComplete),
        updated_at = NOW()
    WHERE id = $4
    RETURNING *
  `;
  const result = await pool.query(queryText, [title, description, isComplete, id]);
  return result.rows[0];
};

const deleteTask = async (id) => {
  const queryText = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
  const result = await pool.query(queryText, [id]);
  return result.rows[0];
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
