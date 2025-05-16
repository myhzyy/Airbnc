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
  await insertUsers(usersData);

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

  await insertFavourites(favouritesData, usersTableRes, propertiesTableRes);

  //// FAVOURITES IMAGES TABLE ✅

  await createImages();

  await insertImagesTable(imagesData, propertiesTableRes);
}

module.exports = seed;
