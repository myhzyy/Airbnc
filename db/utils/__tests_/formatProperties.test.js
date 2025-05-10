const formatProperties = require("../formatProperties");

describe("formatProperties", () => {
  test("returns empty array when propertiesData is empty", () => {
    const propertiesData = [];
    const usersData = [{ user_id: 1, first_name: "Alice", surname: "Johnson" }];

    const result = formatProperties(propertiesData, usersData);
    expect(result).toEqual([]);
  });

  test("formats a single property object correctly", () => {
    const propertiesData = [
      {
        name: "Modern Apartment",
        location: "London",
        property_type: "Apartment",
        price_per_night: 120,
        description: "Nice place",
        host_name: "Alice Johnson",
      },
    ];
    const usersData = [{ user_id: 1, first_name: "Alice", surname: "Johnson" }];

    const expected = [
      [1, "Modern Apartment", "London", "Apartment", 120, "Nice place"],
    ];

    const result = formatProperties(propertiesData, usersData);
    expect(result).toEqual(expected);
  });

  test("formats multiple property objects correctly", () => {
    const propertiesData = [
      {
        name: "Modern Apartment",
        location: "London",
        property_type: "Apartment",
        price_per_night: 120,
        description: "Nice place",
        host_name: "Alice Johnson",
      },
      {
        name: "Seaside Villa",
        location: "Barcelona",
        property_type: "Villa",
        price_per_night: 200,
        description: "Sea view",
        host_name: "Emma Davis",
      },
    ];
    const usersData = [
      { user_id: 1, first_name: "Alice", surname: "Johnson" },
      { user_id: 2, first_name: "Emma", surname: "Davis" },
    ];

    const expected = [
      [1, "Modern Apartment", "London", "Apartment", 120, "Nice place"],
      [2, "Seaside Villa", "Barcelona", "Villa", 200, "Sea view"],
    ];

    const result = formatProperties(propertiesData, usersData);
    expect(result).toEqual(expected);
  });
});
