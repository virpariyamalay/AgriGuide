import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import OrderList from '../components/OrdersPage/OrderList'
import { useOrders } from '../contexts/OrderContext'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const { fetchUserOrders, userOrders, loading } = useOrders()
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const loadOrders = async () => {
      await fetchUserOrders()
    }

    loadOrders()
  }, [user, navigate, fetchUserOrders])

  useEffect(() => {
    setOrders(userOrders)
  }, [userOrders])

  const generatePDF = (order) => {
    const doc = new jsPDF()

    // Add white background
    doc.setFillColor(255, 255, 255)
    doc.rect(0, 0, 210, 297, 'F')

    // Add header with dark green background
    doc.setFillColor(22, 38, 38)
    doc.rect(0, 0, 210, 40, 'F')

    // Remove logo image since SVG is not supported by jsPDF
    // Instead, add company name in white text
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('AgriGuide', 20, 25)

    // Add INVOICE text
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text('INVOICE', 140, 30)

    // Add billing information
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('BILL FROM:', 20, 60)
    doc.text('BILL TO:', 140, 60)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    // From details
    doc.text([
      'AgriGuide',
      '1234 Street Name',
      'City, State, Zip'
    ], 20, 70)

    // To details
    doc.text([
      order.shippingAddress?.address || 'N/A',
      order.shippingAddress?.city || 'N/A',
      order.shippingAddress?.postalCode || 'N/A'
    ], 140, 70)

    // Add invoice details
    doc.text([
      `Number: ${order._id}`,
      `Issue Date: ${new Date(order.createdAt).toLocaleDateString()}`,
      `Due Date: ${new Date(order.createdAt).toLocaleDateString()}`,
      `Total Due: ₹${order.totalAmount}`
    ], 140, 95)

    // Add items table
    doc.autoTable({
      startY: 120,
      head: [['DESCRIPTION', 'QTY', 'PRICE', 'TOTAL']],
      body: order.items.map(item => [
        item.product?.name || 'N/A',
        item.quantity,
        `₹${item.price}`,
        `₹${(item.price * item.quantity)}`
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

    // Add totals
    doc.setFontSize(10)
    doc.text('SUBTOTAL', 140, finalY)
    doc.text(`₹${order.productSubtotal}`, 180, finalY, 'right')

    doc.text('SHIPPING', 140, finalY + 10)
    doc.text(`₹${order.shipping}`, 180, finalY + 10, 'right')

    doc.text('GST', 140, finalY + 20)
    doc.text(`₹${order.gst}`, 180, finalY + 20, 'right')

    doc.text('COMPANY CHARGE', 140, finalY + 30)
    doc.text(`₹${order.companyCharge}`, 180, finalY + 30, 'right')

    if (order.discount > 0) {
      doc.text('DISCOUNT', 140, finalY + 40)
      doc.text(`-₹${order.discount}`, 180, finalY + 40, 'right')
    }

    // Add amount due with colored background
    doc.setFillColor(22, 38, 38)
    doc.rect(140, finalY + 50, 40, 10, 'F')
    doc.setTextColor(255, 255, 255)
    doc.text('AMOUNT DUE', 142, finalY + 57)
    doc.text(`₹${order.totalAmount}`, 180, finalY + 57, 'right')

    // Add terms and conditions
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('TERMS & CONDITIONS:', 20, finalY + 70)
    doc.setFont('helvetica', 'normal')
    doc.text([
      'Payment Due within 30 days of invoice date.',
      'Late Fee: 1.5% monthly on overdue amounts.',
      'Discrepancies: Notify in writing within 7 days.',
      'Returns/Refunds: Not accepted unless otherwise agreed.'
    ], 20, finalY + 80)

    // Add bank details
    doc.text([
      'Bank of America',
      'Account Name: AgriGuide Solutions, Inc.',
      'Account No: 99999999',
      'Routing No: 303030000'
    ], 20, finalY + 110)

    // Add signature
    doc.setFont('helvetica', 'bold')
    doc.text('Jane Smith', 140, finalY + 110)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text('Founder & CEO', 140, finalY + 115)
    doc.text('For AgriGuide Solutions Inc.', 140, finalY + 120)

    // Add footer
    doc.setFontSize(8)
    doc.text([
      'https://www.agriguide.com',
      'Phone +1-240-229-2234 | accounts@agriguide.com'
    ], 105, 280, 'center')

    // Save the PDF
    doc.save(`Invoice-${order._id}.pdf`)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    )
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
      <OrderList orders={orders} generatePDF={generatePDF} />
    </div>
  )
}

export default OrdersPage