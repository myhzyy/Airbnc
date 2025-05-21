const express = require("express");

const {
  getProperties,
} = require("./features/properties/properties.controller");

const {
  getReviews,
} = require("./features/propertiesReviews/propertiesReviews.controller");

const { handlePathNotFound } = require("./features/errors/errors");

const app = express();

app.get("/api/properties", getProperties); /// DONE ✅
app.get("/api/properties/:id", getProperties); /// next TO Do

app.get("/api/reviews", getReviews);
app.all("*invalid-path", handlePathNotFound); /// TO FIX

if (require.main === module) {
  app.listen(9090, () => {
    console.log("Server listening on port 9090");
  });
}

module.exports = app;
