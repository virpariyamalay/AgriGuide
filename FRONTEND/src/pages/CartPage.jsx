// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { useCart } from '../contexts/CartContext'
// import { toast } from 'react-toastify'
// import { format } from 'date-fns'

// const CartPage = () => {
//   const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()
//   const [promoCode, setPromoCode] = useState('')
//   const [isPromoApplied, setIsPromoApplied] = useState(false)
//   const [discount, setDiscount] = useState(0)
//   const [showDeliveryForm, setShowDeliveryForm] = useState(false)
//   const [deliveryDetails, setDeliveryDetails] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: '',
//     notes: ''
//   })
//   const navigate = useNavigate()
  
//   const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
//   const shipping = subtotal > 50 ? 0 : 5.99
//   const total = subtotal + shipping - discount

//   const handleQuantityChange = (id, newQuantity) => {
//     if (newQuantity < 1) return
//     updateQuantity(id, newQuantity)
//   }
  
//   const handleRemoveItem = (id) => {
//     removeFromCart(id)
//     toast.info('Item removed from cart')
//   }
  
//   const handleApplyPromo = () => {
//     if (promoCode.toLowerCase() === 'first10') {
//       setDiscount(subtotal * 0.1)
//       setIsPromoApplied(true)
//       toast.success('Promo code applied successfully!')
//     } else {
//       toast.error('Invalid promo code')
//     }
//   }

//   const handleDeliveryDetailsChange = (e) => {
//     const { name, value } = e.target
//     setDeliveryDetails(prev => ({
//       ...prev,
//       [name]: value
//     }))
//   }

//   const validateDeliveryDetails = () => {
//     const required = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'pincode']
//     for (const field of required) {
//       if (!deliveryDetails[field]) {
//         toast.error(`Please enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`)
//         return false
//       }
//     }
//     return true
//   }

//   const handleCheckout = () => {
//     if (!validateDeliveryDetails()) return

//     const orderId = `ORD${Date.now()}`
//     const orderDate = new Date().toISOString()
    
//     const order = {
//       id: orderId,
//       date: orderDate,
//       items: cartItems,
//       subtotal,
//       shipping,
//       discount,
//       total,
//       status: 'Processing',
//       deliveryDetails
//     }
    
//     const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
//     localStorage.setItem('orders', JSON.stringify([order, ...existingOrders]))
    
//     toast.success('Order placed successfully!')
//     clearCart()
//     navigate('/orders')
//   }

//   if (cartItems.length === 0) {
//     return (
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
//           <div className="flex justify-center mb-4">
//             <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
//               <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//               </svg>
//             </div>
//           </div>
//           <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
//           <p className="text-gray-600 dark:text-gray-400 mb-6">Add some delicious items to your cart!</p>
//           <Link to="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h1 className="text-2xl md:text-3xl font-bold mb-8">Your Cart</h1>

//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="lg:w-2/3">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-6">
//             <div className="p-4 md:p-6">
//               <div className="space-y-4">
//                 {cartItems.map((item) => (
//                   <div key={item.id} className="flex flex-col sm:flex-row items-start gap-4 py-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
//                     <div className="w-full sm:w-24 h-24 relative rounded-lg overflow-hidden">
//                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex flex-col sm:flex-row sm:justify-between">
//                         <h3 className="text-lg font-medium">{item.name}</h3>
//                         <p className="text-lg font-medium mt-1 sm:mt-0">${(item.price * item.quantity).toFixed(2)}</p>
//                       </div>
//                       <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
//                       <div className="flex items-center justify-between mt-4">
//                         <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
//                           <button
//                             onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
//                             className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
//                           >
//                             -
//                           </button>
//                           <span className="px-3 py-1 border-x border-gray-300 dark:border-gray-600">{item.quantity}</span>
//                           <button
//                             onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
//                             className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
//                           >
//                             +
//                           </button>
//                         </div>
//                         <button
//                           onClick={() => handleRemoveItem(item.id)}
//                           className="text-sm font-medium text-red-600 hover:text-red-700"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="lg:w-1/3">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-20">
//             <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
//             <div className="space-y-4 mb-6">
//               <div className="flex justify-between">
//                 <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
//                 <span className="font-medium">${subtotal.toFixed(2)}</span>
//               </div>
              
//               <div className="flex justify-between">
//                 <span className="text-gray-600 dark:text-gray-400">Shipping</span>
//                 <span className="font-medium">
//                   {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
//                 </span>
//               </div>
              
//               {isPromoApplied && (
//                 <div className="flex justify-between text-green-600">
//                   <span>Discount</span>
//                   <span>-${discount.toFixed(2)}</span>
//                 </div>
//               )}
              
//               <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
//                 <div className="flex justify-between">
//                   <span className="font-semibold">Total</span>
//                   <span className="font-bold text-lg">${total.toFixed(2)}</span>
//                 </div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                   including VAT
//                 </p>
//               </div>
//             </div>
            
//             {!isPromoApplied && (
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Promo Code
//                 </label>
//                 <div className="flex">
//                   <input
//                     type="text"
//                     value={promoCode}
//                     onChange={(e) => setPromoCode(e.target.value)}
//                     className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
//                     placeholder="Enter code"
//                   />
//                   <button
//                     onClick={handleApplyPromo}
//                     className="px-4 py-2 bg-primary-600 text-white font-medium rounded-r-lg hover:bg-primary-700"
//                   >
//                     Apply
//                   </button>
//                 </div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                   Try "FIRST10" for 10% off
//                 </p>
//               </div>
//             )}
            
//             <button
//               onClick={() => setShowDeliveryForm(true)}
//               className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-sm"
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       </div>

//       {showDeliveryForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold">Delivery Details</h2>
//                 <button onClick={() => setShowDeliveryForm(false)} className="text-gray-400 hover:text-gray-500">
//                   <span className="sr-only">Close</span>
//                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       id="fullName"
//                       name="fullName"
//                       value={deliveryDetails.fullName}
//                       onChange={handleDeliveryDetailsChange}
//                       className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={deliveryDetails.email}
//                       onChange={handleDeliveryDetailsChange}
//                       className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Phone
//                     </label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       value={deliveryDetails.phone}
//                       onChange={handleDeliveryDetailsChange}
//                       className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Address
//                     </label>
//                     <input
//                       type="text"
//                       id="address"
//                       name="address"
//                       value={deliveryDetails.address}
//                       onChange={handleDeliveryDetailsChange}
//                       className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       City
//                     </label>
//                     <input
//                       type="text"
//                       id="city"
//                       name="city"
//                       value={deliveryDetails.city}
//                       onChange={handleDeliveryDetailsChange}
//                       className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       State
//                     </label>
//                     <input
//                       type="text"
//                       id="state"
//                       name="state"
//                       value={deliveryDetails.state}
//                       onChange={handleDeliveryDetailsChange}
//                       className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Pincode
//                     </label>
//                     <input
//                       type="text"
//                       id="pincode"
//                       name="pincode"
//                       value={deliveryDetails.pincode}
//                       onChange={handleDeliveryDetailsChange}
//                       className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Delivery Notes (Optional)
//                   </label>
//                   <textarea
//                     id="notes"
//                     name="notes"
//                     rows="3"
//                     value={deliveryDetails.notes}
//                     onChange={handleDeliveryDetailsChange}
//                     className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
//                     placeholder="Any special instructions for delivery"
//                   ></textarea>
//                 </div>

//                 <div className="flex justify-end space-x-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowDeliveryForm(false)}
//                     className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleCheckout}
//                     className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
//                   >
//                     Place Order
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default CartPage

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import { toast } from 'react-toastify'
import { format } from 'date-fns'

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [isPromoApplied, setIsPromoApplied] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [showDeliveryForm, setShowDeliveryForm] = useState(false)
  const [showBillPreview, setShowBillPreview] = useState(false)
  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
    gstin: '',
    pan: ''
  })
  const navigate = useNavigate()
  
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const gst = subtotal * 0.18 // 18% GST
  const total = subtotal + shipping + gst - discount

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return
    updateQuantity(id, newQuantity)
  }
  
  const handleRemoveItem = (id) => {
    removeFromCart(id)
    toast.info('Item removed from cart')
  }
  
  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'first10') {
      setDiscount(subtotal * 0.1)
      setIsPromoApplied(true)
      toast.success('Promo code applied successfully!')
    } else {
      toast.error('Invalid promo code')
    }
  }

  const handleDeliveryDetailsChange = (e) => {
    const { name, value } = e.target
    setDeliveryDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateDeliveryDetails = () => {
    const required = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'pincode']
    for (const field of required) {
      if (!deliveryDetails[field]) {
        toast.error(`Please enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`)
        return false
      }
    }
    return true
  }

  const handleProceedToPreview = () => {
    if (!validateDeliveryDetails()) return
    setShowDeliveryForm(false)
    setShowBillPreview(true)
  }

  const handlePlaceOrder = () => {
    const orderId = `ORD${Date.now()}`
    const orderDate = new Date().toISOString()
    
    const order = {
      id: orderId,
      date: orderDate,
      items: cartItems,
      subtotal,
      shipping,
      gst,
      discount,
      total,
      status: 'Processing',
      deliveryDetails
    }
    
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    localStorage.setItem('orders', JSON.stringify([order, ...existingOrders]))
    
    toast.success('Order placed successfully!')
    clearCart()
    navigate('/orders')
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Add some delicious items to your cart!</p>
          <Link to="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  if (showBillPreview) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Invoice Preview</h2>
              <p className="text-gray-600">Date: {format(new Date(), 'MMM dd, yyyy')}</p>
              <p className="text-gray-600">Invoice #: INV-{Date.now()}</p>
            </div>
            <img src="/logo.svg" alt="Company Logo" className="h-12" />
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-2">Bill From:</h3>
              <p className="text-gray-600">AgriGuide Solutions</p>
              <p className="text-gray-600">123 Farm Street</p>
              <p className="text-gray-600">Agritown, AG 12345</p>
              <p className="text-gray-600">GSTIN: 12ABCDE3456F7ZG</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Bill To:</h3>
              <p className="text-gray-600">{deliveryDetails.fullName}</p>
              <p className="text-gray-600">{deliveryDetails.address}</p>
              <p className="text-gray-600">{deliveryDetails.city}, {deliveryDetails.state} {deliveryDetails.pincode}</p>
              {deliveryDetails.gstin && <p className="text-gray-600">GSTIN: {deliveryDetails.gstin}</p>}
              {deliveryDetails.pan && <p className="text-gray-600">PAN: {deliveryDetails.pan}</p>}
            </div>
          </div>

          <table className="w-full mb-8">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-medium">${gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="font-semibold mb-4">Terms & Conditions:</h3>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
              <li>Payment is due within 30 days</li>
              <li>Please include invoice number on your payment</li>
              <li>Make all checks payable to AgriGuide Solutions</li>
            </ul>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => setShowBillPreview(false)}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={handlePlaceOrder}
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Confirm & Place Order
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-4 md:p-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-start gap-4 py-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <div className="w-full sm:w-24 h-24 relative rounded-lg overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-lg font-medium mt-1 sm:mt-0">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 border-x border-gray-300 dark:border-gray-600">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-sm font-medium text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">GST (18%)</span>
                <span className="font-medium">${gst.toFixed(2)}</span>
              </div>
              
              {isPromoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg">${total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  including GST
                </p>
              </div>
            </div>
            
            {!isPromoApplied && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Promo Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter code"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-primary-600 text-white font-medium rounded-r-lg hover:bg-primary-700"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Try "FIRST10" for 10% off
                </p>
              </div>
            )}
            
            <button
              onClick={() => setShowDeliveryForm(true)}
              className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-sm"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {showDeliveryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Delivery Details</h2>
                <button onClick={() => setShowDeliveryForm(false)} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={deliveryDetails.fullName}
                      onChange={handleDeliveryDetailsChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={deliveryDetails.email}
                      onChange={handleDeliveryDetailsChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={deliveryDetails.phone}
                      onChange={handleDeliveryDetailsChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={deliveryDetails.address}
                      onChange={handleDeliveryDetailsChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={deliveryDetails.city}
                      onChange={handleDeliveryDetailsChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={deliveryDetails.state}
                      onChange={handleDeliveryDetailsChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Pincode
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={deliveryDetails.pincode}
                      onChange={handleDeliveryDetailsChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="gstin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      GSTIN (Optional)
                    </label>
                    <input
                      type="text"
                      id="gstin"
                      name="gstin"
                      value={deliveryDetails.gstin}
                      onChange={handleDeliveryDetailsChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="pan" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      PAN (Optional)
                    </label>
                    <input
                      type="text"
                      id="pan"
                      name="pan"
                      value={deliveryDetails.pan}
                      onChange={handleDeliveryDetailsChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Delivery Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="3"
                    value={deliveryDetails.notes}
                    onChange={handleDeliveryDetailsChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Any special instructions for delivery"
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowDeliveryForm(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleProceedToPreview}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    Preview Bill
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage