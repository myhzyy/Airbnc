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

seed(
  propertyTypesData,
  usersData,
  propertiesData,
  reviewsData,
  favouritesData,
  imagesData,
  bookingsData
);
