// import { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import { format } from 'date-fns'
// import { jsPDF } from 'jspdf'
// import 'jspdf-autotable'

// const OrdersPage = () => {
//   const [orders, setOrders] = useState([])

//   useEffect(() => {
//     const savedOrders = localStorage.getItem('orders')
//     if (savedOrders) {
//       setOrders(JSON.parse(savedOrders))
//     }
//   }, [])

//   const generatePDF = (order) => {
//     const doc = new jsPDF()
    
//     // Add white background
//     doc.setFillColor(255, 255, 255)
//     doc.rect(0, 0, 210, 297, 'F')
    
//     // Add header with dark green background
//     doc.setFillColor(22, 38, 38)
//     doc.rect(0, 0, 210, 40, 'F')
    
//     // Remove logo image since SVG is not supported by jsPDF
//     // Instead, add company name in white text
//     doc.setTextColor(255, 255, 255)
//     doc.setFontSize(20)
//     doc.setFont('helvetica', 'bold')
//     doc.text('AgriGuide', 20, 25)
    
//     // Add INVOICE text
//     doc.setTextColor(0, 0, 0)
//     doc.setFontSize(24)
//     doc.setFont('helvetica', 'bold')
//     doc.text('INVOICE', 140, 30)
    
//     // Add billing information
//     doc.setFontSize(12)
//     doc.setFont('helvetica', 'bold')
//     doc.text('BILL FROM:', 20, 60)
//     doc.text('BILL TO:', 140, 60)
    
//     doc.setFont('helvetica', 'normal')
//     doc.setFontSize(10)
//     // From details
//     doc.text([
//       'AgriGuide',
//       '1234 Street Name',
//       'City, State, Zip'
//     ], 20, 70)
    
//     // To details
//     doc.text([
//       order.deliveryDetails.fullName,
//       order.deliveryDetails.address,
//       `${order.deliveryDetails.city}, ${order.deliveryDetails.state} ${order.deliveryDetails.pincode}`
//     ], 140, 70)
    
//     // Add invoice details
//     doc.text([
//       `Number: ${order.id}`,
//       `Issue Date: ${format(new Date(order.date), 'MMM d, yyyy')}`,
//       `Due Date: ${format(new Date(order.date), 'MMM d, yyyy')}`,
//       `Total Due: $${order.total.toFixed(2)}`
//     ], 140, 95)
    
//     // Add items table
//     doc.autoTable({
//       startY: 120,
//       head: [['DESCRIPTION', 'QTY', 'PRICE', 'TOTAL']],
//       body: order.items.map(item => [
//         item.name,
//         item.quantity,
//         `$${item.price.toFixed(2)}`,
//         `$${(item.price * item.quantity).toFixed(2)}`
//       ]),
//       theme: 'plain',
//       headStyles: {
//         fillColor: [255, 255, 255],
//         textColor: [0, 0, 0],
//         fontStyle: 'bold',
//         fontSize: 10
//       },
//       bodyStyles: {
//         fontSize: 10
//       },
//       columnStyles: {
//         0: { cellWidth: 90 },
//         1: { cellWidth: 30, halign: 'center' },
//         2: { cellWidth: 30, halign: 'right' },
//         3: { cellWidth: 30, halign: 'right' }
//       }
//     })
    
//     const finalY = doc.autoTable.previous.finalY + 20
    
//     // Add totals
//     doc.setFontSize(10)
//     doc.text('SUBTOTAL', 140, finalY)
//     doc.text(`$${order.subtotal.toFixed(2)}`, 180, finalY, 'right')
    
//     doc.text('TAX (8%)', 140, finalY + 10)
//     const tax = order.subtotal * 0.08
//     doc.text(`$${tax.toFixed(2)}`, 180, finalY + 10, 'right')
    
//     // Add amount due with colored background
//     doc.setFillColor(22, 38, 38)
//     doc.rect(140, finalY + 15, 40, 10, 'F')
//     doc.setTextColor(255, 255, 255)
//     doc.text('AMOUNT DUE', 142, finalY + 22)
//     doc.text(`$${order.total.toFixed(2)}`, 180, finalY + 22, 'right')
    
//     // Add terms and conditions
//     doc.setTextColor(0, 0, 0)
//     doc.setFontSize(10)
//     doc.setFont('helvetica', 'bold')
//     doc.text('TERMS & CONDITIONS:', 20, finalY + 40)
//     doc.setFont('helvetica', 'normal')
//     doc.text([
//       'Payment Due within 30 days of invoice date.',
//       'Late Fee: 1.5% monthly on overdue amounts.',
//       'Discrepancies: Notify in writing within 7 days.',
//       'Returns/Refunds: Not accepted unless otherwise agreed.'
//     ], 20, finalY + 50)
    
//     // Add bank details
//     doc.text([
//       'Bank of America',
//       'Account Name: AgriGuide Solutions, Inc.',
//       'Account No: 99999999',
//       'Routing No: 303030000'
//     ], 20, finalY + 80)
    
//     // Add signature
//     doc.setFont('helvetica', 'bold')
//     doc.text('Jane Smith', 140, finalY + 80)
//     doc.setFont('helvetica', 'normal')
//     doc.setFontSize(9)
//     doc.text('Founder & CEO', 140, finalY + 85)
//     doc.text('For AgriGuide Solutions Inc.', 140, finalY + 90)
    
//     // Add footer
//     doc.setFontSize(8)
//     doc.text([
//       'https://www.agriguide.com',
//       'Phone +1-240-229-2234 | accounts@agriguide.com'
//     ], 105, 280, 'center')
    
//     // Save the PDF
//     doc.save(`Invoice-${order.id}.pdf`)
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="text-center py-12">
//           <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
//           <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
//       <div className="space-y-6">
//         {orders.map((order) => (
//           <motion.div
//             key={order.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-lg shadow-md overflow-hidden"
//           >
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h3 className="text-xl font-semibold mb-1">
//                     Order #{order.id}
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     Placed on {format(new Date(order.date), 'PPp')}
//                   </p>
//                 </div>
//                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                   order.status === 'Delivered' 
//                     ? 'bg-green-100 text-green-800'
//                     : 'bg-primary-100 text-primary-800'
//                 }`}>
//                   {order.status}
//                 </span>
//               </div>
              
//               <div className="space-y-4">
//                 {order.items.map((item, index) => (
//                   <div key={index} className="flex justify-between items-center">
//                     <div className="flex items-center">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-16 h-16 object-cover rounded-md"
//                       />
//                       <div className="ml-4">
//                         <h4 className="font-medium">{item.name}</h4>
//                         <p className="text-sm text-gray-600">
//                           Quantity: {item.quantity}
//                         </p>
//                       </div>
//                     </div>
//                     <span className="font-medium">
//                       ${(item.price * item.quantity).toFixed(2)}
//                     </span>
//                   </div>
//                 ))}
//               </div>
              
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <p className="text-gray-600">Total</p>
//                     <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
//                   </div>
//                   <button
//                     onClick={() => generatePDF(order)}
//                     className="btn btn-primary flex items-center"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
//                     </svg>
//                     Download Invoice
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default OrdersPage
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

const OrdersPage = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  const generatePDF = (order) => {
    const doc = new jsPDF()

    doc.setFillColor(255, 255, 255)
    doc.rect(0, 0, 210, 297, 'F')

    doc.setFillColor(22, 38, 38)
    doc.rect(0, 0, 210, 40, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('AgriGuide', 20, 25)

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text('INVOICE', 140, 30)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('BILL FROM:', 20, 60)
    doc.text('BILL TO:', 140, 60)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text([
      'AgriGuide',
      '1234 Street Name',
      'City, State, Zip'
    ], 20, 70)

    doc.text([
      order.deliveryDetails.fullName,
      order.deliveryDetails.address,
      `${order.deliveryDetails.city}, ${order.deliveryDetails.state} ${order.deliveryDetails.pincode}`
    ], 140, 70)

    const orderDate = order.date ? new Date(order.date) : null
    const issueDate = orderDate instanceof Date && !isNaN(orderDate) ? format(orderDate, 'MMM d, yyyy') : 'N/A'

    doc.text([
      `Number: ${order.id}`,
      `Issue Date: ${issueDate}`,
      `Due Date: ${issueDate}`,
      `Total Due: $${order.total.toFixed(2)}`
    ], 140, 95)

    doc.autoTable({
      startY: 120,
      head: [['DESCRIPTION', 'QTY', 'PRICE', 'TOTAL']],
      body: order.items.map(item => [
        item.name,
        item.quantity,
        `$${item.price.toFixed(2)}`,
        `$${(item.price * item.quantity).toFixed(2)}`
      ]),
      theme: 'plain',
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        fontSize: 10
      },
      bodyStyles: {
        fontSize: 10
      },
      columnStyles: {
        0: { cellWidth: 90 },
        1: { cellWidth: 30, halign: 'center' },
        2: { cellWidth: 30, halign: 'right' },
        3: { cellWidth: 30, halign: 'right' }
      }
    })

    const finalY = doc.autoTable.previous.finalY + 20

    doc.setFontSize(10)
    doc.text('SUBTOTAL', 140, finalY)
    doc.text(`$${order.subtotal.toFixed(2)}`, 180, finalY, 'right')

    doc.text('TAX (8%)', 140, finalY + 10)
    const tax = order.subtotal * 0.08
    doc.text(`$${tax.toFixed(2)}`, 180, finalY + 10, 'right')

    doc.setFillColor(22, 38, 38)
    doc.rect(140, finalY + 15, 40, 10, 'F')
    doc.setTextColor(255, 255, 255)
    doc.text('AMOUNT DUE', 142, finalY + 22)
    doc.text(`$${order.total.toFixed(2)}`, 180, finalY + 22, 'right')

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('TERMS & CONDITIONS:', 20, finalY + 40)
    doc.setFont('helvetica', 'normal')
    doc.text([
      'Payment Due within 30 days of invoice date.',
      'Late Fee: 1.5% monthly on overdue amounts.',
      'Discrepancies: Notify in writing within 7 days.',
      'Returns/Refunds: Not accepted unless otherwise agreed.'
    ], 20, finalY + 50)

    doc.text([
      'Bank of America',
      'Account Name: AgriGuide Solutions, Inc.',
      'Account No: 99999999',
      'Routing No: 303030000'
    ], 20, finalY + 80)

    doc.setFont('helvetica', 'bold')
    doc.text('Jane Smith', 140, finalY + 80)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text('Founder & CEO', 140, finalY + 85)
    doc.text('For AgriGuide Solutions Inc.', 140, finalY + 90)

    doc.setFontSize(8)
    doc.text([
      'https://www.agriguide.com',
      'Phone +1-240-229-2234 | accounts@agriguide.com'
    ], 105, 280, 'center')

    doc.save(`Invoice-${order.id}.pdf`)
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => {
          const orderDate = order.date ? new Date(order.date) : null
          const formattedDate = orderDate instanceof Date && !isNaN(orderDate) ? format(orderDate, 'PPp') : 'Invalid Date'

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      Order #{order.id}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Placed on {formattedDate}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'Delivered' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-primary-100 text-primary-800'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="ml-4">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-600">Total</p>
                      <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => generatePDF(order)}
                      className="btn btn-primary flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                      </svg>
                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default OrdersPage
