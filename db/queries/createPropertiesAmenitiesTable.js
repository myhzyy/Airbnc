const db = require("../connections/dbConnectionPool");
const format = require("pg-format");
// const formatPropertiesAmenities = require("../utils/formatFavourites");

async function createPropertiesAmenities() {
  await db.query(`CREATE TABLE properties_amenities(
        property_amenity SERIAL PRIMARY KEY,
        property_id INT NOT NULL REFERENCES properties(property_id),
        amenity_slug VARCHAR NOT NULL REFERENCES amenities (amenity_slug)
  )`);
}

module.exports = { createPropertiesAmenities };
