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

describe("DELETE /api/properties/:id/users/:user_id/favourite", () => {
  test("responds with status 204 when successfully deletes a favourite", async () => {
    await request(app)
      .delete("/api/properties/1/users/1/favourite")
      .expect(204);
  });

  test("404: favourite not found for valid IDs", async () => {
    const res = await request(app)
      .delete("/api/properties/9999/users/1/favourite")
      .expect(404);

    expect(res.body.msg).toBe("Favourite not found");
  });

  test("400: invalid property ID (not a number)", async () => {
    const res = await request(app)
      .delete("/api/properties/notANumber/users/1/favourite")
      .expect(400);

    expect(res.body.msg).toBe("Invalid property_id or user_id");
  });
});
