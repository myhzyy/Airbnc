const formatReviews = require("../formatReviews");

describe("formatReviews", () => {
  test("calls logger with propertyIdMap", () => {
    const mockProps = [
      { property_id: 1, name: "Modern Apartment in City Center" },
      { property_id: 2, name: "Cosy Family House" },
    ];

    const expectedMap = {
      "Modern Apartment in City Center": 1,
      "Cosy Family House": 2,
    };

    const mockLogger = jest.fn();

    formatReviews(mockProps, [], [], mockLogger);

    expect(mockLogger).toHaveBeenCalledWith(expectedMap);
  });

  test("calls logger with userIdMap", () => {
    const mockUsers = [
      { user_id: 1, first_name: "Alice", surname: "Johnson" },
      { user_id: 2, first_name: "Bob", surname: "Smith" },
    ];

    const expectedMap = { "Alice Johnson": 1, "Bob Smith": 2 };

    const mockLogger = jest.fn();

    formatReviews([], mockUsers, [], mockLogger);

    expect(mockLogger.mock.calls[1][0]).toEqual(expectedMap);
  });

  test("returns formatted reviews", () => {
    const mockProps = [
      { property_id: 1, name: "Modern Apartment in City Center" },
      { property_id: 2, name: "Cosy Family House" },
    ];

    const mockUsers = [
      { user_id: 101, first_name: "Alice", surname: "Johnson" },
      { user_id: 202, first_name: "Bob", surname: "Smith" },
    ];

    const mockReviews = [
      {
        property_name: "Modern Apartment in City Center",
        guest_name: "Alice Johnson",
        rating: 5,
        comment: "Fantastic!",
      },
      {
        property_name: "Cosy Family House",
        guest_name: "Bob Smith",
        rating: 4,
        comment: "Great for families",
      },
    ];

    const expected = [
      [1, 101, 5, "Fantastic!"],
      [2, 202, 4, "Great for families"],
    ];

    const mockLogger = jest.fn();

    const result = formatReviews(
      mockProps,
      mockUsers,
      mockReviews,
      mockLogger,
      true
    );

    expect(result).toEqual(expected);
  });
});
