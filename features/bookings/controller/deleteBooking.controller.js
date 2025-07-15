const { removeBookingById } = require("../model/deleteBooking.model");

exports.deleteBooking = async (req, res, next) => {
  const { booking_id } = req.params;

  try {
    const deletedBooking = await removeBookingById(booking_id);

    if (!deletedBooking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    res
      .status(200)
      .json({ msg: "Booking succeaafully delete", booking: deletedBooking });
  } catch (err) {
    next(err);
  }
};
