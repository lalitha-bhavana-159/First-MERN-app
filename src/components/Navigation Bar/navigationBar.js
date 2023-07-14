import React,{useContext} from 'react'
import './navigationBar.css'
import { NavLink } from "react-router-dom";
import { loginContext } from '../../contexts/loginContext';
function NavigationBar() {

  let [user,loginErr,userLoginStatus,loginUser,logoutUser]=useContext(loginContext)

  const activeLink={
    color: "#992817",
    fontSize:"1.2 rem",
    fontWeight:"bold"
  };
  const inactiveLink={
    color: "#0d0c0c",
    fontSize:"1.2 rem"
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light ">
      <div className="container-fluid">
        <a className="navbar-brand" href="#"><img width="50px" src="https://findicons.com/files/icons/1994/vista_style_business_and_data/256/users.png" alt="" /></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" style={({isActive})=>{
                return isActive?activeLink:inactiveLink
              }} to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register" style={({isActive})=>{
                return isActive?activeLink:inactiveLink
              }}>Register</NavLink>
            </li>
            {userLoginStatus?
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" style={({isActive})=>{
                  return isActive?activeLink:inactiveLink
                }} onClick={logoutUser} >Logout</NavLink>
              </li>:
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" style={({isActive})=>{
                  return isActive?activeLink:inactiveLink
                }}>Login</NavLink>
              </li>
            }
            <li className="nav-item">
              <NavLink className="nav-link" to="/about-us" style={({isActive})=>{
                return isActive?activeLink:inactiveLink
              }}>About Us</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar