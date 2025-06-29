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
    const doc = new jsPDF();

    // Modern, simple header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('AgriGuide', 20, 20);
    doc.setFontSize(16);
    doc.text('INVOICE', 160, 20);
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 25, 190, 25);

    // Billing info
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('BILL FROM:', 20, 35);
    doc.text('BILL TO:', 120, 35);
    doc.setFont('helvetica', 'normal');
    const billFrom = [
      'AgriGuide',
      '201, Corporate Heights, SG Highway, Ahmedabad, Gujarat',
      'malayvirpariya2026@gmail.com',
      '+91 81414 24177'
    ];
    const billTo = [
      order.shippingAddress?.address || 'N/A',
      order.shippingAddress?.city || 'N/A',
      order.shippingAddress?.postalCode || 'N/A',
      order.shippingAddress?.country || 'India',
      order.shippingAddress?.phone || ''
    ];
    const startY = 42;
    for (let i = 0; i < Math.max(billFrom.length, billTo.length); i++) {
      doc.text(billFrom[i] || '', 20, startY + i * 6);
      doc.text(billTo[i] || '', 120, startY + i * 6);
    }

    // Invoice details
    doc.setFont('helvetica', 'bold');
    doc.text('Invoice No:', 20, 70);
    doc.setFont('helvetica', 'normal');
    doc.text(`${order._id}`, 50, 70);
    doc.setFont('helvetica', 'bold');
    doc.text('Date:', 120, 70);
    doc.setFont('helvetica', 'normal');
    doc.text(format(new Date(order.createdAt), 'PPP'), 140, 70);

    // Items table
    doc.autoTable({
      startY: 80,
      head: [['Description', 'Qty', 'Price', 'Total']],
      body: order.items.map(item => [
        item.product?.name || 'N/A',
        item.quantity,
        item.price,
        (item.price * item.quantity)
      ]),
      theme: 'grid',
      headStyles: { fillColor: [245, 245, 245], textColor: [0, 0, 0], fontStyle: 'bold', fontSize: 10 },
      bodyStyles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 20, halign: 'center' },
        2: { cellWidth: 30, halign: 'right' },
        3: { cellWidth: 30, halign: 'right' }
      }
    });

    let y = doc.autoTable.previous.finalY + 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Subtotal:', 140, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${order.productSubtotal}`, 180, y, 'right');
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.text('Shipping:', 140, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${order.shipping}`, 180, y, 'right');
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.text('GST:', 140, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${order.gst}`, 180, y, 'right');
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.text('Company Charge:', 140, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${order.companyCharge}`, 180, y, 'right');
    y += 8;
    if (order.discount > 0) {
      doc.setFont('helvetica', 'bold');
      doc.text('Discount:', 140, y);
      doc.setFont('helvetica', 'normal');
      doc.text(`-₹${order.discount}`, 180, y, 'right');
      y += 8;
    }
    doc.setFont('helvetica', 'bold');
    doc.text('Total:', 140, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`₹${order.totalAmount}`, 180, y, 'right');

    // Modern, simple terms
    y += 16;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Terms & Conditions', 20, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text([
      '1. This invoice is for pre-paid orders only.',
      '2. Orders cannot be cancelled or refunded once payment is made.',
      '3. For support, contact malayvirpariya2026@gmail.com or +91 81414 24177.'
    ], 20, y + 7);

    // Signature and footer
    let footerY = y + 32;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Malay Virpariya', 140, footerY);
    doc.setFont('helvetica', 'normal');
    doc.text('Founder & CEO', 140, footerY + 6);
    doc.text('For AgriGuide Solutions Inc.', 140, footerY + 12);
    doc.setFontSize(8);
    doc.text('https://www.agriguide.com', 20, footerY + 24);
    doc.text('Phone +91 81414 24177 | accounts@agriguide.com', 20, footerY + 30);

    doc.setFontSize(8);
    doc.text('Thank you for shopping with AgriGuide!', 105, 290, 'center');

    doc.save(`Invoice-${order._id}.pdf`);
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