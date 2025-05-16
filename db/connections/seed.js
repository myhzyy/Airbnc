const db = require("./dbConnectionPool");

const {
  createPropertyTypesTable,
  insertPropertyTypes,
  createUsersTable,
  insertUsers,
  createPropertyTable,
  insertProperty,
  createReviewsTable,
  insertReviews,
  createFavouritesTable,
  insertFavourites,
  createImages,
  insertImagesTable,
} = require("../queries");

const dropTables = require("../utils/dropTables");

async function seed(
  propertyTypesData,
  usersData,
  propertiesData,
  reviewsData,
  favouritesData,
  imagesData,
  amenities
) {
  ///  DROP ALL TABLES TABLES

  await dropTables();

  ///  PROPERTYTYPES TABLE

  await createPropertyTypesTable();
  await insertPropertyTypes(propertyTypesData);

  /// USERS TABLE

  await createUsersTable();
  await insertUsers(usersData);

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

  //// FAVOURITES TABLE

  await createFavouritesTable();

  await insertFavourites(favouritesData, usersTableRes, propertiesTableRes);

  //// FAVOURITES IMAGES TABLE

  await createImages();

  await insertImagesTable(imagesData, propertiesTableRes);
}

module.exports = seed;
