import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gradient-to-b from-primary-50 to-white">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-32 h-32 mx-auto mb-8 bg-primary-100 rounded-full flex items-center justify-center"
        >
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-16 text-primary-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Order Placed Successfully!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg text-gray-600 mb-8"
        >
          Thank you for your purchase. We'll send you an email with your order details shortly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/orders"
            className="btn btn-primary w-full sm:w-auto"
          >
            View Orders
          </Link>
          <Link
            to="/marketplace"
            className="btn btn-outline w-full sm:w-auto"
          >
            Continue Shopping
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <img
            src="https://images.pexels.com/photos/7728087/pexels-photo-7728087.jpeg"
            alt="Success"
            className="w-full max-w-md mx-auto rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;