import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom'
import AuthFinder from '../../../apis/AuthFinder';
import s from "../../../styles/Navbar.module.css"
import { UsersContext } from '../../../context/UsersContext'
import UserCheck from '../../../apis/UserCheck';


export default function Navbar({setAuth}) {
    const { users, setUser } = useContext(UsersContext);

    const  [isAuthenticated, setIsAuthenticated] = useState(false);

    
  
    async function isAuth() {
      try {
        let token = localStorage.getItem("token")

        const response = await AuthFinder.get("/is-verify",{
          headers: { token }
        })
        const parseRes = response.data
  
        
        
       parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      
     
        

      } catch (err) {
        console.error(err.message)
      }
    }
  
    useEffect(() => {
      isAuth()
    },[])

    const handleSignOut = (e) => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.reload(true);
    }
    if(users === null || users === undefined) {
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
