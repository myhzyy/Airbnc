const formatUserData = require("../formatUsers");

describe("formatUserData", () => {
  test("returns an empty array when input is empty", () => {
    const input = [];
    const expected = [];

    const result = formatUserData(input);
    expect(result).toEqual(expected);
  });

  test("formats a single user with role 'host' into array with role true", () => {
    const input = [
      {
        first_name: "Alice",
        surname: "Johnson",
        email: "alice@example.com",
        phone_number: "123456",
        role: "host",
        avatar: "avatar.jpg",
      },
    ];
    const expected = [
      ["Alice", "Johnson", "alice@example.com", "123456", true, "avatar.jpg"],
    ];

    const result = formatUserData(input);
    expect(result).toEqual(expected);
  });

  test("formats a single user with role other than 'host' into array with role false", () => {
    const input = [
      {
        first_name: "Bob",
        surname: "Smith",
        email: "bob@example.com",
        phone_number: "7891011",
        role: "guest",
        avatar: "avatar2.jpg",
      },
    ];
    const expected = [
      ["Bob", "Smith", "bob@example.com", "7891011", false, "avatar2.jpg"],
    ];

    const result = formatUserData(input);
    expect(result).toEqual(expected);
  });

  test("formats multiple users correctly with different roles", () => {
    const input = [
      {
        first_name: "Alice",
        surname: "Johnson",
        email: "alice@example.com",
        phone_number: "123456",
        role: "host",
        avatar: "avatar.jpg",
      },
      {
        first_name: "Bob",
        surname: "Smith",
        email: "bob@example.com",
        phone_number: "7891011",
        role: "guest",
        avatar: "avatar2.jpg",
      },
    ];
    const expected = [
      ["Alice", "Johnson", "alice@example.com", "123456", true, "avatar.jpg"],
      ["Bob", "Smith", "bob@example.com", "7891011", false, "avatar2.jpg"],
    ];

    const result = formatUserData(input);
    expect(result).toEqual(expected);
  });
});
