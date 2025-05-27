const seed = require("./seed");

const {
  propertyTypesData,
  usersData,
  propertiesData,
  reviewsData,
  favouritesData,
  imagesData,
  bookingsData,
} = require("../data/test");

const runSeed = () =>
  seed(
    propertyTypesData,
    usersData,
    propertiesData,
    reviewsData,
    favouritesData,
    imagesData,
    bookingsData
  );

module.exports = runSeed;
