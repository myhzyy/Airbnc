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
describe("properties test", () => {
  test("a get request to our database returns 200", async () => {
    await request(app).get("/api/properties").expect(200);
  });

  test("a get request to /api/artists responds with an array", async () => {
    const { body } = await request(app).get("/api/properties").expect(200);
    expect(Array.isArray(body.properties)).toBe(true);
    expect(body.properties.length > 0).toBe(true);
  });

  test("a get request returns an object with the correct keys assigned", async () => {
    const { body } = await request(app).get("/api/properties");

    body.properties.forEach((properties) => {
      expect(properties.hasOwnProperty("property_id")).toBe(true);
      expect(properties.hasOwnProperty("property_name")).toBe(true);
      expect(properties.hasOwnProperty("location")).toBe(true);
      expect(properties.hasOwnProperty("price_per_night")).toBe(true);
      expect(properties.hasOwnProperty("host")).toBe(true);
    });
  });

  test("a get request returns the correct shape", async () => {
    const { body } = await request(app).get("/api/properties");

    body.properties.forEach((properties) => {
      expect(properties).toEqual(
        expect.objectContaining({
          property_id: expect.any(Number),
          property_name: expect.any(String),
          location: expect.any(String),
          price_per_night: expect.any(String),
          host: expect.any(String),
        })
      );
    });
  });

  test("a response includes specific properties with exact values", async () => {
    const { body } = await request(app).get("/api/properties");

    const expectedResult = [
      {
        property_id: 1,
        property_name: "Modern Apartment in City Center",
        location: "London, UK",
        price_per_night: "120.00",
        host: "Alice Johnson",
        favourite_count: "1",
        image: "https://example.com/images/modern_apartment_1.jpg",
      },
    ];

    expectedResult.forEach((expectedProperties) => {
      expect(body.properties).toContainEqual(expectedProperties);
    });
  });

  test("a get request returns the correct shape", async () => {
    const { body } = await request(app).get("/api/properties");

    body.properties.forEach((properties) => {
      expect(properties).toEqual(
        expect.objectContaining({
          property_id: expect.any(Number),
          property_name: expect.any(String),
          location: expect.any(String),
          price_per_night: expect.any(String),
          host: expect.any(String),
        })
      );
    });
  });

  test("GET /api/properties?amenity returns only properties with that specified amenity (e.g WIFI)", async () => {
    const { body } = await request(app)
      .get("/api/properties?amenity=WIFI")
      .expect(200);

    body.properties.forEach((property) => {
      expect(property).toEqual(
        expect.objectContaining({
          property_id: expect.any(Number),
          property_name: expect.any(String),
          location: expect.any(String),
          price_per_night: expect.any(String),
          host: expect.any(String),
          favourite_count: expect.any(String),
          image: expect.any(String),
        })
      );
    });
  });

  test("returns an empty array if no properties match the given amenity", async () => {
    const { body } = await request(app)
      .get("/api/properties?amenity=Helipad")
      .expect(200);
    expect(body.properties).toEqual([]);
  });

  test("returns only properties that have the specified amenity (e.g. WiFi)", async () => {
    const { body } = await request(app)
      .get("/api/properties?amenity=WiFi")
      .expect(200);

    const expectedIds = [1, 2, 3, 5, 6, 8, 9, 10, 11];

    body.properties.forEach((property) => {
      expect(expectedIds).toContain(property.property_id);
    });
  });
});
