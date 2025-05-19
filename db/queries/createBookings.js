const db = require("../connections/dbConnectionPool");
const format = require("pg-format");
const formatBookings = require("../utils/formatBookings");

async function createBookingsTable() {
  await db.query(`CREATE TABLE bookings (
        booking_id SERIAL PRIMARY KEY,
        property_id INT NOT NULL REFERENCES properties (property_id),
        guest_id INT NOT NULL REFERENCES users(user_id),
        check_in_date DATE NOT NULL,
        check_out_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
}

async function insertBookingsTable(
  propertiesTableRes,
  bookingsData,
  usersTableRes
) {
  const propertiesTableResrows = propertiesTableRes.rows;
  const usersTableResrows = usersTableRes.rows;

  const formattedBookings = formatBookings(
    propertiesTableResrows,
    usersTableResrows,
    bookingsData
  );

  await db.query(
    format(
      `INSERT INTO bookings (
    property_id, guest_id, check_in_date, check_out_date) VALUES %L`,
      formattedBookings
    )
  );
}

module.exports = { createBookingsTable, insertBookingsTable };
