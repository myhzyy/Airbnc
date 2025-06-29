const db = require("../connections/dbConnectionPool");
const format = require("pg-format");

async function createAuthUsersTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS auth_users (
        auth_user_id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (err) {
    console.error("Failed to create auth_users table:", err);
  }
}

async function insertAuthUsers(authUsersData) {
  const formattedUsers = authUsersData.map(({ email, hashed_password }) => [
    email,
    hashed_password,
  ]);

  await db.query(
    format(
      `INSERT INTO auth_users (email, password_hash) VALUES %L`,
      formattedUsers
    )
  );
}

module.exports = { createAuthUsersTable, insertAuthUsers };
