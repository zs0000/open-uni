import { useContext, useEffect, useState } from "react"
import GrabClassDetails from "../../../apis/GrabClassDetails"
import StudentsJoinClassApi from "../../../apis/StudentsJoinClassApi"
import UserCheck from "../../../apis/UserCheck"
import { CourseContext } from "../../../context/CourseContext"
import { UsersContext } from "../../../context/UsersContext"
import s from "./ViewClassDetails.module.css"
import TeachersSidebar from "../TeachersSidebar/TeachersSidebar"
import { useQueryClient } from "react-query"
import { useNavigate, useParams } from "react-router"
import LoadingPage from "../LoadingPage/LoadingPage"
import DashboardApi from "../../../apis/DashboardApi"
import NotEnrolledClassView from "../NotEnrolledClassView/NotEnrolledClassView"

export default function ViewClassDetails({professor, courseIdentifier, courseTitle, courseDescription, courseCategory, courseTag, courseCapacity}) {

    const [test, setTest] = useState()
    const {enrollable, setEnrollable} = useContext(CourseContext)
    const [currentCount, setCurrentCount] = useState()
    const {enrolled, setEnrolled} = useContext(CourseContext)
    const {usersRole, setUsersRole} = useContext(UsersContext);
    const {usersFirstName, setUsersFirstName} = useContext(UsersContext)
    const {usersLastName, setUsersLastName} = useContext(UsersContext)
    const {usersUsername, setUsersUsername} = useContext(UsersContext)
    const [loaded, setLoaded] = useState(false)
    let navigate = useNavigate()
    const options = {
        headers : {'token': localStorage.getItem("token")}
    }
    
    const queryClient = useQueryClient()

        const fetchUserData = async() =>{
                try {
                    const userData = await queryClient.fetchQuery('user-data', () => DashboardApi.get("/", options), {
                        cacheTime: 100000,
                    })
                    setUsersFirstName(userData.data.user_firstname)
                    setUsersLastName(userData.data.user_lastname)
                    setUsersRole(userData.data.user_role)
                    setUsersUsername(userData.data.user_username)
                    
                } catch (err) {
                    console.error(err.message)
                }
        }
        
        const fetchEnrolledStatus = async () => {
            try {
                const res = await queryClient.fetchQuery(`${course_id}${usersUsername}`, ()=>UserCheck.get(`/${course_id}/${usersUsername}`,{
                    cacheTime: 100000,
                }))
                if(res.data.data.users.length === 0) {
                    setEnrolled(false)
                    navigate(`/join/${course_id}`, { replace: true })
                }
                if(res.data.data.users.length > 0) {
                    setEnrolled(true)
                }
              
            } catch (err) {
                console.error(err.message)
            }
        }

       
    
    let { course_id } = useParams()
   
   

    useEffect(()=>{
        
        
 

        fetchUserData()
        fetchEnrolledStatus()
    },[])
   

    if(enrolled === false && usersRole === 'user'){
        
       
        return(
            <NotEnrolledClassView
            courseTitle={courseTitle}
            courseDescription={courseDescription}
            courseCapacity={courseCapacity}
            courseTag={courseTag}
            currentCount={currentCount}
            enrollable={enrollable}
            enrolled={enrolled}
            usersRole={usersRole}
            
            />
        )
    }

    if(usersRole === "teacher"){
        return(
            <div className={s.main}>
            <div className={s.responsive}>
            <div className={s.sidebar}>
                
                <TeachersSidebar
               courseTitle={courseTitle}
               courseDescription={courseDescription}
               courseCapacity={courseCapacity}
               currentCount={currentCount}
               />
                </div>
                <div className={s.content}>
                <div className={s.rightsidetop}>
                    { /* Announcements component */}
                </div>
                
                <div className={s.rightsidemiddle}>
                    { /* Assigntments component */}
                </div>
                
                <div className={s.rightsidebottom}>
                    { /* Students component */}
                </div>
                </div>
            </div>
        </div>
        )
    }

    if(enrolled=== true) {
        return(
            <div className={s.main}>
            <div className={s.responsive}>
                <div className={s.content}>
                <div className={s.top}>
                <div className={s.titlebox}>
                    <h2 className={s.title}>
                    {courseTitle}
                    </h2>
                </div>
                </div>
                <div className={s.left}>
            
                </div>
                <div className={s.right}>
                    
                </div>
                </div>
            </div>
        </div>
        )
    }

    return (
        <div className={s.main}>
            o
        </div>
    )
}
