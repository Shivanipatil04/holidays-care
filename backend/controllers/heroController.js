const HeroImage = require("../models/HeroImage");

exports.getHeroImages = async (req, res) => {
  try {
    const heroImages = await HeroImage.find({ isActive: true }).sort({ order: 1 });
    res.json(heroImages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.createHeroImage = async (req, res) => {
  try {
    const { title, subtitle, order } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const heroImage = new HeroImage({
      title,
      subtitle,
      imageUrl: `/uploads/hero/${req.file.filename}`,
      order: order || 0
    });

    await heroImage.save();
    res.status(201).json(heroImage);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateHeroImage = async (req, res) => {
  try {
    const { title, subtitle, order, isActive } = req.body;

    const updateData = { title, subtitle, order, isActive };

    if (req.file) {
      updateData.imageUrl = `/uploads/hero/${req.file.filename}`;
    }

    const heroImage = await HeroImage.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!heroImage) {
      return res.status(404).json({ message: "Hero image not found" });
    }

    res.json(heroImage);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteHeroImage = async (req, res) => {
  try {
    const heroImage = await HeroImage.findByIdAndDelete(req.params.id);

    if (!heroImage) {
      return res.status(404).json({ message: "Hero image not found" });
    }

    res.json({ message: "Hero image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
