const express = require("express");
const app = express();

app.use(express.json());

const {
  getProperties,
} = require("./features/properties/controllers/getProperties.controller");

const {
  getReviewsByPropertyId,
} = require("./features/propertiesReviews/controllers/propertiesReviews.controller");

const {
  getPropertyId,
} = require("./features/propertiesId/controller/propertiesId.controller");

const {
  getUsersId,
} = require("./features/users/getUsersId/controller/getUsersid.controller");

const {
  postReviews,
} = require("./features/properties/controllers/postProperties.controller");

const {
  deleteReview,
} = require("./features/propertiesReviews/controllers/deleteReviews.controller");

const { handlePathNotFound } = require("./features/errors/errors");

app.get("/api/properties", getProperties); /// DONE ✅
app.get("/api/properties/:id/reviews", getReviewsByPropertyId); /// DONE ✅
app.get("/api/properties/:id", getPropertyId); /// DONE ✅
app.get("/api/users/:id", getUsersId); /// DONE ✅
app.post("/api/properties/:id/reviews", postReviews); /// DONE ✅

app.delete("/api/properties/:id/reviews", deleteReview);

app.all("*invalid-path", handlePathNotFound); /// TO FIX

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send({ msg: err.message || "Internal Server Error" });
});

if (require.main === module) {
  app.listen(9090, () => {
    console.log("Server listening on port 9090");
  });
}

module.exports = app;
