const db = require("../connections/dbConnectionPool");
const format = require("pg-format");

async function createAmenitiesTable() {
  await db.query(`CREATE TABLE amenities(
      amenity VARCHAR PRIMARY KEY)`);
}

async function insertAmenities(propertiesData) {
  const allAmenities = propertiesData.flatMap((property) => {
    return property.amenities;
  });

  const uniqueAmenities = [...new Set(allAmenities)];
  const formattedAmenities = uniqueAmenities.map((a) => [a]);

  await db.query(
    format(`INSERT INTO amenities(amenity) VALUES %L`, formattedAmenities)
  );
}

module.exports = { createAmenitiesTable, insertAmenities };
