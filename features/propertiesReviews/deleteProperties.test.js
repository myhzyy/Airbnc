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

describe("DELETE /api/properties/:id/reviews", () => {
  test("204 No Content on successful deletion", async () => {
    await request(app).delete("/api/reviews/1").expect(204);
  });

  test("Returns 404 if review does not exist", async () => {
    const res = await request(app).delete("/api/reviews/9999").expect(404);

    expect(res.body).toHaveProperty("msg", "Review not found");
  });

  test("Actually deletes the review from the table", async () => {
    await request(app).delete("/api/reviews/2").expect(204);

    const res = await request(app).delete("/api/reviews/2").expect(404);
    expect(res.body).toHaveProperty("msg", "Review not found");
  });

  test("400 if review_id is not a number", async () => {
    const res = await request(app)
      .delete("/api/reviews/not-a-number")
      .expect(400);

    expect(res.body).toHaveProperty("msg", "Invalid review_id");
  });
});
