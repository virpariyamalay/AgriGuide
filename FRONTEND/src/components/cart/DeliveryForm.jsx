import React from 'react';

const DeliveryForm = ({ deliveryDetails, handleInputChange, handleProceedToConfirm, handleBackToCart }) => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 relative bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Delivery Details</h2>
                <button
                    onClick={handleBackToCart}
                    className="text-sm text-primary-600 hover:text-primary-500 font-medium px-4 py-2 rounded-md border border-primary-100 bg-primary-50"
                >
                    Back to Cart
                </button>
            </div>
            <form className="space-y-4" autoComplete="off">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="fullName"
                        value={deliveryDetails.fullName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900 placeholder-gray-400"
                        placeholder="Enter your full name"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                    <input
                        type="email"
                        name="email"
                        value={deliveryDetails.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900 placeholder-gray-400"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
                    <input
                        type="tel"
                        name="phone"
                        value={deliveryDetails.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900 placeholder-gray-400"
                        placeholder="Enter your phone number"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phone</label>
                    <input
                        type="tel"
                        name="alternatePhone"
                        value={deliveryDetails.alternatePhone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900 placeholder-gray-400"
                        placeholder="Optional alternate contact number"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="address"
                        value={deliveryDetails.address}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900 placeholder-gray-400"
                        placeholder="Enter your address"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
                    <input
                        type="text"
                        name="landmark"
                        value={deliveryDetails.landmark}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900 placeholder-gray-400"
                        placeholder="Nearby landmark (optional)"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="city"
                            value={deliveryDetails.city}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900 placeholder-gray-400"
                            placeholder="City"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pincode <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="pincode"
                            value={deliveryDetails.pincode}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900 placeholder-gray-400"
                            placeholder="Pincode"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Instructions</label>
                    <textarea
                        name="deliveryInstructions"
                        value={deliveryDetails.deliveryInstructions}
                        onChange={handleInputChange}
                        rows="2"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900 placeholder-gray-400"
                        placeholder="e.g. Call before delivery, leave at gate, etc."
                    ></textarea>
                </div>
                <button
                    type="button"
                    onClick={handleProceedToConfirm}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 text-lg mt-2"
                >
                    Proceed to Confirm
                </button>
            </form>
        </div>
    </div>
);

export default DeliveryForm; 