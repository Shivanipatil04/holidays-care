const Tour = require("../models/Tour");

exports.getTours = async (req, res) => {
  try {

    const { category, popular, featured } = req.query;

    const filter = { isActive: true };

    if (category) filter.category = category;
    if (popular) filter.popular = true;
    if (featured) filter.featured = true;

    const tours = await Tour.find(filter).sort({ createdAt: -1 });

    res.json(tours);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTourById = async (req, res) => {

  try {

    const tour = await Tour.findById(req.params.id);

    if (!tour)
      return res.status(404).json({ message: "Tour not found" });

    res.json(tour);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTour = async (req, res) => {

  try {

    const images = req.files?.map(file => `/uploads/tours/${file.filename}`) || [];

    const tour = new Tour({
      ...req.body,
      images
    });

    await tour.save();

    res.status(201).json(tour);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTour = async (req, res) => {

  try {

    const updateData = { ...req.body };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(
        file => `/uploads/tours/${file.filename}`
      );
    }

    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(tour);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTour = async (req, res) => {

  try {

    await Tour.findByIdAndDelete(req.params.id);

    res.json({ message: "Tour deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};