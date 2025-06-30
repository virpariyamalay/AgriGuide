import React from 'react';

const OrderSummary = ({ subtotal, shipping, gst, companyCharge, discount, total, handleProceedToDelivery }) => (
    <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-3">
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
            <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
        <button
            onClick={handleProceedToDelivery}
            className="w-full btn btn-primary mt-6"
        >
            Proceed to Delivery
        </button>
    </div>
);

export default OrderSummary; 