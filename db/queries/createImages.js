const db = require("../connections/dbConnectionPool");
const format = require("pg-format");
const formatImages = require("../utils/formatImages");

async function createImagesTable() {
  await db.query(`CREATE TABLE images (
        image_id SERIAL PRIMARY KEY,
        property_id INT NOT NULL,
        image_url VARCHAR NOT NULL,
        alt_text VARCHAR NOT NULL
      )`);
}

async function insertImages(imagesData, propertiesTableRes) {
  const propertiesTableResRows = propertiesTableRes.rows;

  const formattedImages = formatImages(imagesData, propertiesTableResRows);

  await db.query(
    format(
      `INSERT INTO images (
        property_id, image_url, alt_text
      ) VALUES %L`,
      formattedImages
    )
  );
}

module.exports = { createImagesTable, insertImages };
