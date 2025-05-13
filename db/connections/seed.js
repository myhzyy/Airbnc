const db = require("./dbConnectionPool");
const format = require("pg-format");
const formatPropertyTypes = require("../utils/formatPropertyTypes");
const formatUsers = require("../utils/formatUsers");
const formatProperties = require("../utils/formatProperties");
const formatReviews = require("../utils/formatReviews");
const formatFavourites = require("../utils/formatFavourites");
const formatImages = require("../utils/formatImages");

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

  await db.query(`CREATE TABLE property_types (
    property_type VARCHAR NOT NULL PRIMARY KEY,
    description TEXT NOT NULL
  )`);

  const formattedData = formatPropertyTypes(propertyTypesData);

  await db.query(
    format(
      `INSERT INTO property_types (property_type, description) VALUES %L `,
      formattedData
    )
  );

  await db.query(`CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    is_host BOOLEAN NOT NULL,
    avatar VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  const formattedUsers = formatUsers(usersData);

  await db.query(
    format(
      `INSERT INTO users (first_name, surname, email, phone_number, is_host, avatar) VALUES %L`,
      formattedUsers
    )
  );

  await db.query(`CREATE TABLE properties (
    property_id SERIAL PRIMARY KEY,
    host_id INT NOT NULL REFERENCES users(user_id),
    name VARCHAR NOT NULL,
    location VARCHAR NOT NULL,
    property_type VARCHAR NOT NULL REFERENCES property_types(property_type),
    price_per_night DECIMAL(10,2) NOT NULL,
    description TEXT
    )`);

  const res = await db.query("SELECT user_id, first_name, surname FROM users");
  const formattedProperties = formatProperties(propertiesData, res.rows);

  await db.query(
    format(
      `INSERT INTO properties (host_id, name, location, property_type, price_per_night, description) VALUES %L`,
      formattedProperties
    )
  );

  await db.query(`CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        property_id INT NOT NULL REFERENCES properties(property_id),
        guest_id INT NOT NULL REFERENCES users(user_id),
        rating INT NULL,
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);

  const propertiesRes = await db.query(
    "SELECT property_id, name FROM properties"
  );
  const propertiesResRows = propertiesRes.rows;
  const userResRows = res.rows;

  const formattedReview = formatReviews(
    propertiesResRows,
    userResRows,
    reviewsData,
    console.log,
    true
  );

  await db.query(
    format(
      `INSERT INTO reviews (
        property_id, guest_id, rating, comment
    ) VALUES %L`,
      formattedReview
    )
  );

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
