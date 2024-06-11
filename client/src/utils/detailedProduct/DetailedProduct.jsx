import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import { useState } from 'react'
import "./DetailedProduct.css"

const DetailedProduct = () => {

    const params = useParams()
    const state = useContext(GlobalState)
    const products = state.productAPI.products[0]
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() => {
        if(params){
            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }   
    },[params, products])

    console.log(detailProduct)
  return (
    <div className="detailed-product-container">
      <div className="product-image">
        <img src="https://via.placeholder.com/300x200" alt={detailProduct.name} /> {/* Assuming 'url' property exists */}
      </div>

      <div className="product-details">
        <h2 className="product-name">{detailProduct.name}</h2>
        <p className="product-description">{detailProduct.description}</p>
        <p className="product-price">${detailProduct.price}</p> 
        <Link to="/cart">
        <button className="add-to-cart-btn">Add to Cart</button>
        </Link>
      </div>
    </div>
  )
}

export default DetailedProduct