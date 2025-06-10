const Crop = require('../models/Crop');

// Get all crops
const getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find({});
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch crops' });
  }
};

module.exports = {
  getAllCrops,
};
