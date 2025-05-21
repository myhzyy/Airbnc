const request = require("supertest");
const app = require("../app");

const db = require("../db/connections/dbConnectionPool");

test("non-existent endpoint responds with 404 and error msg", async () => {
  const { body } = await request(app).get("/non-existent-path").expect(404);
  expect(body.msg).toBe("Path not found.");
});
