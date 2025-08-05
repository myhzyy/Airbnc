const db = require("../../../db/connections/dbConnectionPool");
const imagesData = require("../../../db/data/test/images.json"); // or dev if production

exports.selectImagesByPropertyId = async (propertyId) => {
  const query = `SELECT name FROM properties WHERE property_id = $1;`;
  const result = await db.query(query, [propertyId]);

  if (result.rows.length === 0) {
    const error = new Error("Property not found");
    error.status = 404;
    throw error;
  }

  const propertyName = result.rows[0].name;

  const matchedImages = imagesData.filter(
    (img) => img.property_name === propertyName
  );

  return matchedImages.map(({ image_url, alt_tag }) => ({
    image_url,
    alt_tag,
  }));
};
