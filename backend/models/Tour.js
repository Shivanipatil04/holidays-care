const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  day: Number,
  title: String,
  description: String,
});

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["domestic", "international"],
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    images: [String],

    highlights: [String],

    includes: [String],

    excludes: [String],

    itinerary: [itinerarySchema],

    featured: {
      type: Boolean,
      default: false,
    },

    popular: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: 4.5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Tour", tourSchema);
