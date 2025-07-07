const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
    try {
        const { amount, currency = 'INR' } = req.body;
        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ error: 'Invalid or missing amount' });
        }
        const options = {
            amount: Math.round(amount * 100), // ensure integer paise
            currency,
            receipt: `receipt_order_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('Razorpay createOrder error:', error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to create Razorpay order', details: error.message });
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