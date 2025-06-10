const CropMarketData = require('../models/CropMarketData');

// Get all crop market data
const getAllCropMarketData = async (req, res) => {
  try {
    const data = await CropMarketData.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch crop market data' });
  }
};

// Add new crop market data
const addCropMarketData = async (req, res) => {
  try {
    const newData = new CropMarketData(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add crop market data' });
  }
};

module.exports = {
  getAllCropMarketData,
  addCropMarketData,
};
