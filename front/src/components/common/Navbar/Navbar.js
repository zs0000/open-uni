import React from 'react';
import { Link, Outlet } from 'react-router-dom'

import s from "../../../styles/Navbar.module.css"



export default function Navbar({setAuth}) {
    

  

   
   
    const handleSignOut = (e) => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.reload(true);
    }
    if (!localStorage.getItem("token") && !localStorage.getItem("username")) {
        return( 
            <div className={s.itemscontainer}>
    <Link to="/" className={s.campus}>Campus Connect</Link>
  <div className={s.items}>
      <nav
        className={s.nav}
      >
        <Link to="/login" className="text-white">Login</Link> |{" "}
        <Link to="/register">Register</Link>
      </nav>
      <Outlet />
     </div>
     </div>
        )
    }
    return (
  
            <div className={s.itemscontainer}>
    <Link to="/" className={s.campus}>Campus Connect</Link>
  <div className={s.items}>
      <nav
        className={s.nav}
      >
        <Link to="/login" className="text-white">Dashboard</Link> |{" "}
        <button onClick={e => handleSignOut(e)}>Sign out</button>
      </nav>
      <Outlet />
     </div>
     </div>

    )
}
