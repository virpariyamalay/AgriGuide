import React, { useState } from 'react';
import { motion } from 'framer-motion';

const OrderManagement = ({ orders, ordersLoading, handleMarkDelivered, handleDeleteOrder }) => {
    const [updatingOrders, setUpdatingOrders] = useState({});
    const [deletingOrders, setDeletingOrders] = useState({});

    const handleMarkDeliveredWithLoading = async (orderId) => {
        setUpdatingOrders(prev => ({ ...prev, [orderId]: true }));
        try {
            await handleMarkDelivered(orderId);
        } catch (error) {
            console.error('Error marking order as delivered:', error);
        } finally {
            setUpdatingOrders(prev => ({ ...prev, [orderId]: false }));
        }
    };

    const handleDeleteOrderWithLoading = async (orderId) => {
        setDeletingOrders(prev => ({ ...prev, [orderId]: true }));
        try {
            await handleDeleteOrder(orderId);
        } catch (error) {
            console.error('Error deleting order:', error);
        } finally {
            setDeletingOrders(prev => ({ ...prev, [orderId]: false }));
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">All Orders</h2>
            {ordersLoading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading orders...</p>
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No orders found.</div>
            ) : (
                orders
                    .slice()
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map(order => (
                        <motion.div
                            key={order._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gradient-to-br from-blue-100 via-white to-green-100 border border-blue-200/40 rounded-2xl shadow-lg p-6 flex flex-col gap-4 hover:shadow-xl transition"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-4 mb-4">
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-wrap gap-4 items-center">
                                        <span className="font-semibold text-gray-700">Order ID:</span> <span className="text-gray-900">{order._id}</span>
                                        <span className="font-semibold text-gray-700">User:</span> <span className="text-blue-700 font-medium">{order.user?.name || 'N/A'} ({order.user?.email || 'N/A'})</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm border ${order.status === 'delivered' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>{order.status.toUpperCase()}</span>
                                        <span className={`ml-2 px-3 py-1 rounded-full text-xs font-bold shadow-sm border ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700 border-green-200' : order.paymentStatus === 'failed' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>{order.paymentStatus ? order.paymentStatus.toUpperCase() : 'PENDING'}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-4 items-center mt-2">
                                        <span className="font-semibold text-gray-700">Total:</span> <span className="text-lg font-bold text-primary-700">₹{order.totalAmount}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-4 items-center text-sm text-gray-600 mt-1">
                                        <span>Subtotal: <span className="font-semibold text-gray-800">₹{order.productSubtotal}</span></span>
                                        <span>Shipping: <span className="font-semibold text-gray-800">₹{order.shipping}</span></span>
                                        <span>GST: <span className="font-semibold text-gray-800">₹{order.gst}</span></span>
                                        <span>Company: <span className="font-semibold text-gray-800">₹{order.companyCharge}</span></span>
                                        {order.discount > 0 && (
                                            <span>Discount: <span className="font-semibold text-green-700">-₹{order.discount}</span></span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2 items-center">
                                        <span className="font-semibold text-gray-700">Shipping:</span> <span className="text-gray-600">{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 items-center text-sm text-gray-600">
                                        <span className="font-semibold">Phone:</span> <span>{order.shippingAddress.phone}</span>
                                    </div>
                                    {order.shippingAddress.landmark && (
                                        <div className="flex flex-wrap gap-2 items-center text-sm text-gray-600">
                                            <span className="font-semibold">Landmark:</span> <span>{order.shippingAddress.landmark}</span>
                                        </div>
                                    )}
                                    {order.shippingAddress.deliveryInstructions && (
                                        <div className="flex flex-wrap gap-2 items-center text-sm text-gray-600">
                                            <span className="font-semibold">Instructions:</span> <span>{order.shippingAddress.deliveryInstructions}</span>
                                        </div>
                                    )}
                                    {order.shippingAddress.alternatePhone && (
                                        <div className="flex flex-wrap gap-2 items-center text-sm text-gray-600">
                                            <span className="font-semibold">Alternate Phone:</span> <span>{order.shippingAddress.alternatePhone}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2 md:items-end mt-4 md:mt-0">
                                    {order.status !== 'delivered' && (
                                        <button
                                            onClick={() => handleMarkDeliveredWithLoading(order._id)}
                                            disabled={updatingOrders[order._id]}
                                            className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold shadow hover:from-green-500 hover:to-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {updatingOrders[order._id] ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Updating...
                                                </>
                                            ) : (
                                                <>
                                                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' /></svg>
                                                    Mark as Delivered
                                                </>
                                            )}
                                        </button>
                                    )}
                                    {order.status === 'delivered' && (
                                        <button
                                            onClick={() => handleDeleteOrderWithLoading(order._id)}
                                            disabled={deletingOrders[order._id]}
                                            className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold shadow hover:from-red-500 hover:to-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {deletingOrders[order._id] ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Deleting...
                                                </>
                                            ) : (
                                                <>
                                                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' /></svg>
                                                    Delete
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700 block mb-2">Items:</span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {order.items.map(item => (
                                        <div key={item.product?._id || item.product} className="flex items-center gap-4 bg-gray-50 rounded-lg p-3 border border-gray-100">
                                            <img
                                                src={item.product?.image || '/placeholder.png'}
                                                alt={item.product?.name || 'Product'}
                                                className="w-16 h-16 object-cover rounded-lg border"
                                            />
                                            <div className="flex-1">
                                                <div className="font-semibold text-gray-800 line-clamp-1">{item.product?.name || 'Product'}</div>
                                                <div className="text-sm text-gray-600">Qty: <span className="font-medium text-gray-900">{item.quantity}</span></div>
                                                <div className="text-sm text-gray-600">Price: <span className="font-medium text-primary-700">₹{item.price}</span></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))
            )}
        </div>
    );
};

export default OrderManagement; 