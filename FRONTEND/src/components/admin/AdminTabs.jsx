import React from 'react';

const AdminTabs = ({ activeTab, setActiveTab }) => (
    <div className="flex flex-wrap gap-2 mb-6">
        <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${activeTab === 'products' ? 'bg-primary-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-primary-100'}`}
        >
            Products
        </button>
        <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${activeTab === 'orders' ? 'bg-primary-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-primary-100'}`}
        >
            Orders
        </button>
    </div>
);

export default AdminTabs; 