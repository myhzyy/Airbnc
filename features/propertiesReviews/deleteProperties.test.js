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

describe("DELETE /api/properties/:id/reviews", () => {
  test("204 No Content on successful deletion", async () => {
    const log = await request(app)
      .delete("/api/properties/9/reviews")
      .expect(200);
  });

  test("DELETE /api/properties/1/reviews deletes from table and returns deleted object", async () => {
    const res = await request(app).delete("/api/properties/3/reviews");
    expect(res.body).toHaveProperty("deleted");
    expect(Array.isArray(res.body.deleted)).toBe(true);
    expect(res.body.deleted.length).toBeGreaterThan(0);
    expect(res.body.deleted[0]).toHaveProperty("review_id");
  });

  test("DELETE /api/properties/:id/reviews returns 400 if no reviews exist for that property", async () => {
    const res = await request(app)
      .delete("/api/properties/9999/reviews")
      .expect(400);

    expect(res.body).toHaveProperty(
      "msg",
      "No reviews found for the given property_id"
    );
  });
});
