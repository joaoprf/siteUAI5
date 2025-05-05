import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
      <div className="relative h-80 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6 bg-white">
        <h3 className="text-xl font-serif font-bold text-purple-900 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-amber-600 font-medium text-lg">
            {product.price}
          </span>
          <button className="px-4 py-2 bg-purple-900 text-white rounded-full hover:bg-purple-800 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;