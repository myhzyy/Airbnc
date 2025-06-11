const request = require("supertest");
const app = require("../../app");
const db = require("../../db/connections/dbConnectionPool");

const seed = require("../../db/connections/seed");
const {
  propertyTypesData,
  usersData,
  propertiesData,
  reviewsData,
  favouritesData,
  imagesData,
  bookingsData,
} = require("../../db/data/test");

afterAll(async () => {
  await db.end();
});

beforeEach(async () => {
  await seed(
    propertyTypesData,
    usersData,
    propertiesData,
    reviewsData,
    favouritesData,
    imagesData,
    bookingsData
  );
});

describe("amenities test", () => {
  test("GET /api/amenities returns status 200", async () => {
    const { body } = await request(app).get("/api/amenities").expect(200);
  });
  test("GET /api/amenities returns list of all amenities", async () => {
    const { body } = await request(app).get("/api/amenities");

    expect(body.amenities).toEqual([
      { amenity_slug: "WiFi" },
      { amenity_slug: "TV" },
      { amenity_slug: "Kitchen" },
      { amenity_slug: "Parking" },
      { amenity_slug: "Washer" },
    ]);
  });
});
