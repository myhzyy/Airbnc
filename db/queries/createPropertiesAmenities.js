const db = require("../connections/dbConnectionPool");
const format = require("pg-format");
const formatPropertiesAmenities = require("../utils/formatPropertiesAmenities");

async function createPropertiesAmenities() {
  await db.query(`CREATE TABLE properties_amenities (
    property_amenities SERIAL PRIMARY KEY,
    property_id INT NOT NULL REFERENCES properties(property_id),
    amenity_slug VARCHAR NOT NULL REFERENCES amenities(amenity)
    ) `);
}

async function insertPropertiesAmenities(propIdRes, propertiesData) {
  const formattedPropertiesAmenities = formatPropertiesAmenities(
    propIdRes,
    propertiesData
  );

  await db.query(
    format(
      `INSERT INTO properties_amenities(
      property_id ,amenity_slug) VALUES %L`,
      formattedPropertiesAmenities
    )
  );
}

module.exports = { createPropertiesAmenities, insertPropertiesAmenities };
