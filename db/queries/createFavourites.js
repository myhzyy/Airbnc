const db = require("../connections/dbConnectionPool");
const format = require("pg-format");
const formatFavourites = require("../utils/formatFavourites");

async function createFavouritesTable() {
  await db.query(`CREATE TABLE favourites(
        favourite_id SERIAL PRIMARY KEY,
        guest_id INT NOT NULL REFERENCES users(user_id),
        property_id INT NOT NULL REFERENCES properties(property_id)
    )`);
}

async function insertFavourites(
  favouritesData,
  usersTableRes,
  propertiesTableRes
) {
  const usersTableResRows = usersTableRes.rows;
  const propertiesTableResRows = propertiesTableRes.rows;

  const formattedFavourites = formatFavourites(
    favouritesData,
    usersTableResRows,
    propertiesTableResRows
  );

  await db.query(
    format(
      `INSERT INTO favourites (
          guest_id, property_id) VALUES %L`,
      formattedFavourites
    )
  );
}

module.exports = { createFavouritesTable, insertFavourites };
