import React, { useState } from 'react'
import "./Login.css"
import {Link} from "react-router-dom"
import axios from "axios"

const Register = () => {
  const [user, setUser] = useState({
    name : "",
    email : "",
    password : ""
  })  

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit =async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/users/register", {...user})
      alert(res.data.message)
      localStorage.setItem("firstRegister", true)
      window.location.href = "/"
    } catch (error) {
      alert(error.response.data.message)
    }


  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title">Register</h2>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text" 
            id="name" 
            name="name"
            value={user.name}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email" 
            id="email" 
            name="email"
            value={user.email}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password" 
            id="password" 
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-button">Register</button>
        
        <Link to="/login" className="register-link">
        <div className="register-link">Have an account? Login</div>
        </Link>
      </form>
    </div>
  )
}


export default Register