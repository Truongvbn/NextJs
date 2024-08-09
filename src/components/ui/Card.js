import React from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';

const Card = ({ title, description, image, price, rating, onAddToCart, onAddToFavorite }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image
          src={image || '/placeholder-image.jpg'}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-110"
        />
        <button 
          onClick={onAddToFavorite}
          className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Heart className="w-5 h-5 text-red-500" />
        </button>
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{description}</p>
        </div>
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${price}</span>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-gray-600 dark:text-gray-400">{rating}</span>
            </div>
          </div>
          <button 
            onClick={onAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;