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
import StudentsSidebar from "../StudentsSidebar/StudentsSidebar"
import ClassAssignmentsComponent from "../ClassAssignmentsComponent/ClassAssignmentsComponent"
import ClassAnnouncementsComponent from "../ClassAnnouncementsComponent/ClassAnnouncementsComponent"
import { Link } from "react-router-dom"
import ClassStudentsComponent from "../ClassStudentsComponent/ClassStudentsComponent"

export default function ViewClassDetails({professor, courseIdentifier, courseTitle, courseDescription, courseCategory, courseTag, courseCapacity}) {

    const [test, setTest] = useState()
    const {enrollable, setEnrollable} = useContext(CourseContext)
    const [currentCount, setCurrentCount] = useState()
    const {enrolled, setEnrolled} = useContext(CourseContext)
    const {usersRole, setUsersRole} = useContext(UsersContext);
    const {usersFirstName, setUsersFirstName} = useContext(UsersContext)
    const {usersLastName, setUsersLastName} = useContext(UsersContext)
    const {usersUsername, setUsersUsername} = useContext(UsersContext)
    const {assignmentList, setAssignments} = useContext(CourseContext)
    const [loaded, setLoaded] = useState(false)

    let navigate = useNavigate()
    const options = {
        headers : {'token': localStorage.getItem("token")}
    }
    
    const queryClient = useQueryClient()




        const fetchUserData = async() =>{
                try {
                    const userData = await queryClient.fetchQuery('user-data', () => DashboardApi.get("/", options), {
                        cacheTime: Infinity,
                        staleTime: Infinity
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
                    cacheTime: Infinity,
                    staleTime: Infinity
                }))
                if(res.data.data.users.length === 0) {
                    if(usersRole === "teacher") {
                        setEnrolled(true)
                    
                    }
                    if(usersRole === "user") {
                    setEnrolled(false)
                    
                    navigate(`/join/${course_id}`, { replace: true })
                    }
                }
                if(res.data.data.users.length > 0) {
                    setEnrolled(true)
                }
              
            } catch (err) {
                console.error(err.message)
            }
        }

       
        const handleCreateAnnouncement = (course_id) => {
            navigate("/create_announcement", {replace:true})
        }
        const handleCreateAssignment = (assignment_id) => {
            navigate("/create_assignment", {replace:true})
        }


    let { course_id } = useParams()
   

   

    useEffect(()=>{
        
        

        fetchUserData()
        fetchEnrolledStatus()
    },[])
   
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
                    <div className={s.teacherbuttons}>
                        <div className={s.buttonbox} >
                            <button className={s.button} onClick={() => handleCreateAnnouncement(course_id)}>
                                Create Announcement
                            </button>
                        </div>
                        <div className={s.buttonbox}>
                        <button className={s.button} onClick={() => handleCreateAssignment(course_id)}>
                                Create Assignment
                            </button>
                        </div>
                        <div className={s.buttonbox}>
                        <button className={s.button} onClick={() => handleCreateAnnouncement(course_id)}>
                                Manage Roster
                            </button>
                        </div>
                    </div>
                <div className={s.rightsidetop}>
                  <div className={s.announcementlabel}>
                      <span className={s.announcements}>
                          Announcements
                      </span>
                  </div>
                    <ClassAnnouncementsComponent
              
                    />
                </div>
                
                <div className={s.rightsidemiddle}>
                <div className={s.assignmentslabel}>
                      <span className={s.assignments}>
                          Assignments
                      </span>
                  </div>
                    <ClassAssignmentsComponent 
                   
                    />
                </div>
                <div className={s.rightsidebottom}>
                <div className={s.studentslabel}>
                      <span className={s.students}>
                          Students
                      </span>
                  </div>
                    <ClassStudentsComponent
                   
                    />
                </div>
                
               
                </div>
            </div>
        </div>
        )
    }
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

   

    if(enrolled=== true) {
        return(
            <div className={s.main}>
            <div className={s.responsive}>
            <div className={s.sidebar}>
                
                <StudentsSidebar
               courseTitle={courseTitle}
               courseDescription={courseDescription}
               courseCapacity={courseCapacity}
               currentCount={currentCount}
               usersRole={usersRole}
               />
                </div>
                <div className={s.content}>
                <div className={s.rightsidetop}>
                <ClassAnnouncementsComponent
              
                />
                </div>
                
                <div className={s.rightsidemiddle}>
                    <ClassAssignmentsComponent 
        
                    />
                </div>
                
                <div className={s.rightsidebottom}>
                <div className={s.studentslabel}>
                      <span className={s.students}>
                          Students
                      </span>
                  </div>
                    <ClassStudentsComponent
                   
                    />
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
