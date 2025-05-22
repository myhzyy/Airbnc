const request = require("supertest");
const app = require("../app");

const db = require("../db/connections/dbConnectionPool");
afterAll(async () => {
  await db.end();
});

describe("reviews test", () => {
  test("GET /api/properties/:id/reviews responds with reviews and average_rating", async () => {
    const { body } = await request(app)
      .get("/api/properties/1/reviews")
      .expect(200);
  });

  test("GET /api/properties/:id/reviews responds with an array", async () => {
    const { body } = await request(app)
      .get("/api/properties/1/reviews")
      .expect(200);

    expect(Array.isArray(body.reviews)).toBe(true);
  });

  test("GET /api/properties/:id/reviews returns review objects with the correct keys", async () => {
    const { body } = await request(app)
      .get("/api/properties/1/reviews")
      .expect(200);

    body.reviews.forEach((review) => {
      expect(review.hasOwnProperty("review_id")).toBe(true);
      expect(review.hasOwnProperty("comment")).toBe(true);
      expect(review.hasOwnProperty("rating")).toBe(true);
      expect(review.hasOwnProperty("created_at")).toBe(true);
      expect(review.hasOwnProperty("guest")).toBe(true);
      expect(review.hasOwnProperty("guest_avatar")).toBe(true);
    });
  });

  test("GET /api/properties/:id/reviews returns reviews with correct shape", async () => {
    const { body } = await request(app)
      .get("/api/properties/1/reviews")
      .expect(200);

    body.reviews.forEach((review) => {
      expect(review).toEqual(
        expect.objectContaining({
          review_id: expect.any(Number),
          comment: expect.any(String),
          rating: expect.any(Number),
          created_at: expect.any(String),
          guest: expect.any(String),
          guest_avatar: expect.any(String),
        })
      );
    });
  });

  test("average_rating is a numeric string", async () => {
    const { body } = await request(app)
      .get("/api/properties/1/reviews")
      .expect(200);

    expect(typeof body.average_rating).toBe("string");
    expect(!isNaN(parseFloat(body.average_rating))).toBe(true);
  });

  test("GET /api/properties/:id/reviews returns reviews sorted by created_at descending", async () => {
    const { body } = await request(app)
      .get("/api/properties/1/reviews")
      .expect(200);

    const timestamps = body.reviews.map((r) =>
      new Date(r.created_at).getTime()
    );
    const sorted = [...timestamps].sort((a, b) => b - a);
    expect(timestamps).toEqual(sorted);
  });

  test("GET /api/properties/:id/reviews returns empty reviews and null average_rating if none exist", async () => {
    const { body } = await request(app)
      .get("/api/properties/999/reviews")
      .expect(200);

    expect(body.reviews).toEqual([]);
    expect(body.average_rating).toBe(null);
  });
});
