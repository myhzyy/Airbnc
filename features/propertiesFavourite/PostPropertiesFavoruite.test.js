const request = require("supertest");
const app = require("../../app");
const db = require("../../db/connections/dbConnectionPool");
const seed = require("../../db/connections/seed-run");

beforeEach(async () => {
  await seed(); // Reset DB before each test
});

afterAll(async () => {
  await db.end(); // Close DB connection after tests
});

describe("POST /api/properties/:id/favourite", () => {
  test("201: successfully favourites a property", async () => {
    const res = await request(app)
      .post("/api/properties/2/favourite")
      .send({ guest_id: 2 })
      .expect(201);

    expect(res.body).toMatchObject({
      msg: "Property favourited successfully.",
      favourited_id: 11,
    });
  });
  test("400: Invalid property_id (not a number)", async () => {
    const res = await request(app)
      .post("/api/properties/notANumber/favourite")
      .send({ guest_id: 2 })
      .expect(400);

    expect(res.body.msg).toBe("SENT body was NOT a valid. Try using a number.");
  });

  test("400: Missing guest_id in request body", async () => {
    const res = await request(app)
      .post("/api/properties/2/favourite")
      .send({})
      .expect(400);

    expect(res.body.msg).toBe("Missing guest_id");
  });

  test("404: Property ID does not exist", async () => {
    const res = await request(app)
      .post("/api/properties/9999/favourite")
      .send({ guest_id: 1 })
      .expect(404);

    expect(res.body.msg).toBe("Property not found");
  });

  test("404: Guest ID does not exist", async () => {
    const res = await request(app)
      .post("/api/properties/1/favourite")
      .send({ guest_id: 9999 })
      .expect(404);

    expect(res.body.msg).toBe("Guest not found");
  });
});
