import React, { Fragment, useState, useEffect, useContext } from "react"
import DashboardApi from "../apis/DashboardApi"
import { UsersContext } from "../context/UsersContext"
import s from "../styles/Dashboard.module.css"
import StudentDashboard from "../components/common/StudentDashboard/StudentDashboard"
import { Link } from "react-router-dom"
import TeachersClassesComponent from "../components/common/TeachersClassesComponent/TeachersClassesComponent"
import { Navigate, Outlet, useNavigate } from "react-router"
import { QueryClient, useQuery } from "react-query"
import LoadingPage from "../components/common/LoadingPage/LoadingPage"
import MessagesComponent from "../components/common/MessagesComponent/MessagesComponent"
import TeachersDashboard from "../components/common/TeachersDashboard/TeachersDashboard"
import QuestionsComponent from "../components/common/QuestionsComponent/QuestionsComponent"


export default function Dashboard({setAuth}) {
    const {users, setUser} = useContext(UsersContext)
    const {usersRole, setUsersRole} = useContext(UsersContext)
    const {usersFirstName, setUsersFirstName} = useContext(UsersContext)
    const {usersLastName, setUsersLastName} = useContext(UsersContext)
    const {usersFullName, setUsersFullName} = useContext(UsersContext)

    let navigate = useNavigate()

    const [username, setUsername] = useState("")
    const options = {
        headers : {'token': localStorage.getItem("token")}
    }
    const [loaded, setLoaded] = useState(false)
    const queryClient = new QueryClient()
    
    const handleViewCourses = () => {
        navigate(`/open_courses`, { replace: true })
    }
    

    async function getUsername() {
       
        try {
            const response = await DashboardApi.get('/', options)
            const userData = await queryClient.fetchQuery('user-data', () => DashboardApi.get("/", options), {
                cacheTime: Infinity,
                staleTime: Infinity,
            })
           
            setUsername(response.data.user_username)
            setUsersRole(response.data.user_role)
            setUsersFirstName(response.data.user_firstname)
            setUsersLastName(response.data.user_lastname)
            setUsersFullName(usersFirstName + ` ` + usersLastName)
            setUser(response.data.user_username)

            if(users !== undefined && users !== null) {
                localStorage.setItem("username", users)
            }

            if(userData.data.user_username !== null){
                setLoaded(true)
           
            }
        } catch (err) {
            console.error(err.message)
        }
    }


    useEffect(() => {
        getUsername()
        
    },[])
    if(loaded === false) {
        return(<LoadingPage />)
    }


    if(usersRole ===  "teacher") {
        
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
                 <TeachersDashboard
                 usersFullName={usersFullName}
                 usersFirstName={usersFirstName}
                 usersLastName={usersLastName}
                 usersRole={usersRole}
                 users={users}
                 />
                 <div>
                     <QuestionsComponent
                     users={users}
                     />
                 </div>
                </div>
                
            </div>
            </div>
            <Outlet />
        </div>
    </Fragment>
        )
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
                        <div className={s.buttonbox}>
                        <button className={s.button} onClick={()=> handleViewCourses()}>
                            View Courses
                        </button>
                        </div>
                        
                     </div>
                 </div>
                 <div className={s.middle}>
                 <StudentDashboard
                 usersFullName={usersFullName}
                 usersFirstName={usersFirstName}
                 usersLastName={usersLastName}
                 usersRole={usersRole}
                 users={users}
                 />
                <div className={s.questionscomponent}>
                     <QuestionsComponent
                     users={users}
                     />
                 </div>
                 </div>
                 </div>
             </div>
         </div>
     </Fragment>
    );
  }