const db = require("./dbConnectionPool");
const format = require("pg-format");
const formatPropertyTypes = require("../utils/formatPropertyTypes");
const formatUsers = require("../utils/formatUsers");

async function seed(propertiesData, usersData) {
  await db.query(`DROP TABLE IF EXISTS properties;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS property_types;`);

  await db.query(`CREATE TABLE property_types (
    property_type VARCHAR NOT NULL PRIMARY KEY,
    description TEXT NOT NULL
  )`);

  const formattedData = formatPropertyTypes(propertiesData);

  await db.query(
    format(
      `INSERT INTO property_types (property_type, description) VALUES %L `,
      formattedData
    )
  );

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

  const formattedUsers = formatUsers(usersData);

  await db.query(
    format(
      `INSERT INTO users (first_name, surname, email, phone_number, is_host, avatar) VALUES %L`,
      formattedUsers
    )
  );

  await db.query(`CREATE TABLE properties (
    property_id SERIAL PRIMARY KEY,
    host_id INT NOT NULL,
    name VARCHAR NOT NULL,
    location VARCHAR NOT NULL,
    property_type VARCHAR NOT NULL REFERENCES property_types(property_type),
    price_per_night DECIMAL(10,2) NOT NULL,
    description TEXT
  )`);

  console.log("Success!");
}

module.exports = seed;
