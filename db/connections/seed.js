const db = require("./dbConnectionPool");
const format = require("pg-format");
const formatPropertyTypes = require("../utils/formatPropertyTypes");
const formatUsers = require("../utils/formatUsers");
const formatProperties = require("../utils/formatProperties");
const formatReviews = require("../utils/formatReviews");
const formatFavourites = require("../utils/formatFavourites");
const formatImages = require("../utils/formatImages");
const {
  createPropertyTypesTable,
  insertPropertyTypes,
} = require("../queries/createPropertyTypesTable");

const {
  createUsersTable,
  insertUsersTable,
} = require("../queries/createUsersTable");

const {
  createPropertyTable,
  insertProperty,
} = require("../queries/createPropertiesTable");

const {
  createReviewsTable,
  insertReviews,
} = require("../queries/createReviewsTable");

async function seed(
  propertyTypesData,
  usersData,
  propertiesData,
  reviewsData,
  favouritesData,
  imagesData,
  amenities
) {
  await db.query(`DROP TABLE IF EXISTS amenities;`);
  await db.query(`DROP TABLE IF EXISTS images;`);
  await db.query(`DROP TABLE IF EXISTS favourites;`);
  await db.query(`DROP TABLE IF EXISTS reviews;`);
  await db.query(`DROP TABLE IF EXISTS properties;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS property_types;`);

  ///  PROPERTYTYPES TABLE

  await createPropertyTypesTable();
  await insertPropertyTypes(propertyTypesData);

  /// USERS TABLE

  await createUsersTable();
  await insertUsersTable(usersData);

  //// PROPERTY TABLE

  await createPropertyTable();
  const usersTableRes = await db.query(
    "SELECT user_id, first_name, surname FROM users"
  );
  await insertProperty(propertiesData, usersTableRes);

  //// REVIEW TABLE

  await createReviewsTable();

  const propertiesTableRes = await db.query(
    "SELECT property_id, name FROM properties"
  );

  await insertReviews(propertiesTableRes, usersTableRes, reviewsData);

  //////  //////  //////  //////  //////

  await db.query(`CREATE TABLE favourites(
      favourite_id SERIAL PRIMARY KEY,
      guest_id INT NOT NULL REFERENCES users(user_id),
      property_id INT NOT NULL REFERENCES properties(property_id)
  )`);

  const userIdDbData = await db.query(
    "SELECT user_id, first_name, surname FROM users"
  );
  const userIdDbDataRows = userIdDbData.rows;

  const propertiesDbData = await db.query(
    "SELECT property_id, name FROM properties"
  );
  const propertiesDbDataRows = propertiesDbData.rows;

  const formattedFavourites = formatFavourites(
    favouritesData,
    userIdDbDataRows,
    propertiesDbDataRows
  );

  await db.query(
    format(
      `INSERT INTO favourites (
      guest_id, property_id) VALUES %L`,
      formattedFavourites
    )
  );

  ///////  ///////  ///////  ///////  ///////  ///////

  await db.query(`CREATE TABLE images (
    image_id SERIAL PRIMARY KEY,
    property_id INT NOT NULL,
    image_url VARCHAR NOT NULL,
    alt_text VARCHAR NOT NULL
  )`);

  const formattedImages = formatImages(imagesData, propertiesDbDataRows);

  await db.query(
    format(
      `INSERT INTO images (
    property_id, image_url, alt_text
  ) VALUES %L`,
      formattedImages
    )
  );

  /// CREATE AMENITIES

  // await db.query(`CREATE TABLE amenities (
  //   amenities VARCHAR PRIMARY KEY
  // )`);
}

module.exports = seed;
