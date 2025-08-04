console.log("⚙️ getProperties controller loaded");

const { fetchProperties } = require("../models/getProperties.model");

exports.getProperties = async (req, res, next) => {
  try {
    console.log("🧪 Calling fetchProperties with:", req.query);
    const properties = await fetchProperties(req.query);
    console.log("✅ Properties returned:", properties.length);
    res.status(200).send({ properties });
  } catch (err) {
    console.error("❌ Error in getProperties:", err);
    next(err);
  }
};
