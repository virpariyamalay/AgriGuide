const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
    try {
        const { amount, currency = 'INR' } = req.body;
        const options = {
            amount: amount * 100, // amount in paise
            currency,
            receipt: `receipt_order_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create Razorpay order' });
    }
};

exports.verifyPayment = (req, res) => {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    const generated_signature = crypto
        .createHmac('sha256', key_secret)
        .update(razorpayOrderId + '|' + razorpayPaymentId)
        .digest('hex');

    if (generated_signature === razorpaySignature) {
        return res.json({ success: true, message: 'Payment verified' });
    } else {
        return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
}; 