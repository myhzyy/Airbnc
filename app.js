const express = require("express");

const {
  getProperties,
} = require("./features/properties/properties.controller");

const app = express();

app.get("/api/properties", getProperties);

if (require.main === module) {
  app.listen(9090, () => {
    console.log("Server listening on port 9090");
  });
}

module.exports = app;
