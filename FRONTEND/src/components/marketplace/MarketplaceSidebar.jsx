// This file has been moved to ../components/marketplace/MarketplaceSidebar.jsx
import React from 'react';

const MarketplaceSidebar = ({ categories, selectedCategory, setSelectedCategory }) => (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="font-semibold text-lg mb-4">Categories</h3>
        <div className="space-y-2">
            {categories.map(category => (
                <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === category.id
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    {category.name}
                </button>
            ))}
        </div>
    </div>
);

export default MarketplaceSidebar; 