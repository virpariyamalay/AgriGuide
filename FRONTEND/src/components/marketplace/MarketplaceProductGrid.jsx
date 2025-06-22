// This file has been moved to ../components/marketplace/MarketplaceProductGrid.jsx
import React from 'react';
import MarketplaceProductCard from './MarketplaceProductCard';

const MarketplaceProductGrid = ({ products, addToCart, cartItems, quantities, setQuantities }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
            products.map((product, index) => (
                <MarketplaceProductCard
                    key={product._id}
                    product={product}
                    addToCart={addToCart}
                    cartItems={cartItems}
                    quantity={quantities[product._id] || 1}
                    setQuantity={val => setQuantities(q => ({ ...q, [product._id]: val }))}
                />
            ))
        ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query.</p>
            </div>
        )}
    </div>
);

export default MarketplaceProductGrid; 