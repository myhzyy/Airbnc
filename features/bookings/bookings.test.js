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

describe("GET /api/properties/:id/bookings", () => {
  test("responds with 200 and correct data format", async () => {
    const res = await request(app)
      .get("/api/properties/1/bookings")
      .expect(200);

    expect(res.body).toHaveProperty("bookings");
    expect(res.body.bookings).toHaveProperty("rows");
    expect(res.body.bookings).toHaveProperty("property_id", "1");

    const { rows } = res.body.bookings;
    expect(Array.isArray(rows)).toBe(true);

    if (rows.length > 0) {
      expect(rows[0]).toEqual(
        expect.objectContaining({
          booking_id: expect.any(Number),
          check_in_date: expect.any(String),
          check_out_date: expect.any(String),
          created_at: expect.any(String),
        })
      );
    }
  });

  test(`responds with 400 if property Id doesn't exist`, async () => {
    const res = await request(app)
      .get("/api/properties/999/bookings")
      .expect(404);
  });

  test("responds with `PropertyId not found` if user enters propertyId that does not exist", async () => {
    const res = await request(app).get("/api/properties/999/bookings");
    expect(res.body.msg).toBe("PropertyId not found");
  });

  test("responds with 400 for invalid property ID format", async () => {
    const res = await request(app)
      .get("/api/properties/not-a-number/bookings")
      .expect(404);

    expect(res.body.msg).toBe("PropertyId is not a valid number");
  });
});
