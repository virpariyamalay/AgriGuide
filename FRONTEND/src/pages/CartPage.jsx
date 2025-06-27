import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { getApiUrl } from '../config/api';
import axios from 'axios';

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

function loadRazorpayScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState('cart'); // cart, delivery, confirm
  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
    city: '',
    pincode: '',
    deliveryInstructions: '',
    alternatePhone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const progressSteps = [
    {
      icon: "📋",
      label: "Cart",
      status: step === 'cart' ? 'current' : step === 'delivery' || step === 'confirm' ? 'complete' : 'upcoming'
    },
    {
      icon: "🚚",
      label: "Delivery",
      status: step === 'delivery' ? 'current' : step === 'confirm' ? 'complete' : 'upcoming'
    },
    {
      icon: "✅",
      label: "Confirm",
      status: step === 'confirm' ? 'current' : 'upcoming'
    }
  ];

  const subtotal = cartItems.reduce((total, item) => {
    if (!item.product) return total;
    return total + (item.product.price * item.quantity);
  }, 0);
  const shipping = subtotal >= 1500 ? 0 : 60; // Free shipping for 1500 and above
  const gst = subtotal * 0.18;
  const companyCharge = subtotal * 0.05;
  const discount = subtotal >= 1000 ? subtotal * 0.05 : 0; // Discount for 1000 and above
  const total = subtotal + shipping + gst + companyCharge - discount;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const item = cartItems.find(i => i.product && (i.product._id === productId || i.product.id === productId));
    if (item && typeof item.product.stock === 'number' && newQuantity > item.product.stock) {
      toast.error('Cannot add more than available stock');
      return;
    }
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    toast.info('Item removed from cart');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProceedToDelivery = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setStep('delivery');
      setIsLoading(false);
    }, 1000);
  };

  const handleBackToCart = () => {
    setStep('cart');
  };

  const handleProceedToConfirm = () => {
    if (!deliveryDetails.fullName || !deliveryDetails.email || !deliveryDetails.phone ||
      !deliveryDetails.address || !deliveryDetails.city || !deliveryDetails.pincode) {
      toast.error('Please fill in all required fields');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setStep('confirm');
      setIsLoading(false);
    }, 1000);
  };

  const handlePlaceOrder = async () => {
    // Check stock before proceeding
    for (const item of cartItems) {
      if (!item.product || typeof item.product.stock !== 'number') continue;
      if (item.quantity > item.product.stock) {
        toast.error(`Insufficient stock for ${item.product.name}`);
        return;
      }
    }
    setIsLoading(true);
    try {
      // 1. Load Razorpay script
      const res = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!res) {
        toast.error('Razorpay SDK failed to load. Are you online?');
        setIsLoading(false);
        return;
      }

      // 2. Create Razorpay order on backend
      const { data: razorpayOrder } = await axios.post(
        getApiUrl('/api/razorpay/create-order'),
        { amount: total },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: user?.token ? `Bearer ${user.token}` : '',
          },
        }
      );

      // 3. Open Razorpay checkout
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,
        name: 'AgriGuide',
        description: 'Order Payment',
        handler: async function (response) {
          // 4. On payment success, place the order in your backend
          try {
            const orderPayload = {
              items: cartItems.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price,
              })),
              shippingAddress: {
                address: deliveryDetails.address,
                landmark: deliveryDetails.landmark,
                city: deliveryDetails.city,
                postalCode: deliveryDetails.pincode,
                country: 'India',
                phone: deliveryDetails.phone,
                deliveryInstructions: deliveryDetails.deliveryInstructions,
                alternatePhone: deliveryDetails.alternatePhone,
              },
              productSubtotal: subtotal,
              shipping: shipping,
              gst: gst,
              companyCharge: companyCharge,
              discount: discount,
              totalAmount: total,
              paymentInfo: {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              },
            };
            const orderRes = await fetch(getApiUrl('/api/orders'), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: user?.token ? `Bearer ${user.token}` : '',
              },
              body: JSON.stringify(orderPayload),
            });
            if (!orderRes.ok) {
              const errorData = await orderRes.json();
              throw new Error(errorData.message || 'Order placement failed');
            }
            navigate('/order-success');
          } catch (error) {
            toast.error(error.message || 'Order placement failed');
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          name: deliveryDetails.fullName,
          email: deliveryDetails.email,
          contact: deliveryDetails.phone,
        },
        theme: {
          color: '#3399cc',
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
          },
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error.message || 'Payment initiation failed');
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0 && step === 'cart') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </motion.div>
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Add some products to your cart and they will show up here</p>
          <button
            onClick={() => navigate('/marketplace')}
            className="btn btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {progressSteps.map((stepItem, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${stepItem.status === 'current' ? 'bg-primary-600 text-white' :
                stepItem.status === 'complete' ? 'bg-green-500 text-white' :
                  'bg-gray-200 text-gray-500'
                } transition-all duration-300`}>
                {stepItem.status === 'complete' ? '✓' : stepItem.icon}
              </div>
              {index < progressSteps.length - 1 && (
                <div className={`h-1 w-24 ${stepItem.status === 'complete' ? 'bg-green-500' : 'bg-gray-200'
                  } transition-all duration-300`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-2">
          {progressSteps.map((stepItem, index) => (
            <div key={index} className="text-sm text-gray-600 w-40 text-center">
              {stepItem.label}
            </div>
          ))}
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium">Processing...</p>
          </div>
        </div>
      )}

      {step === 'cart' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
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
          </div>

          <div className="lg:col-span-1">
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
          </div>
        </div>
      )}

      {step === 'delivery' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Delivery Details</h2>
              <button
                onClick={handleBackToCart}
                className="text-primary-600 hover:text-primary-700"
              >
                Back to Cart
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={deliveryDetails.fullName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={deliveryDetails.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={deliveryDetails.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={deliveryDetails.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Landmark</label>
                <input
                  type="text"
                  name="landmark"
                  value={deliveryDetails.landmark}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City *</label>
                <input
                  type="text"
                  name="city"
                  value={deliveryDetails.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={deliveryDetails.pincode}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Delivery Instructions</label>
                <textarea
                  name="deliveryInstructions"
                  value={deliveryDetails.deliveryInstructions}
                  onChange={handleInputChange}
                  rows="2"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="e.g. Call before delivery, leave at gate, etc."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Alternate Phone</label>
                <input
                  type="tel"
                  name="alternatePhone"
                  value={deliveryDetails.alternatePhone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Optional alternate contact number"
                />
              </div>
              <button
                type="button"
                onClick={handleProceedToConfirm}
                className="w-full btn btn-primary py-3"
              >
                Proceed to Confirm
              </button>
            </form>
          </div>
        </div>
      )}

      {step === 'confirm' && (
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
                  onClick={() => setStep('delivery')}
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
      )}
    </div>
  );
};

export default CartPage;