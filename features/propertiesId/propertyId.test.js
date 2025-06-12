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
describe("PropertiesID tests", () => {
  test("GET /api/properties/:id returns status of 200", async () => {
    await request(app).get("/api/properties/1").expect(200);
  });

  test("GET /api/properties/:id returns an object", async () => {
    const { body } = await request(app).get("/api/properties/1").expect(200);
    expect(typeof body.propertyId).toBe("object");
  });

  test("GET /api/properties/:id returns the correct keys", async () => {
    const { body } = await request(app).get("/api/properties/1");
    const property = body.propertyId;

    expect(property).toHaveProperty("property_id");
    expect(property).toHaveProperty("property_name");
    expect(property).toHaveProperty("location");
    expect(property).toHaveProperty("price_per_night");
    expect(property).toHaveProperty("description");
    expect(property).toHaveProperty("host");
    expect(property).toHaveProperty("host_avatar");
    expect(property).toHaveProperty("favourite_count");
    expect(property).not.toHaveProperty("favourited"); // shouldn't exist without user_id
  });

  test("GET /api/properties/:id with user_id includes 'favourited'", async () => {
    const { body } = await request(app)
      .get("/api/properties/1?user_id=1")
      .expect(200);

    expect(body.propertyId).toHaveProperty("favourited");
    expect(typeof body.propertyId.favourited).toBe("boolean");
  });

  test("GET /api/properties/:id returns correct shape", async () => {
    const { body } = await request(app).get("/api/properties/1");
    const property = body.propertyId;

    expect(property).toEqual(
      expect.objectContaining({
        property_id: expect.any(Number),
        property_name: expect.any(String),
        location: expect.any(String),
        price_per_night: expect.any(String),
        description: expect.any(String),
        host: expect.any(Number),
        host_avatar: expect.any(String),
        favourite_count: expect.any(String),
      })
    );
  });

  test("GET /api/properties/:id?user_id returns favourited: true/false", async () => {
    const { body } = await request(app)
      .get("/api/properties/1?user_id=1")
      .expect(200);

    expect(body.propertyId).toEqual(
      expect.objectContaining({
        favourited: expect.any(Boolean),
      })
    );
  });

  test("GET /api/properties/:id returns expected values", async () => {
    const { body } = await request(app).get("/api/properties/1");

    const expected = {
      property_id: 1,
      property_name: "Modern Apartment in City Center",
      location: "London, UK",
      price_per_night: "120.00",
      description: "Description of Modern Apartment in City Center.",
      host: 1,
      host_avatar: "https://example.com/images/alice.jpg",
      favourite_count: "1",
    };

    expect(body.propertyId).toEqual(expect.objectContaining(expected));
  });

  test("returns property data including image URLs array", async () => {
    const res = await request(app).get("/api/properties/1").expect(200);

    const property = res.body.propertyId;

    expect(property).toHaveProperty("property_id", 1);
    expect(property).toHaveProperty("property_name");
    expect(property).toHaveProperty("location");
    expect(property).toHaveProperty("price_per_night");
    expect(property).toHaveProperty("description");
    expect(property).toHaveProperty("host");
    expect(property).toHaveProperty("host_avatar");
    expect(property).toHaveProperty("favourite_count");

    expect(property).toHaveProperty("images");
    expect(Array.isArray(property.images)).toBe(true);
    expect(property.images.length).toBeGreaterThan(0);

    property.images.forEach((url) => {
      expect(typeof url).toBe("string");
    });
  });
});
