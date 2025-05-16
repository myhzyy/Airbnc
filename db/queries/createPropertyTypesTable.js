const db = require("../connections/dbConnectionPool");
const format = require("pg-format");
const formatPropertyTypes = require("../utils/formatPropertyTypes");

async function createPropertyTypesTable() {
  await db.query(`CREATE TABLE property_types (
        property_type VARCHAR NOT NULL PRIMARY KEY,
        description TEXT NOT NULL
    )`);
}

async function insertPropertyTypes(PropertyTypesdata) {
  const propertyTypesFormatted = formatPropertyTypes(PropertyTypesdata);

  await db.query(
    format(
      `INSERT INTO property_types (property_type,description) VALUES %L`,
      propertyTypesFormatted
    )
  );
}

module.exports = { createPropertyTypesTable, insertPropertyTypes };
