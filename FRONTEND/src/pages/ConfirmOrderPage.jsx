import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ConfirmOrderPage = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (orders.length > 0) {
      setOrder(orders[0]); // Get the most recent order
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">No Order Found</h1>
        <p className="text-gray-600 mb-6">Unable to find order details.</p>
        <Link
          to="/marketplace"
          className="btn btn-primary"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Calculate totals with fallbacks
  const subtotal = order.subtotal ?? 0;
  const total = order.total ?? 0;
  const shipping = (order.shipping ?? total - subtotal) ?? 0;

  return (
    <div className="min-h-screen bg-white py-12 px-4 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200"
      >
        <div className="flex flex-col items-center p-8">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mb-6"
          >
            <svg
              className="w-16 h-16 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>

          {/* Order Details */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 text-center mb-6">
            Order #{order.id} has been placed successfully. Thank you for shopping with us!
          </p>

          {/* Order Summary */}
          <div className="w-full bg-gray-50 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h2>
            <div className="space-y-4">
              {(order.items ?? []).map((item, index) => {
                const itemTotal = (item?.price ?? 0) * (item?.quantity ?? 1);
                return (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium">{item?.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item?.quantity ?? 1}</p>
                      </div>
                    </div>
                    <span className="font-medium">${itemTotal.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="w-full bg-gray-50 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Delivery Details</h2>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Name:</span> {order.deliveryDetails?.fullName ?? 'N/A'}</p>
              <p><span className="font-medium">Email:</span> {order.deliveryDetails?.email ?? 'N/A'}</p>
              <p><span className="font-medium">Phone:</span> {order.deliveryDetails?.phone ?? 'N/A'}</p>
              <p><span className="font-medium">Address:</span> {order.deliveryDetails?.address ?? 'N/A'}</p>
              <p>
                <span className="font-medium">Location:</span>{' '}
                {order.deliveryDetails?.city ?? 'N/A'}, {order.deliveryDetails?.state ?? 'N/A'} {order.deliveryDetails?.pincode ?? 'N/A'}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 w-full">
            
            <Link
              to="/marketplace"
              className="flex-1 border border-primary-500 text-primary-500 hover:bg-primary-50 rounded-full py-3 font-semibold text-center transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmOrderPage;
