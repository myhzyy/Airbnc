const seed = require("./seed");

const {
  propertyTypesData,
  usersData,
  propertiesData,
  reviewsData,
  favouritesData,
  imagesData,
  bookingsData,
  authUsersData,
} = require("../data/dev");

const formatAuthUsers = require("../utils/formatAuthUsers");

(async () => {
  const formattedAuthUsers = await formatAuthUsers(authUsersData);

  seed(
    propertyTypesData,
    usersData,
    propertiesData,
    reviewsData,
    favouritesData,
    imagesData,
    bookingsData,
    formattedAuthUsers
  );
})();
