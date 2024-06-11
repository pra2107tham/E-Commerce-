import React from 'react';
import './ProductList.css';

const ProductList = ({ product }) => {
  return (
    <div className="product-card">
      <img src="https://via.placeholder.com/300x200" alt={product.title} className="product-image" />
      <div className="product-details">
        <h2 className="product-title">{product.title}</h2>
        <span className="product-price">${product.price}</span>
        <p className="product-description">{product.description}</p>
        <div className="button-group">
          <button className="view-button">View</button>
          <button className="buy-button">Buy</button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;