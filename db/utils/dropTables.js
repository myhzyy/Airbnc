const db = require("../connections/dbConnectionPool");

async function dropTables() {
  const tables = [
    "amenities",
    "images",
    "favourites",
    "reviews",
    "properties",
    "users",
    "property_types",
  ];

  for (const table of tables) {
    await db.query(`DROP TABLE IF EXISTS ${table};`);
  }
}

module.exports = dropTables;
