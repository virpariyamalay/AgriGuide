import React from 'react';

const MarketplaceFilters = ({ searchQuery, setSearchQuery, priceRange, setPriceRange, products }) => {
    // Calculate min/max price from products
    const minPrice = products.length > 0 ? Math.min(...products.map(p => p.price)) : 0;
    const maxPrice = products.length > 0 ? Math.max(...products.map(p => p.price)) : 1000;

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="font-semibold text-lg mb-4">Filters</h3>
            <div className="mb-4">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                    Search
                </label>
                <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Search products..."
                />
            </div>
            <div>
                <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="flex items-center gap-4">
                    <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default MarketplaceFilters; 