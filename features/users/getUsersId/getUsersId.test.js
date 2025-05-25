const request = require("supertest");
const app = require("../../../app");
const db = require("../../../db/connections/dbConnectionPool");

afterAll(async () => {
  await db.end();
});

describe("UsersID tests", () => {
  test("GET /api/users/:id returns status of 200", async () => {
    const { body } = await request(app).get("/api/users/1").expect(200);
  });

  test("GET /api/users/:id returns an object", async () => {
    const { body } = await request(app).get("/api/users/1").expect(200);
    expect(typeof body.user).toBe("object");
  });

  test("GET /api/users/:id returns the correct keys", async () => {
    const { body } = await request(app).get("/api/users/1");
    const userId = body.user;
  });

  test("GET /api/users/:id returns the correct user fields", async () => {
    const res = await request(app).get("/api/users/1");
    const user = res.body.user[0];

    expect(user).toHaveProperty("user_id");
    expect(user).toHaveProperty("first_name");
    expect(user).toHaveProperty("surname");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("phone_number");
    expect(user).toHaveProperty("avatar");
    expect(user).toHaveProperty("created_at");
  });

  test("GET /api/users/:id returns the correct user data", async () => {
    const res = await request(app).get("/api/users/1");
    const user = res.body.user[0];

    expect(user).toEqual({
      user_id: 1,
      first_name: "Alice",
      surname: "Johnson",
      email: "alice@example.com",
      phone_number: "+44 7000 111111",
      avatar: "https://example.com/images/alice.jpg",
      created_at: expect.any(String),
    });
  });
});
