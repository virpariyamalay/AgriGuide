import { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/productData';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: `prod-${Date.now()}`,
      isOnSale: false,
      image: product.image || 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800'
    };
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts, newProduct];
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      return updatedProducts;
    });
    return newProduct;
  };

  const updateProduct = (productId, updatedData) => {
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.map(product =>
        product.id === productId ? { ...product, ...updatedData } : product
      );
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  const deleteProduct = (productId) => {
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.filter(product => product.id !== productId);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;