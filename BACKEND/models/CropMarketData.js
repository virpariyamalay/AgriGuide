// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();


// const cropMarketDataSchema = new mongoose.Schema({
//   crop: { type: String, required: true },
//   cropId: { type: String, required: true },
//   variety: { type: String, required: true },
//   marketName: { type: String, required: true },
//   minPrice: { type: Number, required: true },
//   maxPrice: { type: Number, required: true },
//   modalPrice: { type: Number, required: true },
//   city: { type: String, required: true },
//   trend: { type: String, enum: ['up', 'down'], required: true },
//   change: { type: String, required: true },
//   lastUpdated: { type: Date, default: Date.now }
// });

// const CropMarketData = mongoose.model('CropMarketData', cropMarketDataSchema);

// module.exports = CropMarketData;


const mongoose = require('mongoose');

const cropMarketDataSchema = new mongoose.Schema({
  crop: { type: String, required: true },
  cropId: { type: String, required: true },
  variety: { type: String, required: true },
  marketName: { type: String, required: true },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  modalPrice: { type: Number, required: true },
  city: { type: String, required: true },
  trend: { type: String, enum: ['up', 'down'], required: true },
  change: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

const CropMarketData = mongoose.model('CropMarketData', cropMarketDataSchema);
module.exports = CropMarketData;
