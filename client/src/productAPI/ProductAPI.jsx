import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { json } from 'react-router-dom'
const ProductAPI = () => {
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/products/')
            // console.log(res.data.products)
            setProducts(res.data.products) // Set the state with the fetched data
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }
    useEffect(() => {
        getProducts()
    },[])
  return (
    {
        products : [products, setProducts]
    }
  )
}

export default ProductAPI