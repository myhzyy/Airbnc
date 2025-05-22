const express = require("express");

const {
  getProperties,
} = require("./features/properties/controllers/properties.controller");

const {
  getReviewsByPropertyId,
} = require("./features/propertiesReviews/controllers/propertiesReviews.controller");

const {
  getPropertyId,
} = require("./features/propertiesId/controller/propertiesId.controller");

const { handlePathNotFound } = require("./features/errors/errors");

const app = express();

app.get("/api/properties", getProperties); /// DONE ✅
app.get("/api/properties/:id/reviews", getReviewsByPropertyId); /// DONE ✅

app.get("/api/properties/:id", getPropertyId);

app.all("*invalid-path", handlePathNotFound); /// TO FIX

if (require.main === module) {
  app.listen(9090, () => {
    console.log("Server listening on port 9090");
  });
}

module.exports = app;
