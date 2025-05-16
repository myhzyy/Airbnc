const db = require("../connections/dbConnectionPool");
const format = require("pg-format");
const formatUsers = require("../utils/formatUsers");

async function createUsersTable() {
  await db.query(`CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        surname VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone_number VARCHAR(20),
        is_host BOOLEAN NOT NULL,
        avatar VARCHAR,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
}

async function insertUsersTable(usersData) {
  const formattedUsers = formatUsers(usersData);

  await db.query(
    format(
      `INSERT INTO users (first_name, surname, email, phone_number, is_host, avatar) VALUES %L`,
      formattedUsers
    )
  );
}

module.exports = { createUsersTable, insertUsersTable };
