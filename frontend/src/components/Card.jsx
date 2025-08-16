import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ product }) {
  const navigate = useNavigate();
  // console.log("CARD PRODUCT ➤", product);

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="w-75 bg-[black] border border-white rounded-2xl shadow-md hover:shadow-white/40 transform hover:scale-105 transition-transform duration-300 overflow-hidden mb-6 ml-2"
    >
      <img
        className="w-100 h-90 object-cover rounded-t-2xl"
        src={product.imageUrl}
        alt={product.title}
      />
      <div className="p-4 text-white">
        <h1 className="text-lg font-semibold truncate hover:text-[#EEC591] transition-colors duration-200">
          {product.brand}
        </h1>
        <p className="text-sm text-white/70 mt-1 leading-snug">
          {product.title}
        </p>
        <p className="text-lg font-bold text-[#EEC591] mt-2 leading-snug">
          ₹{product.price}
        </p>
      </div>
    </div>
  );
}

export default Card;
