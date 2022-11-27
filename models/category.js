const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const categoryScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  facilityId: [
    {
      type: ObjectId,
      ref: "Facility",
    },
  ],
});

module.exports = mongoose.model("Category", categoryScheme);
