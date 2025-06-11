const express = require('express');
const router = express.Router();
const { getAllCrops, getCropById } = require('../controllers/cropController');

// GET /api/crops - get all crops
router.get('/', getAllCrops);

// GET /api/crops/:id - get crop by id or name
router.get('/:id', getCropById);

module.exports = router;
