import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../contexts/ProductContext';
import ProductForm from '../../components/admin/ProductForm';
import { toast } from 'react-toastify';
import { format, isValid } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrders } from '../../contexts/OrderContext';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminTabs from '../../components/admin/AdminTabs';
import AdminStats from '../../components/admin/AdminStats';
import ProductManagement from '../../components/admin/ProductManagement';
import OrderManagement from '../../components/admin/OrderManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const { logout } = useAuth();
  const { products, addProduct, deleteProduct, updateProduct, fetchProducts } = useProducts();
  const { orders, loading: ordersLoading, fetchOrders, updateOrderStatus, deleteOrder } = useOrders();
  const navigate = useNavigate();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleAddProduct = async (data) => {
    setAddLoading(true);
    try {
      await addProduct(data);
      toast.success('Product added successfully!');
      setShowAddProduct(false);
    } catch (error) {
      toast.error('Failed to add product');
      console.error('Error adding product:', error);
    } finally {
      setAddLoading(false);
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

  const handleEditProduct = async (productId, data) => {
    setEditLoading(true);
    try {
      await updateProduct(productId, data);
      toast.success('Product updated successfully!');
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      toast.error('Failed to update product');
      console.error('Error updating product:', error);
    } finally {
      setEditLoading(false);
    }
  };

  // Product stats
  const productCount = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);

  // Fetch orders when Orders tab is selected
  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
    // eslint-disable-next-line
  }, [activeTab]);

  const handleMarkDelivered = async (orderId) => {
    try {
      await updateOrderStatus(orderId, 'delivered');
      toast.success('Order marked as delivered!');
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      toast.success('Order deleted!');
    } catch (error) {
      toast.error('Failed to delete order');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 md:py-8">
      {/* Sticky Header */}
      <AdminHeader onLogout={handleLogout} />

      {/* Tab Navigation */}
      <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Stats */}
      {activeTab === 'products' && (
        <AdminStats productCount={productCount} totalStock={totalStock} />
      )}

      {/* Tab Content */}
      <div>
        {/* Products Tab */}
        <AnimatePresence>
          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ProductManagement
                products={products}
                showAddProduct={showAddProduct}
                setShowAddProduct={setShowAddProduct}
                addLoading={addLoading}
                editingProduct={editingProduct}
                setEditingProduct={setEditingProduct}
                editLoading={editLoading}
                handleAddProduct={handleAddProduct}
                handleEditProduct={handleEditProduct}
                handleDeleteProduct={handleDeleteProduct}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Orders Tab */}
        <AnimatePresence>
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <OrderManagement
                orders={orders}
                ordersLoading={ordersLoading}
                handleMarkDelivered={handleMarkDelivered}
                handleDeleteOrder={handleDeleteOrder}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;