   import React, { createContext, useContext, useReducer, useState } from 'react';

   const AppContext = createContext();

   const cartReducer = (state, action) => {
     // Reducer logic here...
   };

   export const AppProvider = ({ children }) => {
     const [cart, dispatch] = useReducer(cartReducer, []);
     const [user, setUser ] = useState(null);
     const [orders, setOrders] = useState([]);
     const [wishlist, setWishlist] = useState([]);
     const [currentView, setCurrentView] = useState('products');
     const [selectedProduct, setSelectedProduct] = useState(null);
     const [searchTerm, setSearchTerm] = useState('');
     const [selectedCategory, setSelectedCategory] = useState('all');
     const [showAuthModal, setShowAuthModal] = useState(false);
     const [authMode, setAuthMode] = useState('login');

     const value = {
       cart,
       user,
       setUser ,
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
       // Add other functions here...
     };

     return (
       <AppContext.Provider value={value}>
         {children}
       </AppContext.Provider>
     );
   };

   export const useApp = () => {
     const context = useContext(AppContext);
     if (!context) {
       throw new Error('useApp must be used within AppProvider');
     }
     return context;
   };
   