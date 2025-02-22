const pool = require('../config/db');

// Create a new user
const createUser = async ({ name, username, password }) => {
  const queryText = `
    INSERT INTO users (name, username, password, created_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING *
  `;
  const result = await pool.query(queryText, [name, username, password]);
  return result.rows[0];
};

// Retrieve a user by username
const getUserByUsername = async (username) => {
  const queryText = 'SELECT * FROM users WHERE username = $1';
  const result = await pool.query(queryText, [username]);
  return result.rows[0];
};

module.exports = { createUser, getUserByUsername };
