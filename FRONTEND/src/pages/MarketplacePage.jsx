import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useProducts } from '../contexts/ProductContext'
import { useCart } from '../contexts/CartContext'
import { toast } from 'react-toastify'
import { Link, useLocation } from 'react-router-dom';
import MarketplaceSidebar from '../components/marketplace/MarketplaceSidebar';
import MarketplaceFilters from '../components/marketplace/MarketplaceFilters';
import MarketplaceProductGrid from '../components/marketplace/MarketplaceProductGrid';

const MarketplacePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const { products, fetchProducts } = useProducts()
  const { addToCart, cartItems } = useCart()
  const [loading, setLoading] = useState(true)
  const [quantities, setQuantities] = useState({})
  const location = useLocation();

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'seeds', name: 'Seeds' },
    { id: 'fertilizers', name: 'Fertilizers' },
    { id: 'tools', name: 'Tools & Equipment' },
    { id: 'soils', name: 'Soils & Substrates' },
  ]

  // Reset priceRange filter when products change to include all product prices
  useEffect(() => {
    if (products.length > 0) {
      const maxPrice = Math.max(...products.map(p => p.price));
      setPriceRange([0, maxPrice]);
    }
  }, [products]);

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      filterProducts()
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [selectedCategory, searchQuery, priceRange, products])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Refresh products when navigating to this page (e.g., after order)
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [location.pathname]);

  const filterProducts = () => {
    let result = [...products]

    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory)
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      )
    }

    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    setFilteredProducts(result)
  }

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="animate-pulse bg-gray-200 h-8 w-48 rounded"></div>
          <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-24"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-10 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4 space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">AgriGuide Marketplace</h1>
        <p className="text-lg text-gray-600">
          Shop for all your farming needs - from quality seeds and fertilizers to essential tools and equipment.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <MarketplaceSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <MarketplaceFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            products={products}
          />
        </div>
        <div className="lg:w-3/4">
          <MarketplaceProductGrid
            products={filteredProducts}
            addToCart={addToCart}
            cartItems={cartItems}
            quantities={quantities}
            setQuantities={setQuantities}
          />
        </div>
      </div>
    </div>
  )
}

export default MarketplacePage