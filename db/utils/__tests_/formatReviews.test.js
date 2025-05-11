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

    formatReviews(mockProps, {}, [], mockLogger);

    expect(mockLogger).toHaveBeenCalledWith(expectedMap);
  });
});
