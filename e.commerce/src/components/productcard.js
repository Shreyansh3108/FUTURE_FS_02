   import React from 'react';
   import { useApp } from '../context/AppContext';
   import { Heart } from 'lucide-react';

   const ProductCard = ({ product }) => {
     const { addToCart, setSelectedProduct, setCurrentView, toggleWishlist, isInWishlist } = useApp();

     return (
       <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:scale-105">
         {/* Product card content here... */}
       </div>
     );
   };

   export default ProductCard;
   