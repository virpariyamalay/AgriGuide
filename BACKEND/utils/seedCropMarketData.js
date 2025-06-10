
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mongoose = require('mongoose');

const CropMarketData = require('../models/CropMarketData');
const connectDB = require('../config/db');

// dotenv.config();



// Optional: Debug
console.log('MONGO_URI:', process.env.MONGO_URI);  // Should print the Mongo URI

const cropMarketSeedData = [
  {
    crop: 'Cotton',
    cropId: 'cotton',
    variety: 'Shankar-6',
    marketName: 'Ahmedabad APMC',
    minPrice: 6200,
    maxPrice: 6800,
    modalPrice: 6500,
    city: 'ahmedabad',
    trend: 'up',
    change: '+200',
    lastUpdated: new Date()
  },
  {
    crop: 'Groundnut',
    cropId: 'groundnut',
    variety: 'Bold',
    marketName: 'Rajkot APMC',
    minPrice: 5500,
    maxPrice: 6000,
    modalPrice: 5800,
    city: 'rajkot',
    trend: 'down',
    change: '-100',
    lastUpdated: new Date()
  },
  {
    crop: 'Wheat',
    cropId: 'wheat',
    variety: 'Durum',
    marketName: 'Surat APMC',
    minPrice: 4000,
    maxPrice: 4500,
    modalPrice: 4250,
    city: 'surat',
    trend: 'up',
    change: '+150',
    lastUpdated: new Date()
  },
  {
    crop: 'Castor',
    cropId: 'castor',
    variety: 'Aruna',
    marketName: 'Vadodara APMC',
    minPrice: 7000,
    maxPrice: 7500,
    modalPrice: 7200,
    city: 'vadodara',
    trend: 'down',
    change: '-50',
    lastUpdated: new Date()
  },
  {
    crop: 'Cumin',
    cropId: 'cumin',
    variety: 'Rajendra',
    marketName: 'Rajkot APMC',
    minPrice: 9000,
    maxPrice: 9500,
    modalPrice: 9200,
    city: 'rajkot',
    trend: 'up',
    change: '+100',
    lastUpdated: new Date()
  },
  {
    crop: 'Pearl Millet',
    cropId: 'pearl_millet',
    variety: 'GHB-732',
    marketName: 'Bhavnagar APMC',
    minPrice: 3500,
    maxPrice: 3800,
    modalPrice: 3650,
    city: 'bhavnagar',
    trend: 'down',
    change: '-30',
    lastUpdated: new Date()
  },
  {
    crop: 'Soybean',
    cropId: 'soybean',
    variety: 'JS-335',
    marketName: 'Jamnagar APMC',
    minPrice: 4800,
    maxPrice: 5200,
    modalPrice: 5000,
    city: 'jamnagar',
    trend: 'up',
    change: '+120',
    lastUpdated: new Date()
  },
  {
    crop: 'Rice',
    cropId: 'rice',
    variety: 'Basmati',
    marketName: 'Junagadh APMC',
    minPrice: 6000,
    maxPrice: 6500,
    modalPrice: 6200,
    city: 'junagadh',
    trend: 'down',
    change: '-80',
    lastUpdated: new Date()
  },
  {
    crop: 'Mustard',
    cropId: 'mustard',
    variety: 'Varuna',
    marketName: 'Gandhinagar APMC',
    minPrice: 7000,
    maxPrice: 7400,
    modalPrice: 7200,
    city: 'gandhinagar',
    trend: 'up',
    change: '+90',
    lastUpdated: new Date()
  },
  {
    crop: 'Cotton',
    cropId: 'cotton',
    variety: 'DCH-32',
    marketName: 'Anand APMC',
    minPrice: 6300,
    maxPrice: 6700,
    modalPrice: 6500,
    city: 'anand',
    trend: 'down',
    change: '-40',
    lastUpdated: new Date()
  }
];

const seedCropMarketData = async () => {
  try {
    await connectDB();
    await CropMarketData.deleteMany({});
    await CropMarketData.insertMany(cropMarketSeedData);
    console.log('✅ Crop market data seeded successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding crop market data:', error);
    process.exit(1);
  }
};

seedCropMarketData();
