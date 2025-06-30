import React from 'react';

const CartItemsList = ({ cartItems, handleQuantityChange, handleRemoveItem, clearCart }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
            {cartItems.map((item) => (
                !item.product ? null : (
                    <div key={item._id} className="flex items-center py-5 border-b border-gray-200 last:border-0">
                        <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1 ml-6">
                            <h3 className="text-lg font-semibold">{item.product.name}</h3>
                            <p className="text-gray-600 text-sm mb-2">{item.product.description}</p>
                            <div className="flex items-center">
                                <button
                                    onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    -
                                </button>
                                <span className="mx-4">{item.quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                                    className="text-gray-500 hover:text-gray-700"
                                    disabled={item.quantity >= item.product.stock}
                                    title={item.quantity >= item.product.stock ? 'No more stock available' : 'Increase quantity'}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                            <button
                                onClick={() => handleRemoveItem(item.product._id)}
                                className="text-red-600 hover:text-red-700 text-sm"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                )
            ))}
            {cartItems.length > 0 && (
                <button
                    onClick={clearCart}
                    className="mt-6 btn btn-outline w-full"
                >
                    Clear Cart
                </button>
            )}
        </div>
    </div>
);

export default CartItemsList; 