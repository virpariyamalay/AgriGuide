import React from 'react';
import { motion } from 'framer-motion';

const AdminStats = ({ productCount, totalStock }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
    >
        <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-4 shadow flex flex-col items-center">
            <span className="text-2xl font-bold text-green-700">{productCount}</span>
            <span className="text-xs text-gray-600">Total Products</span>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl p-4 shadow flex flex-col items-center">
            <span className="text-2xl font-bold text-blue-700">{totalStock}</span>
            <span className="text-xs text-gray-600">Total Stock</span>
        </div>
    </motion.div>
);

export default AdminStats; 