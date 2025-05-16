const db = require("../connections/dbConnectionPool");
const format = require("pg-format");
const formatReview = require("../utils/formatReviews");

async function createReviewsTable() {
  await db.query(`CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        property_id INT NOT NULL REFERENCES properties(property_id),
        guest_id INT NOT NULL REFERENCES users(user_id),
        rating INT NULL,
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
}

async function insertReviews(propertiesTableRes, usersTableRes, reviewsData) {
  const propertiesTableResRows = propertiesTableRes.rows;
  const usersTableResRows = usersTableRes.rows;

  const formattedReview = formatReview(
    propertiesTableResRows,
    usersTableResRows,
    reviewsData
  );

  await db.query(
    format(
      `INSERT INTO reviews (
        property_id, guest_id, rating, comment
    ) VALUES %L`,
      formattedReview
    )
  );
}

module.exports = { createReviewsTable, insertReviews };
