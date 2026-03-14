const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const authMiddleware = require("../middleware/auth");

const {
  getTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/tours/");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", getTours);
router.get("/:id", getTourById);

router.post("/", authMiddleware, upload.array("images", 5), createTour);
router.put("/:id", authMiddleware, upload.array("images", 5), updateTour);
router.delete("/:id", authMiddleware, deleteTour);

module.exports = router;
