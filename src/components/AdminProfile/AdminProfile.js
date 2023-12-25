import React,{useContext} from 'react'
import './AdminProfile.css'
import { loginContext } from '../../contexts/loginContext'
import { NavLink, Outlet } from "react-router-dom";

function AdminProfile() {
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
      <p className="display-5 text-end">Welcome, Admin!</p>
      <ul className="nav justify-content-between">
      <p className="display-5">Happy Monitoring!</p>
      </ul>
      <Outlet/>
    </div>
  )
}

export default AdminProfile