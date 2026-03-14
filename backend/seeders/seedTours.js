const mongoose = require("mongoose");
const Tour = require("../models/Tour");
const toursData = require("./toursData");

require("dotenv").config({ path: "../.env" });

const MONGO_URI = process.env.MONGODB_URI;

function parsePrice(price) {
  return Number(price.replace(/[₹,]/g, ""));
}

function getCategory(id) {
  const domestic = [
    "kashmir",
    "ladakh",
    "sikkim",
    "rajasthan",
    "himachal",
    "uttarakhand",
    "kerala",
    "northeast",
    "varanasi",
  ];

  return domestic.includes(id) ? "domestic" : "international";
}

async function seedTours() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected");

    await Tour.deleteMany();

    const formattedTours = toursData.map((tour) => ({
      title: tour.name,

      slug: tour.id,

      description: tour.description,

      price: parsePrice(tour.price),

      duration: tour.duration,

      category: getCategory(tour.id),

      destination: tour.name,

      images: [`/uploads/tours/${tour.image.replace("/", "")}`],

      highlights: tour.highlights,

      includes: tour.includes,

      excludes: tour.excludes,

      itinerary: tour.itinerary.map((item, index) => ({
        day: index + 1,
        title: item,
        description: "",
      })),

      featured: false,
      popular: false,
      isActive: true,
    }));

    await Tour.insertMany(formattedTours);

    console.log("Tours inserted successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedTours();
