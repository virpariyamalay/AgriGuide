const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('../config/db');
const Crop = require('../models/Crop');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('MONGO_URI:', process.env.MONGO_URI);

async function seedCrops() {
  try {
    await connectDB();

    // Clear existing crops
    await Crop.deleteMany({});

    // Import cropData using dynamic import
    const cropDataModule = await import('../../FRONTEND/src/data/cropData.js');
    const cropData = cropDataModule.crops;

    // Insert crop data
    await Crop.insertMany(cropData);

    console.log('Crop data seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding crop data:', error);
    process.exit(1);
  }
}

seedCrops();
