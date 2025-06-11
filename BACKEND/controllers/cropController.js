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

// Get crop by id or name
const getCropById = async (req, res) => {
  try {
    const id = req.params.id;
    let crop;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      // If id is a valid MongoDB ObjectId, search by _id
      crop = await Crop.findById(id);
    }
    if (!crop) {
      // Otherwise, search by name (case-insensitive)
      crop = await Crop.findOne({ name: { $regex: new RegExp(`^${id}$`, 'i') } });
    }
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    res.json(crop);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch crop' });
  }
};

module.exports = {
  getAllCrops,
  getCropById,
};
