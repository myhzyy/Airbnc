const formatPropertyTypes = require("../formatPropertyTypes");

describe("formatPropertyTypes", () => {
  test("returns an empty array when given an empty array", () => {
    const input = [];
    const expected = [];

    const result = formatPropertyTypes(input);
    expect(result).toEqual(expected);
  });

  test("formats a single property_type object into an array of arrays", () => {
    const input = [
      { property_type: "Apartment", description: "A nice apartment" },
    ];

    const expected = [["Apartment", "A nice apartment"]];

    const result = formatPropertyTypes(input);
    expect(result).toEqual(expected);
  });

  test("formats multiple property_type objects into an array of arrays", () => {
    const input = [
      { property_type: "Apartment", description: "A nice apartment" },
      { property_type: "Villa", description: "A luxury villa" },
    ];
    const expected = [
      ["Apartment", "A nice apartment"],
      ["Villa", "A luxury villa"],
    ];

    const result = formatPropertyTypes(input);
    expect(result).toEqual(expected);
  });
});
