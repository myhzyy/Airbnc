const request = require("supertest");
const app = require("../app");

const db = require("../db/connections/dbConnectionPool");
afterAll(async () => {
  await db.end();
});

describe("reviews test", () => {
  test("a get request returns a 200 status code", async () => {
    await request(app).get("/api/reviews").expect(200);
  });

  test("a get request to /api/reviews responds with an array", async () => {
    const { body } = await request(app).get("/api/reviews").expect(200);
    expect(Array.isArray(body.reviews)).toBe(true);
    expect(body.reviews.length > 0).toBe(true);
  });

  //   test("a get request returns an object with the correct keys assigned", async () => {
  //     const { body } = await request(app).get("/api/properties");

  //     body.properties.forEach((properties) => {
  //       expect(properties.hasOwnProperty("property_id")).toBe(true);
  //       expect(properties.hasOwnProperty("property_name")).toBe(true);
  //       expect(properties.hasOwnProperty("location")).toBe(true);
  //       expect(properties.hasOwnProperty("price_per_night")).toBe(true);
  //       expect(properties.hasOwnProperty("host")).toBe(true);
  //     });
  //   });
});
