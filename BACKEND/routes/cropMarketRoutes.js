const express = require('express');
const router = express.Router();
const { getAllCropMarketData, addCropMarketData } = require('../controllers/cropMarketController');

// GET all crop market data
router.get('/', getAllCropMarketData);

// POST new crop market data
router.post('/', addCropMarketData);

module.exports = router;
