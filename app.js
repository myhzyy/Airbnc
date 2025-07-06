const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

// Properties

const {
  getProperties,
} = require("./features/properties/controllers/getProperties.controller");
const {
  postReviews,
} = require("./features/properties/controllers/postProperties.controller");
const {
  getPropertyId,
} = require("./features/propertiesId/controller/propertiesId.controller");
const {
  getPropertiesSortedByPriceLowToHigh,
} = require("./features/propertiesFilter/controller/propertiesFilterLowToHigh.controller");
const {
  getPropertiesSortedByPriceHighToLow,
} = require("./features/propertiesFilter/controller/propertiesFilterHighToLow.controller");

// Reviews
const {
  getReviewsByPropertyId,
} = require("./features/propertiesReviews/controllers/propertiesReviews.controller");
const {
  deleteReview,
} = require("./features/propertiesReviews/controllers/deleteReviews.controller");

// Users
const {
  getUsersId,
} = require("./features/users/getUsersId/controller/getUsersid.controller");
const {
  patchUserId,
} = require("./features/users/getUsersId/controller/patchUserId.controller");

const {
  getUserStatsController,
} = require("./features/users/getUsersId/controller/getUserStats.controller");

// Auth
const { signup } = require("./features/auth/controller/auth.controller");
const { login } = require("./features/auth/controller/login.controller");

// Favourites
const {
  postFavourite,
} = require("./features/propertiesFavourite/controller/postPropertiesFavourite.controller");
const {
  deleteFavourite,
} = require("./features/propertiesFavourite/controller/deletePropertiesFavourite.controller");

// Bookings
const {
  getBookings,
} = require("./features/bookings/controller/bookings.controller");

const {
  getBookingsByUserId,
} = require("./features/bookings/controller/getBookingsByUserId.controller");

const {
  postBooking,
} = require("./features/bookings/controller/postBookings.controller");

// Amenities
const {
  getAmenities,
} = require("./features/amenities/controller/amenities.controller");
const {
  getAmenitiesByPropertyId,
} = require("./features/amenities/controller/propertiesAmenities.controller");

// Errors
const { handlePathNotFound } = require("./features/errors/errors");

// Routes
app.get("/api/properties", getProperties);
app.get("/api/properties/:id", getPropertyId);
app.get("/api/properties/:id/reviews", getReviewsByPropertyId);
app.get("/api/properties/:id/amenities", getAmenitiesByPropertyId);
app.get("/api/properties/:id/bookings", getBookings);
app.get("/api/users/:user_id/bookings", getBookingsByUserId);

app.post("/api/properties/:id/reviews", postReviews);
app.post("/api/properties/:id/favourite", postFavourite);
app.delete("/api/properties/:id/users/:user_id/favourite", deleteFavourite);

app.get(
  "/api/properties/sort/price-low-high",
  getPropertiesSortedByPriceLowToHigh
);
app.get(
  "/api/properties/sort/price-high-low",
  getPropertiesSortedByPriceHighToLow
);

app.get("/api/users/:id/stats", getUserStatsController);

app.get("/api/amenities", getAmenities);

app.get("/api/users/:id", getUsersId);
app.patch("/api/users/:id", patchUserId);

app.post("/api/auth/signup", signup);
app.post("/api/auth/login", login);
app.post("/api/properties/:id/bookings", postBooking);

app.delete("/api/reviews/:id", deleteReview);

// Fallback & Error Handling
app.all("*invalid-path", handlePathNotFound);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res
    .status(status)
    .send({ msg: err.message || "Internal Server Error or path not found" });
});

// Start Server
if (require.main === module) {
  app.listen(9090, () => {
    console.log("Server listening on port 9090");
  });
}

module.exports = app;
