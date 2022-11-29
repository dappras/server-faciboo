const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const facilityScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  urlMaps: {
    type: String,
    required: true,
  },
  hourAvailable: {
    type: Array,
    required: true,
  },
  categoryId: {
    type: ObjectId,
    ref: "Category",
  },
  imageId: [
    {
      type: ObjectId,
      ref: "Image",
    },
  ],
});

module.exports = mongoose.model("Facility", facilityScheme);
