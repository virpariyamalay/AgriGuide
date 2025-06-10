const express = require('express');
const router = express.Router();
const { getAllCrops } = require('../controllers/cropController');

// GET /api/crops - get all crops
router.get('/', getAllCrops);

module.exports = router;
