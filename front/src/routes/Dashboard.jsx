import React, { Fragment, useState, useEffect, useContext } from "react"
import DashboardApi from "../apis/DashboardApi"
import { UsersContext } from "../context/UsersContext"
import s from "../styles/Dashboard.module.css"
import StudentDashboard from "../components/common/StudentDashboard/StudentDashboard"
import { Link } from "react-router-dom"
import TeachersClassesComponent from "../components/common/TeachersClassesComponent/TeachersClassesComponent"
import { Outlet } from "react-router"
import { useQuery } from "react-query"
import LoadingPage from "../components/common/LoadingPage/LoadingPage"
export default function Dashboard({setAuth}) {
    const {users, setUser} = useContext(UsersContext)
    const {usersRole, setUsersRole} = useContext(UsersContext)
    const {usersFirstName, setUsersFirstName} = useContext(UsersContext)
    const {usersLastName, setUsersLastName} = useContext(UsersContext)
    const {usersFullName, setUsersFullName} = useContext(UsersContext)
    
    const [username, setUsername] = useState("")
    const options = {
        headers : {'token': localStorage.getItem("token")}
    }

    const { isLoading, data, error } = useQuery('user-data',() => 
    DashboardApi.get('/', options)
    )

    async function getUsername() {
       
        try {
            const response = await DashboardApi.get('/', options)
        
           
            setUsername(response.data.user_username)
            setUsersRole(response.data.user_role)
            setUsersFirstName(response.data.user_firstname)
            setUsersLastName(response.data.user_lastname)
            setUsersFullName(usersFirstName + ` ` + usersLastName)
            setUser(response.data.user_username)

            if(users !== undefined && users !== null) {
                localStorage.setItem("username", users)
            }
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getUsername()
    },[])

    if(isLoading) {
        return(
            <div>
                <LoadingPage/>
            </div>
        )
    }


    if(usersRole ===  "teacher") {
        if (isLoading) {
            <div className={s.main}>
            <div className={s.responsive}>
                <div className={s.content}>
                <div className={s.top}>
                    <div className={s.introbox}>
                       <p className={s.intro}>
                           Loading Teacher data...
                       </p>
                    </div>
                   
                    
                </div>
                <div className={s.middle}>
                  
                  
                </div>
            </div>
            </div>
            
        </div>
        }
        return(
    <Fragment>
        
        <div className={s.main}>
            <div className={s.responsive}>
                <div className={s.content}>
                <div className={s.top}>
                    <div className={s.introbox}>
                       <h2 className={s.intro}>
                           Welcome <strong>{usersFirstName}!</strong>
                       </h2>
                    </div>
                    <div className={s.buttonbox}>
                       <Link to="/create_class" className={s.button}>
                           Create a Class
                       </Link>
                   </div>
                    
                </div>
                <div className={s.middle}>
                  
                   <TeachersClassesComponent/>
                </div>
            </div>
            </div>
            <Outlet />
        </div>
    </Fragment>
        )
    }


console.log({data})
if (isLoading) {
    <div className={s.main}>
    <div className={s.responsive}>
        <div className={s.content}>
        <div className={s.top}>
            <div className={s.introbox}>
               <p className={s.intro}>
                   Loading data...
               </p>
            </div>
           
            
        </div>
        <div className={s.middle}>
          
          
        </div>
    </div>
    </div>
    
</div>
}
    return (
     <Fragment>
        
         <div className={s.main}>
             <div className={s.responsive}>
                 <div className={s.content}>
                 <div className={s.top}>
                     <div className={s.introbox}>
                        <h2 className={s.intro}>
                            Welcome <strong>{usersFirstName}!</strong>
                            
                        </h2>
                     </div>
                 </div>
                 <div className={s.middle}>
                 <StudentDashboard />
                 </div>
                 </div>
             </div>
         </div>
     </Fragment>
    );
  }