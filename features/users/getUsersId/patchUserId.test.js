const request = require("supertest");
const app = require("../../../app");
const db = require("../../../db/connections/dbConnectionPool");

const seed = require("../../../db/connections/seed");
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
    const { body } = await request(app)
      .patch("/api/users/3")
      .send({ surname: "Lawrence" })
      .expect(200);

    expect(body.updatedUser[0]).toMatchObject({
      user_id: 3,
      surname: "Lawrence",
    });
  });

  test("200 updates multiple fileds on a user", async () => {
    const { body } = await request(app)
      .patch("/api/users/2")
      .send({ first_name: "Jamie", surname: "Doe" })
      .expect(200);

    expect(body.updatedUser[0]).toMatchObject({
      user_id: 2,
      first_name: "Jamie",
      surname: "Doe",
    });
  });

  test("400 responds with error if user ID is not a number", async () => {
    const { body } = await request(app)
      .patch("/api/users/banana")
      .send({ first_name: "Test" })
      .expect(400);

    expect(body.msg).toBe("Internal Server Error or path not found");
  });

  test("404: user ID not found", async () => {
    const { body } = await request(app)
      .patch("/api/users/9999")
      .send({ first_name: "Ghost" })
      .expect(404);

    expect(body.msg).toBe("Internal Server Error or path not found");
  });

  test("400: request includes invalid column", async () => {
    const { body } = await request(app)
      .patch("/api/users/2")
      .send({ not_a_column: "not a column" })
      .expect(404);

    expect(body.msg).toBe("Internal Server Error or path not found");
  });
});
