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
  createImagesTable,
  insertImages,
  createAmenitiesTable,
  insertAmenities,
  createPropertiesAmenities,
  insertPropertiesAmenities,
  createBookingsTable,
  insertBookingsTable,
} = require("../queries");

const dropTables = require("../utils/dropTables");

async function seed(
  propertyTypesData,
  usersData,
  propertiesData,
  reviewsData,
  favouritesData,
  imagesData,
  bookingsData
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

  await createImagesTable();

  await insertImages(imagesData, propertiesTableRes);

  //// AMENITIES TABLE

  await createAmenitiesTable();

  await insertAmenities(propertiesData);

  //// PROPERTIES_AMENITIES TABLE

  await createPropertiesAmenities();

  const propIdRes = await db.query("SELECT property_id, name from properties");
  const ameneitesSlug = await db.query("SELECT * from amenities");

  await insertPropertiesAmenities(propIdRes, propertiesData);

  //// BOOKINGS TABLE

  await createBookingsTable();

  await insertBookingsTable(propertiesTableRes, bookingsData, usersTableRes);
}

module.exports = seed;
