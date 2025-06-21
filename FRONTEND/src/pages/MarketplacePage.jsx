import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useProducts } from '../contexts/ProductContext'
import { useCart } from '../contexts/CartContext'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';

const MarketplacePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const { products } = useProducts()
  const { addToCart } = useCart()
  const [loading, setLoading] = useState(true)

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
    toast.success(`Added ${product.name} to cart!`)
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
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === category.id
                      ? 'bg-primary-100 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="font-semibold text-lg mb-4">Filters</h3>
            <div className="mb-4">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search products..."
              />
            </div>

            <div>
              <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-lg mb-4">Customer Support</h3>
            <p className="text-gray-600 mb-4">
              Need help with choosing the right products for your farm? Our experts are here to help!
            </p>
            <Link to="/contact" className="btn btn-primary w-full text-center">
              Contact Support
            </Link>
          </div>
        </div>

        <div className="lg:w-3/4">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory).name}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({filteredProducts.length} products)
                </span>
              </h2>
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-sm text-gray-600">Sort by:</label>
                <select
                  id="sort"
                  className="border border-gray-300 rounded-lg text-sm py-1 px-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    {product.isOnSale && (
                      <div className="absolute top-2 right-2 bg-accent-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                        SALE
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        {product.oldPrice ? (
                          <div>
                            <span className="line-through text-gray-500 text-sm mr-2">${product.oldPrice.toFixed(2)}</span>
                            <span className="font-bold text-accent-600">${product.price.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="font-bold text-gray-800">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center justify-center btn-primary px-3 py-1.5 rounded-lg text-sm font-medium"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketplacePage