import React, { useContext } from 'react'
import { MdOutlineMenu } from "react-icons/md";
import { MdOutlineClose } from 'react-icons/md';
import { MdOutlineShoppingCart } from 'react-icons/md';
import {Link} from 'react-router-dom'
import "./Header.css"
import { GlobalState } from '../../GlobalState';

const Header = () => {

  const state = useContext(GlobalState)
  console.log(state)

  return (
    <header>
      <div className="menu">
        <MdOutlineMenu size={30}/>
      </div>
      <div className="logo">
        <h1>
          <Link to="/">MERN Ecommerce </Link>
        </h1>
      </div>
      <ul>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/login">Login or Register</Link></li>
        <li><MdOutlineClose size={30}  className='menu'/></li>
      </ul>
      <div className='cart-icon'>
        <Link to="/cart"><MdOutlineShoppingCart size={30}/></Link>
        <span>0</span>
      </div>
    </header>
  )
}

export default Header