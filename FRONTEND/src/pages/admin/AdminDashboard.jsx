import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../contexts/ProductContext';
import ProductForm from '../../components/admin/ProductForm';
import { toast } from 'react-toastify';
import { format, isValid } from 'date-fns';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const { logout } = useAuth();
  const { products, addProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleAddProduct = async (data) => {
    try {
      await addProduct(data);
      toast.success('Product added successfully!');
    } catch (error) {
      toast.error('Failed to add product');
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      toast.success('Product deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete product');
      console.error('Error deleting product:', error);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isValid(date) ? format(date, 'PPp') : 'N/A';
  };

  const generatePDF = (order) => {
    const doc = new jsPDF();

    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setFillColor(22, 38, 38);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('AgriGuide', 20, 25);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', 140, 30);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('BILL FROM:', 20, 60);
    doc.text('BILL TO:', 140, 60);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text([
      'AgriGuide',
      '1234 Street Name',
      'City, State, Zip'
    ], 20, 70);

    doc.text([
      order.deliveryDetails.fullName,
      order.deliveryDetails.address,
      `${order.deliveryDetails.city}, ${order.deliveryDetails.state} ${order.deliveryDetails.pincode}`
    ], 140, 70);

    const orderDate = new Date(order.date);
    const formattedDate = isValid(orderDate) ? format(orderDate, 'MMM d, yyyy') : 'N/A';

    doc.text([
      `Number: ${order.id}`,
      `Issue Date: ${formattedDate}`,
      `Due Date: ${formattedDate}`,
      `Total Due: $${order.total.toFixed(2)}`
    ], 140, 95);

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
    });

    const finalY = doc.autoTable.previous.finalY + 20;

    doc.setFontSize(10);
    doc.text('SUBTOTAL', 140, finalY);
    doc.text(`$${order.subtotal.toFixed(2)}`, 180, finalY, 'right');

    doc.text('TAX (8%)', 140, finalY + 10);
    const tax = order.subtotal * 0.08;
    doc.text(`$${tax.toFixed(2)}`, 180, finalY + 10, 'right');

    doc.setFillColor(22, 38, 38);
    doc.rect(140, finalY + 15, 40, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('AMOUNT DUE', 142, finalY + 22);
    doc.text(`$${order.total.toFixed(2)}`, 180, finalY + 22, 'right');

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('TERMS & CONDITIONS:', 20, finalY + 40);
    doc.setFont('helvetica', 'normal');
    doc.text([
      'Payment Due within 30 days of invoice date.',
      'Late Fee: 1.5% monthly on overdue amounts.',
      'Discrepancies: Notify in writing within 7 days.',
      'Returns/Refunds: Not accepted unless otherwise agreed.'
    ], 20, finalY + 50);

    doc.text([
      'Bank of America',
      'Account Name: AgriGuide Solutions, Inc.',
      'Account No: 99999999',
      'Routing No: 303030000'
    ], 20, finalY + 80);

    doc.setFont('helvetica', 'bold');
    doc.text('Jane Smith', 140, finalY + 80);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Founder & CEO', 140, finalY + 85);
    doc.text('For AgriGuide Solutions Inc.', 140, finalY + 90);

    doc.setFontSize(8);
    doc.text([
      'https://www.agriguide.com',
      'Phone +1-240-229-2234 | accounts@agriguide.com'
    ], 105, 280, 'center');

    doc.save(`Invoice-${order.id}.pdf`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-md ${activeTab === 'products'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-200 text-gray-700'
            }`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-md ${activeTab === 'orders'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-200 text-gray-700'
            }`}
        >
          Orders
        </button>
      </div>

      {activeTab === 'products' && (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <ProductForm onSubmit={handleAddProduct} />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Product List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={product.image}
                              alt={product.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
              <p className="text-gray-600">There are no orders to display.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Order #{order.id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Placed on {formatDate(order.date)}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Delivered'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-primary-100 text-primary-800'
                      }`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">Buyer Details</h4>
                      <div className="space-y-2">
                        <p><span className="font-medium">Name:</span> {order.deliveryDetails?.fullName}</p>
                        <p><span className="font-medium">Email:</span> {order.deliveryDetails?.email}</p>
                        <p><span className="font-medium">Phone:</span> {order.deliveryDetails?.phone}</p>
                        <p><span className="font-medium">Address:</span> {order.deliveryDetails?.address}</p>
                        <p><span className="font-medium">City:</span> {order.deliveryDetails?.city}</p>
                        <p><span className="font-medium">State:</span> {order.deliveryDetails?.state}</p>
                        <p><span className="font-medium">Pincode:</span> {order.deliveryDetails?.pincode}</p>
                        {order.deliveryDetails?.gstin && (
                          <p><span className="font-medium">GSTIN:</span> {order.deliveryDetails.gstin}</p>
                        )}
                        {order.deliveryDetails?.pan && (
                          <p><span className="font-medium">PAN:</span> {order.deliveryDetails.pan}</p>
                        )}
                        {order.deliveryDetails?.notes && (
                          <p><span className="font-medium">Notes:</span> {order.deliveryDetails.notes}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
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
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-600">Total Amount</p>
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
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;