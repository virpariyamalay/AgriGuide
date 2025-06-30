import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { API_ENDPOINTS, getApiUrl } from '../config/api';
import axios from 'axios';
import CartItemsList from '../components/cart/CartItemsList';
import OrderSummary from '../components/cart/OrderSummary';
import DeliveryForm from '../components/cart/DeliveryForm';
import OrderConfirmation from '../components/cart/OrderConfirmation';

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
          // 4. On payment success, verify payment before placing the order
          try {
            const verifyRes = await axios.post(
              getApiUrl('/api/razorpay/verify-payment'),
              {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: user?.token ? `Bearer ${user.token}` : '',
                },
              }
            );
            if (!verifyRes.data.success) {
              toast.error('Payment verification failed');
              setIsLoading(false);
              return;
            }
            // Now place the order in your backend
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
            const orderRes = await fetch(API_ENDPOINTS.ORDERS.LIST, {
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
            <CartItemsList
              cartItems={cartItems}
              handleQuantityChange={handleQuantityChange}
              handleRemoveItem={handleRemoveItem}
              clearCart={clearCart}
            />
          </div>
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              gst={gst}
              companyCharge={companyCharge}
              discount={discount}
              total={total}
              handleProceedToDelivery={handleProceedToDelivery}
            />
          </div>
        </div>
      )}

      {step === 'delivery' && (
        <DeliveryForm
          deliveryDetails={deliveryDetails}
          handleInputChange={handleInputChange}
          handleProceedToConfirm={handleProceedToConfirm}
          handleBackToCart={handleBackToCart}
        />
      )}

      {step === 'confirm' && (
        <OrderConfirmation
          deliveryDetails={deliveryDetails}
          cartItems={cartItems}
          subtotal={subtotal}
          shipping={shipping}
          gst={gst}
          companyCharge={companyCharge}
          discount={discount}
          total={total}
          handleBack={() => setStep('delivery')}
          handlePlaceOrder={handlePlaceOrder}
        />
      )}
    </div>
  );
};

export default CartPage;