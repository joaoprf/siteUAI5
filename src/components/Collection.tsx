import React, { useState } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

const products: Product[] = [
  {
    id: 1,
    name: 'Valkyrie\'s Pendant',
    description: 'A stunning pendant featuring intricate Norse designs in 18k gold.',
    price: '$1,299',
    image: 'https://images.pexels.com/photos/10984828/pexels-photo-10984828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    category: 'necklaces'
  },
  {
    id: 2,
    name: 'Odin\'s Whisper Earrings',
    description: 'Elegant drop earrings with sapphire accents and delicate gold chains.',
    price: '$899',
    image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    category: 'earrings'
  },
  {
    id: 3,
    name: 'Shield Maiden Ring',
    description: 'A bold statement ring featuring a shield design with diamond accents.',
    price: '$1,499',
    image: 'https://images.pexels.com/photos/10513822/pexels-photo-10513822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    category: 'rings'
  },
  {
    id: 4,
    name: 'Freya\'s Tear Bracelet',
    description: 'A delicate gold bracelet with a teardrop amethyst centerpiece.',
    price: '$1,199',
    image: 'https://images.pexels.com/photos/10971915/pexels-photo-10971915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    category: 'bracelets'
  },
  {
    id: 5,
    name: 'Raven\'s Flight Necklace',
    description: 'A dramatic collar necklace with obsidian and gold raven motifs.',
    price: '$2,299',
    image: 'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    category: 'necklaces'
  },
  {
    id: 6,
    name: 'Saga Stackable Rings',
    description: 'A set of three stackable rings with rune engravings and small gemstones.',
    price: '$999',
    image: 'https://images.pexels.com/photos/9428604/pexels-photo-9428604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    category: 'rings'
  },
];

const categories = [
  'all',
  ...Array.from(new Set(products.map(product => product.category)))
];

const Collection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section id="collection" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-purple-900 mb-4">
            Our Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each piece is meticulously crafted to honor the spirit of the Valkyries - 
            mythological female figures who choose those worthy of glory.
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category
                    ? 'bg-purple-900 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;