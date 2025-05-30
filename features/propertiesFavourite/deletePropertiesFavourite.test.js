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

describe("DELETE /api/properties/:id/favourite", () => {
  test("200: successfully deletes a property", async () => {
    const res = await request(app)
      .delete("/api/properties/1/favourite")
      .expect(200);
  });

  test("404: property ID does not exist", async () => {
    const res = await request(app)
      .delete("/api/properties/9999/favourite")
      .expect(404);

    expect(res.body.msg).toBe("Favourite not found");
  });

  test("400: invalid property ID (not a number)", async () => {
    const res = await request(app)
      .delete("/api/properties/notANumber/favourite")
      .expect(400);

    expect(res.body.msg).toBe("SENT body was NOT a valid. Try using a number.");
  });
});
