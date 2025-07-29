const path = require("path");
const seed = require("./seed");

const ENV = process.env.NODE_ENV || "dev";
const dataPath = ENV === "production" ? "../data/dev" : "../data/test";

const {
  propertyTypesData,
  usersData,
  propertiesData,
  reviewsData,
  favouritesData,
  imagesData,
  bookingsData,
  authUsersData,
} = require(dataPath);

const formatAuthUsers = require("../utils/formatAuthUsers");

(async () => {
  try {
    const formattedAuthUsers = await formatAuthUsers(authUsersData);

    await seed(
      propertyTypesData,
      usersData,
      propertiesData,
      reviewsData,
      favouritesData,
      imagesData,
      bookingsData,
      formattedAuthUsers
    );

    console.log("✅ Seed complete");
  } catch (err) {
    console.error("❌ Seed failed:", err);
  }
})();
