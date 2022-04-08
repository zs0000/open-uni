
import s from "../styles/Home.module.css"
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { UsersContext } from "../context/UsersContext";
import DashboardApi from "../apis/DashboardApi";
import React, { Fragment, useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router";


export default function Home() {
  const {users, setUser} = useContext(UsersContext)
  const {usersRole, setUsersRole} = useContext(UsersContext)
  let navigate = useNavigate()
  const [username, setUsername] = useState("")
  const options = {
      headers : {'token': localStorage.getItem("token")}
  }



  async function getUsername() {
     
      try {
          const response = await DashboardApi.get('/', options)
      
         
          setUsername(response.data.user_username)
          setUsersRole(response.data.user_role)
       
     
          setUser(response.data.user_username)
      } catch (err) {
          console.error(err.message)
      }
  }

  const handleLoginClick = () => {
    navigate(`/login`, {replace:true})
  }

  useEffect(() => {
      getUsername()
  },[])
    return (
     
        <div className={s.main}>
       
          <div className={s.content}>
            <div className={s.card}>
              <div className={s.cardtitlebox}>
              CourseConnect
              </div>
              <div className={s.buttonbox}>
                <button className={s.button} onClick={() => handleLoginClick()}>
                  Login
                </button>
              </div>
              
            </div>
          </div>

        
        </div>
        
    
    );
  }