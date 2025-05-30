const request = require("supertest");
const app = require("../../app");
const db = require("../../db/connections/dbConnectionPool");
const seed = require("../../db/connections/seed-run");

beforeEach(async () => {
  await seed();
});

afterAll(async () => {
  await db.end();
});

describe("PostProperties tests", () => {
  test("POST /api/properties/1/reviews", async () => {
    const newReview = {
      guest_id: 2,
      rating: 4,
      comment: "Really enjoyed my stay, would book again!",
    };

    const res = await request(app)
      .post("/api/properties/1/reviews")
      .send(newReview)
      .expect(201);

    const review = res.body;

    expect(review).toHaveProperty("review_id");
    expect(review).toHaveProperty("property_id", 1);
    expect(review).toHaveProperty("guest_id", newReview.guest_id);
    expect(review).toHaveProperty("rating", newReview.rating);
    expect(review).toHaveProperty("comment", newReview.comment);
    expect(review).toHaveProperty("created_at");
  });

  test("responds with 400 if required fields are missing", async () => {
    const incompleteReview = {
      guest_id: 2,
      rating: 4,
    };

    const res = await request(app)
      .post("/api/properties/1/reviews")
      .send(incompleteReview);

    expect(res.status).toBe(400);
  });
});
