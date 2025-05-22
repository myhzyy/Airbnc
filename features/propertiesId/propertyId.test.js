const request = require("supertest");
const app = require("../../app");

const db = require("../../db/connections/dbConnectionPool");

afterAll(async () => {
  await db.end();
});

describe("PropertiesID tests", () => {
  test("a get request returns status code of 200", async () => {
    await request(app).get("/api/properties/1").expect(200);
  });

  test("a get request to /api/properties/1 responds with an array", async () => {
    const { body } = await request(app).get("/api/properties/1").expect(200);
    expect(Array.isArray(body.propertyId)).toBe(true);

    console.log(body);
  });

  test("a get request returns an object with the correct keys assigned", async () => {
    const { body } = await request(app).get("/api/properties/1");

    body.propertyId.forEach((propertiesId) => {
      expect(propertiesId.hasOwnProperty("property_id")).toBe(true);
      expect(propertiesId.hasOwnProperty("property_name")).toBe(true);
      expect(propertiesId.hasOwnProperty("location")).toBe(true);
      expect(propertiesId.hasOwnProperty("price_per_night")).toBe(true);
      expect(propertiesId.hasOwnProperty("host")).toBe(true);
      expect(propertiesId.hasOwnProperty("host_avatar")).toBe(true);
      expect(propertiesId.hasOwnProperty("favourite_count")).toBe(true);
    });
  });

  test("a get request returns the correct shape", async () => {
    const { body } = await request(app).get("/api/properties/1");

    body.propertyId.forEach((property) => {
      expect(property).toEqual(
        expect.objectContaining({
          property_id: expect.any(Number),
          property_name: expect.any(String),
          location: expect.any(String),
          price_per_night: expect.any(String),
          description: expect.any(String),
          host: expect.any(Number),
          host_avatar: expect.any(String),
          favourite_count: expect.any(String),
        })
      );
    });
  });

  test("a response includes specific properties with exact values", async () => {
    const { body } = await request(app).get("/api/properties/1");

    const expectedResult = [
      {
        property_id: 1,
        property_name: "Modern Apartment in City Center",
        location: "London, UK",
        price_per_night: "120.00",
        description: "Description of Modern Apartment in City Center.",
        host: 1,
        host_avatar: "https://example.com/images/alice.jpg",
        favourite_count: "1",
      },
      {
        property_id: 2,
        property_name: "Cosy Family House",
        location: "Manchester, UK",
        price_per_night: "150.00",
        description: "Description of Cosy Family House.",
        host: 1,
        host_avatar: "https://example.com/images/alice.jpg",
        favourite_count: "1",
      },
    ];

    expectedResult.forEach((expectedProperty) => {
      expect(body.propertyId).toContainEqual(expectedProperty);
    });
  });

  test("a get request returns the correct shape (duplicate test)", async () => {
    const { body } = await request(app).get("/api/properties/1");

    body.propertyId.forEach((property) => {
      expect(property).toEqual(
        expect.objectContaining({
          property_id: expect.any(Number),
          property_name: expect.any(String),
          location: expect.any(String),
          price_per_night: expect.any(String),
          host: expect.any(Number),
        })
      );
    });
  });

  test("a get request accepts optional query that displays true or false as to if the user has favourited this property or not", () => {});
});
