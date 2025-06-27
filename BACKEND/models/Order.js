const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            price: {
                type: Number,
                required: true,
                min: 0,
            },
        },
    ],
    shippingAddress: {
        address: { type: String, required: true },
        landmark: { type: String },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true },
        deliveryInstructions: { type: String },
        alternatePhone: { type: String },
    },
    productSubtotal: { type: Number, required: true },
    shipping: { type: Number, required: true },
    gst: { type: Number, required: true },
    companyCharge: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paymentInfo: {
        razorpayOrderId: String,
        razorpayPaymentId: String,
        razorpaySignature: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema); 