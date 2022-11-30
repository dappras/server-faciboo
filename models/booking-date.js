const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const bookingDateSchema = new mongoose.Schema({
  bookingDate: {
    type: Number,
    required: true,
  },
  bookingMonth: {
    type: Number,
    required: true,
  },
  bookingYear: {
    type: Number,
    required: true,
  },
  bookingHour: {
    type: String,
    required: true,
  },
  invoice: {
    type: String,
    required: true,
  },
  facilityId: {
    type: ObjectId,
    ref: "Facility",
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Booking-Date", bookingDateSchema);
