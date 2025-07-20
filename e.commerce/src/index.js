
Toggle Sidebar

BLACKBOXAI

New




   import React from 'react';
   import ReactDOM from 'react-dom/client';
   import ECommerceApp from './App';
   import './styles/styles.css';
   const root = ReactDOM.createRoot(document.getElementById('root'));
   root.render(
     <React.StrictMode>
       <ECommerceApp />
     </React.StrictMode>
   );
   

import React, { useState, useEffect, createContext, useContext, useReducer } from 'react';
import { Search, ShoppingCart, User, Heart, Star, Plus, Minus, X, Check, Menu, Filter, ArrowLeft, CreditCard, Truck, Shield, Eye, EyeOff } from 'lucide-react';

// Context for global state management
const AppContext = createContext();

// Reducer for cart management
const cartReducer = (state, action) => {
switch (action.type) {
case 'ADD_TO_CART':
const existingItem = state.find(item => item.id === action.payload.id);
if (existingItem) {
return state.map(item =>
item.id === action.payload.id
? { ...item, quantity: item.quantity + 1 }
: item
);
}
return [...state, { ...action.payload, quantity: 1 }];

case 'REMOVE_FROM_CART':
  return state.filter(item => item.id !== action.payload);

case 'UPDATE_QUANTITY':
  return state.map(item =>
    item.id === action.payload.id
      ? { ...item, quantity: action.payload.quantity }
      : item
  );

case 'CLEAR_CART':
  return [];

default:
  return state;
}
};

// Sample products data
const sampleProducts = [
{
id: 1,
title: "Premium Wireless Headphones",
price: 299.99,
image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
category: "electronics",
rating: 4.5,
description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
inStock: true
},
{
id: 2,
title: "Smart Watch Series X",
price: 399.99,
image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
category: "electronics",
rating: 4.8,
description: "Advanced smartwatch with health monitoring and fitness tracking features.",
inStock: true
},
{
id: 3,
title: "Designer Sunglasses",
price: 149.99,
image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
category: "fashion",
rating: 4.3,
description: "Stylish designer sunglasses with UV protection and premium frame.",
inStock: true
},
{
id: 4,
title: "Professional Camera",
price: 1299.99,
image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
category: "electronics",
rating: 4.9,
description: "Professional DSLR camera with high-resolution sensor and advanced features.",
inStock: true
},
{
id: 5,
title: "Luxury Handbag",
price: 249.99,
image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
category: "fashion",
rating: 4.6,
description: "Elegant luxury handbag crafted from premium leather with modern design.",
inStock: true
},
{
id: 6,
title: "Gaming Mechanical Keyboard",
price: 179.99,
image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
category: "electronics",
rating: 4.7,
description: "RGB mechanical gaming keyboard with customizable switches and lighting.",
inStock: true
},
{
id: 7,
title: "Minimalist Desk Lamp",
price: 89.99,
image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
category: "home",
rating: 4.4,
description: "Modern minimalist desk lamp with adjustable brightness and USB charging.",
inStock: true
},
{
id: 8,
title: "Organic Cotton T-Shirt",
price: 29.99,
image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
category: "fashion",
rating: 4.2,
description: "Comfortable organic cotton t-shirt with sustainable materials and modern fit.",
inStock: true
}
];

// Context Provider Component
const AppProvider = ({ children }) => {
const [cart, dispatch] = useReducer(cartReducer, []);
const [user, setUser] = useState(null);
const [orders, setOrders] = useState([]);
const [wishlist, setWishlist] = useState([]);
const [currentView, setCurrentView] = useState('products');
const [selectedProduct, setSelectedProduct] = useState(null);
const [searchTerm, setSearchTerm] = useState('');
const [selectedCategory, setSelectedCategory] = useState('all');
const [showAuthModal, setShowAuthModal] = useState(false);
const [authMode, setAuthMode] = useState('login');

const addToCart = (product) => {
dispatch({ type: 'ADD_TO_CART', payload: product });
};

const removeFromCart = (productId) => {
dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
};

const updateQuantity = (productId, quantity) => {
if (quantity === 0) {
removeFromCart(productId);
} else {
dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
}
};

const clearCart = () => {
dispatch({ type: 'CLEAR_CART' });
};

const toggleWishlist = (product) => {
setWishlist(prev => {
const exists = prev.find(item => item.id === product.id);
if (exists) {
return prev.filter(item => item.id !== product.id);
} else {
return [...prev, product];
}
});
};

const isInWishlist = (productId) => {
return wishlist.some(item => item.id === productId);
};

const value = {
cart,
user,
setUser,
orders,
setOrders,
wishlist,
currentView,
setCurrentView,
selectedProduct,
setSelectedProduct,
searchTerm,
setSearchTerm,
selectedCategory,
setSelectedCategory,
showAuthModal,
setShowAuthModal,
authMode,
setAuthMode,
addToCart,
removeFromCart,
updateQuantity,
clearCart,
toggleWishlist,
isInWishlist
};

return (
<AppContext.Provider value={value}>
{children}
</AppContext.Provider>
);
};

// Custom hook to use context
const useApp = () => {
const context = useContext(AppContext);
if (!context) {
throw new Error('useApp must be used within AppProvider');
}
return context;
};

// Header Component
const Header = () => {
const { cart, user, setCurrentView, setShowAuthModal, searchTerm, setSearchTerm } = useApp();
const [showMobileMenu, setShowMobileMenu] = useState(false);

const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

return (
<header className="bg-white shadow-lg sticky top-0 z-50">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex justify-between items-center h-16">
{/* Logo */}
<div className="flex items-center cursor-pointer" onClick={() => setCurrentView('products')}>
<div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
ShopHub
</div>
</div>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-lg mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center space-x-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={() => setCurrentView('wishlist')}
            className="p-2 text-gray-600 hover:text-red-500 transition-colors"
          >
            <Heart className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => setCurrentView('cart')}
            className="relative p-2 text-gray-600 hover:text-blue-500 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemsCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Hello, {user.name}</span>
              <button 
                onClick={() => setCurrentView('orders')}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Orders
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowAuthModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gray-600"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {showMobileMenu && (
      <div className="md:hidden py-4 border-t">
        <div className="flex flex-col space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentView('wishlist')}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span>Wishlist</span>
            </button>
            
            <button 
              onClick={() => setCurrentView('cart')}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart ({cartItemsCount})</span>
            </button>
          </div>

          {user ? (
            <div className="flex flex-col space-y-2">
              <span className="text-gray-700">Hello, {user.name}</span>
              <button 
                onClick={() => setCurrentView('orders')}
                className="text-blue-600 hover:text-blue-800 transition-colors text-left"
              >
                View Orders
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowAuthModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 justify-center"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    )}
  </div>
</header>
);
};

// Product Card Component
const ProductCard = ({ product }) => {
const { addToCart, setSelectedProduct, setCurrentView, toggleWishlist, isInWishlist } = useApp();

const handleAddToCart = (e) => {
e.stopPropagation();
addToCart(product);
};

const handleWishlistToggle = (e) => {
e.stopPropagation();
toggleWishlist(product);
};

const handleViewDetails = () => {
setSelectedProduct(product);
setCurrentView('product-detail');
};

return (
<div 
   className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:scale-105"
   onClick={handleViewDetails}
 >
<div className="relative">
<img 
       src={product.image} 
       alt={product.title}
       className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
     />
<button
onClick={handleWishlistToggle}
className={absolute top-2 right-2 p-2 rounded-full shadow-lg transition-all duration-200 ${             isInWishlist(product.id)                ? 'bg-red-500 text-white'                : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'           }}
>
<Heart className="w-5 h-5" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
</button>

    {!product.inStock && (
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <span className="text-white font-semibold">Out of Stock</span>
      </div>
    )}
  </div>

  <div className="p-4">
    <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-1">{product.title}</h3>
    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
    
    <div className="flex items-center mb-3">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
    </div>

    <div className="flex items-center justify-between">
      <span className="text-2xl font-bold text-blue-600">${product.price}</span>
      <button 
        onClick={handleAddToCart}
        disabled={!product.inStock}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          product.inStock 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Add to Cart
      </button>
    </div>
  </div>
</div>
);
};

// Product Detail Component
const ProductDetail = () => {
const { selectedProduct, setCurrentView, addToCart, toggleWishlist, isInWishlist } = useApp();
const [selectedQuantity, setSelectedQuantity] = useState(1);

if (!selectedProduct) return null;

const handleAddToCart = () => {
for (let i = 0; i < selectedQuantity; i++) {
addToCart(selectedProduct);
}
};

return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
<button
onClick={() => setCurrentView('products')}
className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
>
<ArrowLeft className="w-5 h-5 mr-2" />
Back to Products
</button>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Product Image */}
    <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
      <img 
        src={selectedProduct.image} 
        alt={selectedProduct.title}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Product Info */}
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.title}</h1>
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-gray-600 ml-2">({selectedProduct.rating})</span>
        </div>
      </div>

      <div className="text-3xl font-bold text-blue-600">${selectedProduct.price}</div>

      <p className="text-gray-700 leading-relaxed">{selectedProduct.description}</p>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Quantity:</label>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button 
              onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 border-x border-gray-300">{selectedQuantity}</span>
            <button 
              onClick={() => setSelectedQuantity(selectedQuantity + 1)}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex space-x-4">
          <button 
            onClick={handleAddToCart}
            disabled={!selectedProduct.inStock}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
              selectedProduct.inStock 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Add to Cart
          </button>
          
          <button 
            onClick={() => toggleWishlist(selectedProduct)}
            className={`p-3 rounded-lg transition-colors ${
              isInWishlist(selectedProduct.id) 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart className="w-6 h-6" fill={isInWishlist(selectedProduct.id) ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold text-lg mb-4">Product Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Truck className="w-5 h-5 text-green-600" />
            <span className="text-sm">Free Shipping</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-sm">2 Year Warranty</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-sm">In Stock</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
);
};

// Products List Component
const ProductsList = () => {
const { searchTerm, selectedCategory, setSelectedCategory } = useApp();
const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
const [showFilters, setShowFilters] = useState(false);

const categories = ['all', 'electronics', 'fashion', 'home'];

useEffect(() => {
let filtered = sampleProducts;

if (selectedCategory !== 'all') {
  filtered = filtered.filter(product => product.category === selectedCategory);
}

if (searchTerm) {
  filtered = filtered.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

setFilteredProducts(filtered);
}, [searchTerm, selectedCategory]);

return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
{/* Filters */}
<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
<h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Products</h2>

    <div className="flex items-center space-x-4">
      <button 
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg"
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
      </button>
      
      <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Products Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {filteredProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>

  {filteredProducts.length === 0 && (
    <div className="text-center py-12">
      <div className="text-gray-500 text-lg">No products found matching your criteria.</div>
    </div>
  )}
</div>
);
};

// Cart Component
const Cart = () => {
const { cart, updateQuantity, removeFromCart, setCurrentView } = useApp();

const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

if (cart.length === 0) {
return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
<div className="text-center py-12">
<ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
<h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
<p className="text-gray-600 mb-6">Add some products to get started!</p>
<button
onClick={() => setCurrentView('products')}
className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
>
Continue Shopping
</button>
</div>
</div>
);
}

return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
<h2 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h2>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Cart Items */}
    <div className="lg:col-span-2 space-y-4">
      {cart.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-20 h-20 object-cover rounded-lg"
          />
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
            <p className="text-gray-600">${item.price}</p>
            
            <div className="flex items-center space-x-2 mt-2">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 bg-gray-100 rounded">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="text-right">
            <div className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</div>
            <button 
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 mt-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Order Summary */}
    <div className="bg-white rounded-lg shadow-md p-6 h-fit">
      <h3 className="font-semibold text-lg text-gray-900 mb-4">Order Summary</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>${(total * 0.08).toFixed(2)}</span>
        </div>
        <div className="border-t pt-2">
          <div className="flex justify-between font-semibold text-lg text-gray-900">
            <span>Total</span>
            <span>${(total * 1.08).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setCurrentView('checkout')}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Proceed to Checkout
      </button>
    </div>
  </div>
</div>
);
};

// Wishlist Component
const Wishlist = () => {
const { wishlist, setCurrentView, addToCart, toggleWishlist } = useApp();

if (wishlist.length === 0) {
return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
<div className="text-center py-12">
<Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
<h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
<p className="text-gray-600 mb-6">Save items you love for later!</p>
<button
onClick={() => setCurrentView('products')}
className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
>
Continue Shopping
</button>
</div>
</div>
);
}

return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
<h2 className="text-2xl font-bold text-gray-900 mb-8">My Wishlist</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {wishlist.map((product) => (
      <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          <button 
            onClick={() => toggleWishlist(product)}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{product.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">${product.price}</span>
            <button 
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
);
};

// Checkout Component
const Checkout = () => {
const { cart, clearCart, setCurrentView, user, setOrders } = useApp();
const [formData, setFormData] = useState({
firstName: '',
lastName: '',
email: '',
phone: '',
address: '',
city: '',
state: '',
zipCode: '',
cardNumber: '',
expiryDate: '',
cvv: '',
nameOnCard: ''
});
const [isProcessing, setIsProcessing] = useState(false);
const [orderComplete, setOrderComplete] = useState(false);

const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
const tax = total * 0.08;
const finalTotal = total + tax;

const handleInputChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};

const handleSubmit = async (e) => {
e.preventDefault();
setIsProcessing(true);

// Simulate payment processing
await new Promise(resolve => setTimeout(resolve, 2000));

// Create order
const order = {
  id: Date.now(),
  items: cart,
  total: finalTotal,
  date: new Date().toISOString(),
  status: 'confirmed',
  shippingAddress: {
    firstName: formData.firstName,
    lastName: formData.lastName,
    address: formData.address,
    city: formData.city,
    state: formData.state,
    zipCode: formData.zipCode
  }
};

setOrders(prev => [...prev, order]);
clearCart();
setIsProcessing(false);
setOrderComplete(true);
};

if (orderComplete) {
return (
<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
<div className="bg-white rounded-lg shadow-lg p-8 text-center">
<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
<Check className="w-8 h-8 text-green-600" />
</div>
<h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
<p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been successfully placed.</p>
<div className="space-y-4">
<button
onClick={() => setCurrentView('orders')}
className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
>
View Order History
</button>
<button
onClick={() => setCurrentView('products')}
className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
>
Continue Shopping
</button>
</div>
</div>
</div>
);
}

return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
<h2 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h2>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Checkout Form */}
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="nameOnCard"
              placeholder="Name on Card"
              value={formData.nameOnCard}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5 mr-2" />
              Place Order
            </>
          )}
        </button>
      </form>
    </div>

    {/* Order Summary */}
    <div className="bg-white rounded-lg shadow-md p-6 h-fit">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
      
      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center space-x-4">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.title}</h4>
              <p className="text-gray-600">Qty: {item.quantity}</p>
            </div>
            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2">
          <div className="flex justify-between font-semibold text-lg text-gray-900">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
);
};

// Orders Component
const Orders = () => {
const { orders, setCurrentView } = useApp();

if (orders.length === 0) {
return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
<div className="text-center py-12">
<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
<CreditCard className="w-8 h-8 text-gray-400" />
</div>
<h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
<p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
<button
onClick={() => setCurrentView('products')}
className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
>
Start Shopping
</button>
</div>
</div>
);
}

return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
<h2 className="text-2xl font-bold text-gray-900 mb-8">Order History</h2>

  <div className="space-y-6">
    {orders.map((order) => (
      <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
            <p className="text-gray-600">
              Placed on {new Date(order.date).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {order.status}
            </span>
            <p className="text-lg font-semibold text-gray-900 mt-1">
              ${order.total.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Items */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Items</h4>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
            <div className="text-sm text-gray-600">
              <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
);
};

// Authentication Modal Component
const AuthModal = () => {
const { showAuthModal, setShowAuthModal, authMode, setAuthMode, setUser } = useApp();
const [formData, setFormData] = useState({
name: '',
email: '',
password: '',
confirmPassword: ''
});
const [showPassword, setShowPassword] = useState(false);

const handleInputChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};

const handleSubmit = (e) => {
e.preventDefault();

if (authMode === 'register' && formData.password !== formData.confirmPassword) {
  alert('Passwords do not match');
  return;
}

// Simulate authentication
const user = {
  id: Date.now(),
  name: formData.name || formData.email.split('@')[0],
  email: formData.email
};

setUser(user);
setShowAuthModal(false);
setFormData({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});
};

if (!showAuthModal) return null;

return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
<div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
<div className="flex justify-between items-center mb-6">
<h2 className="text-2xl font-bold text-gray-900">
{authMode === 'login' ? 'Sign In' : 'Create Account'}
</h2>
<button
onClick={() => setShowAuthModal(false)}
className="text-gray-400 hover:text-gray-600"
>
<X className="w-6 h-6" />
</button>
</div>

    <form onSubmit={handleSubmit} className="space-y-4">
      {authMode === 'register' && (
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}
      
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleInputChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {authMode === 'register' && (
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        {authMode === 'login' ? 'Sign In' : 'Create Account'}
      </button>
    </form>

    <div className="mt-6 text-center">
      <p className="text-gray-600">
        {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
        <button
          onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
          className="text-blue-600 hover:text-blue-800 ml-2 font-medium"
        >
          {authMode === 'login' ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    </div>
  </div>
</div>
);
};

// Main App Component
const App = () => {
const { currentView, showAuthModal } = useApp();

const renderCurrentView = () => {
switch (currentView) {
case 'products':
return <ProductsList />;
case 'product-detail':
return <ProductDetail />;
case 'cart':
return <Cart />;
case 'wishlist':
return <Wishlist />;
case 'checkout':
return <Checkout />;
case 'orders':
return <Orders />;
default:
return <ProductsList />;
}
};

return (
<div className="min-h-screen bg-gray-50">
<Header />
<main>
{renderCurrentView()}
</main>
{showAuthModal && <AuthModal />}
</div>
);
};

// Root Component with Provider
const ECommerceApp = () => {
return (
<AppProvider>
<App />
</AppProvider>
);
};

export default ECommerceApp;
please make it's file strucutre and then give it's code to me please make soon

Copy message
Edit message
BLACKBOXAI

File Structure for E-Commerce Application

Here is a suggested file structure for your React e-commerce application:


Run
Copy code
ecommerce-app/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── AuthModal.js
│   │   ├── Cart.js
│   │   ├── Checkout.js
│   │   ├── Header.js
│   │   ├── Orders.js
│   │   ├── ProductCard.js
│   │   ├── ProductDetail.js
│   │   ├── ProductsList.js
│   │   ├── Wishlist.js
│   │   └── AppProvider.js
│   │
│   ├── context/
│   │   └── AppContext.js
│   │
│   ├── styles/
│   │   └── styles.css
│   │
│   ├── App.js
│   ├── index.js
│   └── sampleProducts.js
│
├── package.json
└── README.md
Code for Each File

index.js

javascript
11 lines
Click to close
import React from 'react';
import ReactDOM from 'react-dom/client';
...
App.js

javascript
45 lines
Click to expand
import React from 'react';
import { AppProvider } from './context/AppContext';
...
context/AppContext.js

javascript
56 lines
Click to expand
import React, { createContext, useContext, useReducer, useState } from 'react';
...
components/Header.js

javascript
16 lines
Click to expand
import React from 'react';
import { useApp } from '../context/AppContext';
...
components/AuthModal.js

javascript
36 lines
Click to expand
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
...
components/ProductsList.js

javascript
21 lines
Click to expand
import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
...
components/ProductCard.js

javascript
15 lines
Click to expand
import React from 'react';
import { useApp } from '../context/AppContext';
...
components/Cart.js

javascript
15 lines
Click to expand
import React from 'react';
import { useApp } from '../context/AppContext';
...
components/Wishlist.js

javascript
15 lines
Click to expand
import React from 'react';
import { useApp } from '../context/AppContext';
...
components/Checkout.js

javascript
43 lines
Click to expand
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
...
components/Orders.js

javascript
15 lines
Click to expand
import React from 'react';
import { useApp } from '../context/AppContext';
...
sampleProducts.js

javascript
15 lines
Click to expand
const sampleProducts = [
{
...
styles/styles.css

css
7 lines
Click to expand
/* Add your custom styles here */
body {
...
This structure and code should help you set up your e-commerce application effectively. You can expand on each component as needed.


Copy message
Export
Scroll to bottom


Web

Research

Upload
Follow us on


By using Blackbox you agree to the Terms and Privacy.

