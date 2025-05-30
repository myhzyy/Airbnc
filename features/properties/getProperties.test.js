const request = require("supertest");
const app = require("../../app");
const db = require("../../db/connections/dbConnectionPool");

const seed = require("../../db/connections/seed-run");

afterAll(async () => {
  await db.end();
});

beforeEach(async () => {
  await seed();
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
});
