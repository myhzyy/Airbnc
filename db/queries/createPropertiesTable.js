const db = require("../connections/dbConnectionPool");
const format = require("pg-format");
const formatProperty = require("../utils/formatProperties");

async function createPropertyTable() {
  await db.query(`CREATE TABLE properties (
        property_id SERIAL PRIMARY KEY,
        host_id INT NOT NULL REFERENCES users(user_id),
        name VARCHAR NOT NULL,
        location VARCHAR NOT NULL,
        property_type VARCHAR NOT NULL REFERENCES property_types(property_type),
        price_per_night DECIMAL(10,2) NOT NULL,
        description TEXT
        )`);
}

async function insertProperty(PropertyData, usersTableRes) {
  const formattedProperty = formatProperty(PropertyData, usersTableRes.rows);

  await db.query(
    format(
      `INSERT INTO properties (host_id, name, location, property_type, price_per_night, description) VALUES %L`,
      formattedProperty
    )
  );
}

module.exports = { createPropertyTable, insertProperty };
