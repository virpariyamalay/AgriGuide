import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Fetch products from backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product via backend
  const addProduct = async (product) => {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    formData.append('unit', product.unit || '');
    if (product.imageFile) {
      formData.append('image', product.imageFile);
    }
    try {
      const res = await fetch('/api/products/add', {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          Authorization: user?.token ? `Bearer ${user.token}` : '',
        },
      });
      if (!res.ok) throw new Error('Failed to add product');
      const data = await res.json();
      setProducts(prev => [data.product, ...prev]);
      return data.product;
    } catch (error) {
      throw error;
    }
  };

  // Delete product via backend
  const deleteProduct = async (productId) => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          Authorization: user?.token ? `Bearer ${user.token}` : '',
        },
      });
      if (!res.ok) throw new Error('Failed to delete product');
      setProducts(prev => prev.filter(p => p._id !== productId));
    } catch (error) {
      throw error;
    }
  };

  const value = {
    products,
    loading,
    fetchProducts,
    addProduct,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;