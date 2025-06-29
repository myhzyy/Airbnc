module.exports = {
  // Property types
  ...require("./createPropertyTypesTable"),

  // Users
  ...require("./createUsersTable"),

  // Properties
  ...require("./createPropertiesTable"),

  // Reviews
  ...require("./createReviewsTable"),

  // Favourites
  ...require("./createFavourites"),

  // Images
  ...require("./createImages"),

  // Amenities
  ...require("./createAmenities.js"),

  // Properties_amenities
  ...require("./createPropertiesAmenities.js"),

  // Bookings
  ...require("./createBookings.js"),

  // Auth Users
  ...require("./createAuthUsersTable"),
};
