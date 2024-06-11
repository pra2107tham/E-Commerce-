import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductAPI from '../../../productAPI/ProductAPI'
import ProductList from '../../../utils/productList/ProductList'
import "./Product.css"
import { Link } from 'react-router-dom'

const Product = () => {
    const state = useContext(GlobalState)
    const [products] = state.productAPI.products

    console.log(state)
  return (
    <div className='product-list-container'>
      {
        products.map((product) => {
          return (
            <Link to={`/detail/${product._id}`} key={product.id} >
            <ProductList key={product.id} product={product} />
            </Link>
        )
        })
      }
    </div>
  )
}

export default Product