import React from 'react';
import { useNavigate } from 'react-router-dom';

function ClothingCardd({ product }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="bg-black border border-white rounded-2xl shadow-md 
                 hover:shadow-white/40 transform hover:scale-105 
                 transition-transform duration-300 overflow-hidden 
                 mb-6 cursor-pointer "
    >
      {/* Image */}
      <img
        className="w-full h-49 sm:h-56 md:h-64 object-fill rounded-t-2xl"
        src={product.imageUrl}
        alt={product.title}
      />

      {/* Text Section */}
      <div className="p-3 sm:p-4 text-white">
        <h1 className="text-base sm:text-lg font-semibold truncate 
                       hover:text-[#EEC591] transition-colors duration-200">
          {product.brand}
        </h1>

        <p className="text-xs sm:text-sm text-white/70 mt-1 leading-snug line-clamp-2">
          {product.title}
        </p>

        <p className="text-base sm:text-lg font-bold text-[#EEC591] mt-2 leading-snug">
          ₹{product.price}
        </p>
      </div>
    </div>
  );
}

export default ClothingCardd;
