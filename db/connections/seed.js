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

const {
  createFavouritesTable,
  insertFavouritesTable,
} = require("../queries/createFavourites");

const {
  createImagesTable,
  insertImagesTable,
} = require("../queries/createImages");

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

  ///  PROPERTYTYPES TABLE ✅

  await createPropertyTypesTable();
  await insertPropertyTypes(propertyTypesData);

  /// USERS TABLE ✅

  await createUsersTable();
  await insertUsersTable(usersData);

  //// PROPERTY TABLE ✅

  await createPropertyTable();
  const usersTableRes = await db.query(
    "SELECT user_id, first_name, surname FROM users"
  );
  await insertProperty(propertiesData, usersTableRes);

  //// REVIEW TABLE ✅

  await createReviewsTable();

  const propertiesTableRes = await db.query(
    "SELECT property_id, name FROM properties"
  );

  await insertReviews(propertiesTableRes, usersTableRes, reviewsData);

  //// FAVOURITES TABLE ✅

  await createFavouritesTable();

  await insertFavouritesTable(
    favouritesData,
    usersTableRes,
    propertiesTableRes
  );

  //// FAVOURITES IMAGES TABLE ✅

  await createImagesTable();

  await insertImagesTable(imagesData, propertiesTableRes);
}

module.exports = seed;
