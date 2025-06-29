const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const transporter = require('../config/nodemailer');

// Helper to generate modern HTML email for order confirmation
function generateOrderConfirmationEmail(order, user) {
    const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding:8px 0; border-bottom:1px solid #eee;">
        <strong>${item.product.name}</strong><br/>
        Qty: ${item.quantity} x ₹${item.price}
      </td>
      <td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right;">
        ₹${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `).join('');
    return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f6f8fa; padding: 32px;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); overflow: hidden;">
        <div style="background: linear-gradient(90deg, #22c55e 0%, #2563eb 100%); color: #fff; padding: 24px 24px 16px 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 2rem; font-weight: bold;">Thank you for your order, ${user.name || 'Customer'}!</h1>
          <p style="margin: 8px 0 0 0; font-size: 1.1rem;">Your order has been placed successfully.</p>
        </div>
        <div style="padding: 32px 24px;">
          <h2 style="font-size: 1.25rem; color: #2563eb; margin-bottom: 16px;">Order Summary</h2>
          <table style="width:100%; border-collapse:collapse; font-size:1rem;">
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          <table style="width:100%; border-collapse:collapse; font-size:1rem; margin-top:24px;">
            <tbody>
              <tr>
                <td style="padding:6px 0; color:#555;">Subtotal</td>
                <td style="padding:6px 0; text-align:right; color:#222;">₹${order.productSubtotal}</td>
              </tr>
              <tr>
                <td style="padding:6px 0; color:#555;">Shipping</td>
                <td style="padding:6px 0; text-align:right; color:#222;">₹${order.shipping}</td>
              </tr>
              <tr>
                <td style="padding:6px 0; color:#555;">GST</td>
                <td style="padding:6px 0; text-align:right; color:#222;">₹${order.gst}</td>
              </tr>
              <tr>
                <td style="padding:6px 0; color:#555;">Company Charge</td>
                <td style="padding:6px 0; text-align:right; color:#222;">₹${order.companyCharge}</td>
              </tr>
              ${order.discount > 0 ? `<tr><td style='padding:6px 0; color:#22c55e;'>Discount</td><td style='padding:6px 0; text-align:right; color:#22c55e;'>-₹${order.discount}</td></tr>` : ''}
              <tr>
                <td style="padding:12px 0; font-weight:bold; font-size:1.1em;">Total</td>
                <td style="padding:12px 0; text-align:right; font-weight:bold; font-size:1.1em;">₹${order.totalAmount}</td>
              </tr>
            </tbody>
          </table>
          <hr style="margin:32px 0; border:none; border-top:1px solid #eee;"/>
          <h2 style="font-size: 1.1rem; color: #22c55e; margin-bottom: 8px;">Delivery Address</h2>
          <div style="font-size:1rem; color:#222; margin-bottom: 16px;">
            <div>${order.shippingAddress.address}</div>
            ${order.shippingAddress.landmark ? `<div>${order.shippingAddress.landmark}</div>` : ''}
            <div>${order.shippingAddress.city}, ${order.shippingAddress.postalCode}</div>
            <div>Phone: ${order.shippingAddress.phone}</div>
            ${order.shippingAddress.alternatePhone ? `<div>Alternate: ${order.shippingAddress.alternatePhone}</div>` : ''}
            ${order.shippingAddress.deliveryInstructions ? `<div style='color:#555; font-size:0.95em;'>Instructions: ${order.shippingAddress.deliveryInstructions}</div>` : ''}
          </div>
        </div>
        <div style="background:#f1f5f9; color:#64748b; text-align:center; padding:16px; font-size:0.95rem; border-top:1px solid #e5e7eb;">
          If you have any questions, contact us at <a href="mailto:support@agriguide.com" style="color:#2563eb; text-decoration:underline;">support@agriguide.com</a>
        </div>
      </div>
    </div>
  `;
}

// Place a new order and decrement product stock
exports.placeOrder = async (req, res) => {
    try {
        const { items, shippingAddress, totalAmount, productSubtotal, shipping, gst, companyCharge, discount } = req.body;
        const userId = req.user._id;

        // Validate items
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'No items in order.' });
        }
        if (productSubtotal == null || shipping == null || gst == null || companyCharge == null || totalAmount == null) {
            return res.status(400).json({ message: 'Missing order cost breakdown.' });
        }

        // Check stock for each product
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.product}` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for product: ${product.name}` });
            }
        }

        // Decrement stock for each product
        for (const item of items) {
            await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
        }

        // Create and save the order
        const paymentInfo = req.body.paymentInfo;
        const isPaid = !!paymentInfo;
        const paymentStatus = isPaid ? 'paid' : 'pending';
        const order = new Order({
            user: userId,
            items,
            shippingAddress,
            productSubtotal,
            shipping,
            gst,
            companyCharge,
            discount: discount || 0,
            totalAmount,
            paymentStatus,
            isPaid,
            paymentInfo: paymentInfo || undefined,
        });
        await order.populate('items.product', 'name image');
        await order.save();

        // Send order confirmation email
        const user = await User.findById(userId);
        if (user && user.email) {
            const html = generateOrderConfirmationEmail(order, user);
            await transporter.sendMail({
                from: process.env.EMAIL_USER || 'no-reply@agriguide.com',
                to: user.email,
                subject: `Order Confirmation - AgriGuide (Order #${order._id.toString().slice(-8)})`,
                html,
            });
        }

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error('Order placement error:', error);
        res.status(500).json({ message: 'Failed to place order', error: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('items.product', 'name image');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
};

// Get orders for the authenticated user
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({ user: userId })
            .populate('items.product', 'name image')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user orders', error: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
            .populate('user', 'name email')
            .populate('items.product', 'name image');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order', error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Order.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete order', error: error.message });
    }
}; 