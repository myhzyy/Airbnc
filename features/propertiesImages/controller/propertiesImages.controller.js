const {
  selectImagesByPropertyId,
} = require("../model/propertiesImages.model.js");
exports.getPropertyImages = async (req, res, next) => {
  const { id } = req.params;

  try {
    const images = await selectImagesByPropertyId(id);
    res.status(200).json({ images });
  } catch (err) {
    next(err);
  }
};
