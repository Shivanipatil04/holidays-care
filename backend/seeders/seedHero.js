const mongoose = require("mongoose");
const HeroImage = require("../models/HeroImage");
require("dotenv").config({ path: "../.env" });

const heroData = [
  {
    title: "Explore The World",
    subtitle: "Discover unforgettable destinations with Holidays Care.",
    imageUrl: "/uploads/hero/hero-1.jpg",
    order: 1,
  },
  {
    title: "Adventure Awaits",
    subtitle: "From snowy mountains to tropical beaches.",
    imageUrl: "/uploads/hero/hero-2.jpg",
    order: 2,
  },
  {
    title: "Create Beautiful Memories",
    subtitle: "Travel experiences crafted just for you.",
    imageUrl: "/uploads/hero/hero-3.jpg",
    order: 3,
  },
];

async function seedHero() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    await HeroImage.deleteMany();

    await HeroImage.insertMany(heroData);

    console.log("Hero images seeded successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedHero();
