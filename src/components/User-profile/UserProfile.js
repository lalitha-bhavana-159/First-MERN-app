import React,{useContext} from 'react'
import './UserProfile.css'
import { loginContext } from '../../contexts/loginContext'
import { NavLink, Outlet } from "react-router-dom";

function UserProfile() {

  let [user]=useContext(loginContext)

  const activeLink={
    color: "#992817",
    fontSize:"1.2 rem",
    fontWeight:"bold"
  };

  const inactiveLink={
    color: "black",
    fontSize:"1.2 rem"
  };

  return (
    <div>
      <p className="display-5 text-end">Welcome, {user.username}!</p>
      <p className="lead text-end"><small>{user.email}</small></p>
      <img src={user.image} width="75px" className='float-end' alt="" />
      <ul className="nav justify-content-between">
      <li className="nav-item">
        <NavLink className="nav-link" style={({isActive})=>{
          return isActive?activeLink:inactiveLink
          }} to="products">Products</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" style={({isActive})=>{
          return isActive?activeLink:inactiveLink
        }} to="cart">Cart</NavLink>
      </li>
      </ul>
      <Outlet/>
    </div>
  )
}

export default UserProfile