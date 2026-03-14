const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const { uploadHero } = require("../middleware/upload");

const {
  getHeroImages,
  createHeroImage,
  updateHeroImage,
  deleteHeroImage
} = require("../controllers/heroController");

router.get("/", getHeroImages);

router.post("/", authMiddleware, uploadHero.single("image"), createHeroImage);

router.put("/:id", authMiddleware, uploadHero.single("image"), updateHeroImage);

router.delete("/:id", authMiddleware, deleteHeroImage);

module.exports = router;
