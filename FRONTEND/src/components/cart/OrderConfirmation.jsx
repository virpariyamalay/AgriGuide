import React from 'react';

const OrderConfirmation = ({ deliveryDetails, cartItems, subtotal, shipping, gst, companyCharge, discount, total, handleBack, handlePlaceOrder }) => (
    <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Confirm Order</h2>
            <div className="space-y-6">
                <div>
                    <h3 className="font-medium text-gray-900 mb-2">Delivery Details</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p><span className="font-medium">Name:</span> {deliveryDetails.fullName}</p>
                        <p><span className="font-medium">Email:</span> {deliveryDetails.email}</p>
                        <p><span className="font-medium">Phone:</span> {deliveryDetails.phone}</p>
                        <p><span className="font-medium">Address:</span> {deliveryDetails.address}</p>
                        <p><span className="font-medium">Landmark:</span> {deliveryDetails.landmark}</p>
                        <p><span className="font-medium">City:</span> {deliveryDetails.city}</p>
                        <p><span className="font-medium">Pincode:</span> {deliveryDetails.pincode}</p>
                        <p><span className="font-medium">Delivery Instructions:</span> {deliveryDetails.deliveryInstructions}</p>
                        <p><span className="font-medium">Alternate Phone:</span> {deliveryDetails.alternatePhone}</p>
                    </div>
                </div>
                <div>
                    <h3 className="font-medium text-gray-900 mb-2">Order Items</h3>
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            !item.product ? (
                                <div key={item._id} className="flex justify-between items-center text-red-500">
                                    <span>Product unavailable</span>
                                    <span>—</span>
                                </div>
                            ) : (
                                <div key={item._id} className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                        <div className="ml-4">
                                            <h4 className="font-medium">{item.product.name}</h4>
                                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                                </div>
                            )
                        ))}
                    </div>
                </div>
                <div className="border-t pt-4">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>GST (18%)</span>
                            <span>${gst.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Company Charge (5%)</span>
                            <span>${companyCharge.toFixed(2)}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between text-green-600">
                                <span>Discount (5%)</span>
                                <span>-${discount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={handleBack}
                        className="flex-1 btn btn-outline"
                    >
                        Back
                    </button>
                    <button
                        onClick={handlePlaceOrder}
                        className="flex-1 btn btn-primary"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default OrderConfirmation; 