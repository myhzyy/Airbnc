const {
  fetchProperties,
  fetchPropertyQueries,
} = require("../models/getProperties.model");

exports.getProperties = async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM properties");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error in getProperties:", err);
    next(err);
  }
};
