const mongoose = require('mongoose');

const instructionSchema = new mongoose.Schema({
  preparation: [String],
  planting: [String],
  care: [String],
  harvesting: [String],
}, { _id: false });

const growthStageSchema = new mongoose.Schema({
  day: Number,
  name: String,
  description: String,
  image: String,
  tasks: [String],
}, { _id: false });

const commonProblemSchema = new mongoose.Schema({
  name: String,
  solution: String,
}, { _id: false });

const tipsSchema = new mongoose.Schema({
  commonProblems: [commonProblemSchema],
  expertTips: [String],
}, { _id: false });

const recommendedProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
}, { _id: false });

const cropSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: String,
  description: String,
  difficulty: String,
  growingTime: String,
  waterNeeds: String,
  sunlight: String,
  successRate: Number,
  image: String,
  instructions: instructionSchema,
  growthStages: [growthStageSchema],
  tips: tipsSchema,
  recommendedProducts: [recommendedProductSchema],
});

// const Crop = mongoose.model('Crop', cropSchema);

// module.exports = Crop;
// Crop.js
// export const Crop = mongoose.model('Crop', cropSchema);
module.exports = mongoose.model('Crop', cropSchema);