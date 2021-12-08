
import s from "../styles/Home.module.css"
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { UsersContext } from "../context/UsersContext";
import DashboardApi from "../apis/DashboardApi";
import React, { Fragment, useState, useEffect, useContext } from "react"


export default function Home() {
  const {users, setUser} = useContext(UsersContext)
  const {usersRole, setUsersRole} = useContext(UsersContext)
  
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

  useEffect(() => {
      getUsername()
  },[])
    return (
     
        <div className={s.main}>
       
          <div className={s.content}>
            <div className={s.card}>
              <div className={s.cardtitlebox}>
              
              </div>
              <div className={s.lottie}>
        <Player
  autoplay
  loop
  src="https://assets3.lottiefiles.com/packages/lf20_RItkEz.json"
  className={s.lotted}
>
  <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
</Player>
        </div>
            </div>
          </div>

        
        </div>
        
    
    );
  }