import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../contexts/ProductContext';
import ProductForm from '../../components/admin/ProductForm';
import { toast } from 'react-toastify';
import { format, isValid } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const { logout } = useAuth();
  const { products, addProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

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

  // Product stats
  const productCount = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 md:py-8">
      {/* Sticky Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sticky top-0 z-10 bg-white/80 backdrop-blur-md py-3 rounded-b-xl shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="mt-3 sm:mt-0 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${activeTab === 'products' ? 'bg-primary-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-primary-100'}`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${activeTab === 'orders' ? 'bg-primary-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-primary-100'}`}
        >
          Orders
        </button>
      </div>

      {/* Stats */}
      {activeTab === 'products' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-4 shadow flex flex-col items-center">
            <span className="text-2xl font-bold text-green-700">{productCount}</span>
            <span className="text-xs text-gray-600">Total Products</span>
          </div>
          <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl p-4 shadow flex flex-col items-center">
            <span className="text-2xl font-bold text-blue-700">{totalStock}</span>
            <span className="text-xs text-gray-600">Total Stock</span>
          </div>
        </motion.div>
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
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold">Manage Products</h2>
                <button
                  onClick={() => setShowAddProduct((v) => !v)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg shadow hover:bg-primary-700 transition"
                >
                  {showAddProduct ? 'Close' : 'Add New Product'}
                </button>
              </div>
              <AnimatePresence>
                {showAddProduct && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8 bg-white rounded-xl shadow p-6"
                  >
                    <ProductForm onSubmit={handleAddProduct} loading={addLoading} />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                    <p className="text-gray-500">Add your first product to get started.</p>
                  </div>
                ) : (
                  products.map((product) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
                    >
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                            {product.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex items-center gap-3 mb-2">
                          {product.unit && product.unit.trim() && (
                            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">Unit: {product.unit}</span>
                          )}
                          {typeof product.stock === 'number' && product.stock > 0 && (
                            <span className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded text-xs">Stock: {product.stock}</span>
                          )}
                        </div>
                        <div className="flex justify-between items-end mt-auto">
                          <span className="font-bold text-gray-800 text-lg">${product.price.toFixed(2)}</span>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="flex items-center justify-center bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-200 transition"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Orders Tab (placeholder) */}
        <AnimatePresence>
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow p-8 text-center"
            >
              <h2 className="text-xl font-semibold mb-4">Orders Management</h2>
              <p className="text-gray-500">Order management features coming soon.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;