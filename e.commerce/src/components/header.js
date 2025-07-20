   import React from 'react';
   import { useApp } from '../context/AppContext';
   import { Search, ShoppingCart, User, Heart, Menu } from 'lucide-react';

   const Header = () => {
     const { cart, user, setCurrentView, setShowAuthModal, searchTerm, setSearchTerm } = useApp();
     const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

     return (
       <header className="bg-white shadow-lg sticky top-0 z-50">
         {/* Header content here... */}
       </header>
     );
   };

   export default Header;
   