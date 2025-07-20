   import React, { useEffect, useState } from 'react';
   import { useApp } from '../context/AppContext';
   import ProductCard from './ProductCard';
   import sampleProducts from '../sampleProducts';

   const ProductsList = () => {
     const { searchTerm, selectedCategory, setSelectedCategory } = useApp();
     const [filteredProducts, setFilteredProducts] = useState(sampleProducts);

     useEffect(() => {
       // Filtering logic here...
     }, [searchTerm, selectedCategory]);

     return (
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         {/* Products grid here... */}
       </div>
     );
   };

   export default ProductsList;
   