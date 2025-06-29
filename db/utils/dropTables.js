const db = require("../connections/dbConnectionPool");

async function dropTables() {
  const tables = [
    "auth_users",
    "properties_amenities",
    "bookings",
    "favourites",
    "reviews",
    "images",
    "amenities",
    "properties",
    "users",
    "property_types",
  ];

  for (const table of tables) {
    await db.query(`DROP TABLE IF EXISTS ${table} CASCADE;`);
  }
}

module.exports = dropTables;
