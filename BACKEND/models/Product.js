const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    unit: { type: String },
    stock: { type: Number, default: 0 },
    tags: [{ type: String }],
    expiryDate: { type: Date },
    minOrderQty: { type: Number, default: 1 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema); 