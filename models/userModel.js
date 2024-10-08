const { Pool } = require('pg');
const pool = new Pool();

module.exports = {
  async createUser(username, password) {
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
    const result = await pool.query(query, [username, password]);
    return result.rows[0];
  },
  
  async findUserByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);
    return result.rows[0];
  }
};
