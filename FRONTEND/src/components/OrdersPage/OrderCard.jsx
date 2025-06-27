import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const OrderCard = ({ order, generatePDF }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
    >
        <div className="p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-semibold mb-1">
                        Order #{order._id}
                    </h3>
                    <p className="text-sm text-gray-600">
                        Placed on {format(new Date(order.createdAt), 'PPp')}
                    </p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'paid'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-primary-100 text-primary-800'
                    }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
            </div>
            <div className="space-y-4">
                {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                            <img
                                src={item.product?.image || '/placeholder-image.jpg'}
                                alt={item.product?.name || 'Product'}
                                className="w-12 h-12 object-cover rounded-md mr-4"
                                onError={(e) => {
                                    e.target.src = '/placeholder-image.jpg';
                                }}
                            />
                            <div>
                                <h4 className="font-medium">{item.product?.name || 'Product'}</h4>
                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                        </div>
                        <span className="font-medium">₹{(item.price * item.quantity)}</span>
                    </div>
                ))}
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span>₹{order.productSubtotal}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Shipping:</span>
                        <span>₹{order.shipping}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">GST:</span>
                        <span>₹{order.gst}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Company Charge:</span>
                        <span>₹{order.companyCharge}</span>
                    </div>
                    {order.discount > 0 && (
                        <div className="flex justify-between text-green-600">
                            <span>Discount:</span>
                            <span>-₹{order.discount}</span>
                        </div>
                    )}
                    <div className="flex justify-between border-t pt-2 font-bold">
                        <span>Total:</span>
                        <span>₹{order.totalAmount}</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-600">
                    <p>Shipping Address:</p>
                    <p className="font-medium">{order.shippingAddress?.address}, {order.shippingAddress?.city}</p>
                </div>
                <button
                    className="btn btn-outline"
                    onClick={() => generatePDF(order)}
                >
                    Download Invoice
                </button>
            </div>
        </div>
    </motion.div>
);

export default OrderCard; 