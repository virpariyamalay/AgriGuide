import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProductForm from './ProductForm';

const ProductManagement = ({
    products,
    showAddProduct,
    setShowAddProduct,
    addLoading,
    editingProduct,
    setEditingProduct,
    editLoading,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct
}) => (
    <>
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
            {editingProduct && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8 bg-white rounded-xl shadow p-6"
                >
                    <ProductForm
                        onSubmit={data => handleEditProduct(editingProduct._id, data)}
                        initialData={editingProduct}
                        loading={editLoading}
                    />
                    <button
                        className="mt-4 btn btn-outline"
                        onClick={() => setEditingProduct(null)}
                    >Cancel</button>
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
                            <div className="flex justify-between items-end mt-auto gap-2">
                                <span className="font-bold text-gray-800 text-lg">₹{typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}</span>
                                <button
                                    onClick={() => setEditingProduct(product)}
                                    className="flex items-center justify-center bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5h2M12 7v10m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Edit
                                </button>
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
    </>
);

export default ProductManagement; 