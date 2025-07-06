const { getUserStats } = require("../model/getUserStats.model");

exports.getUserStatsController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const stats = await getUserStats(id);
    res.status(200).send(stats);
  } catch (err) {
    next(err);
  }
};
