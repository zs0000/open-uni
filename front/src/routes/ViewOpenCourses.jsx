import React, { useState, useEffect, useContext, Fragment } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import StudentsAllAvailableClasses from "../apis/StudentsAllAvailableClasses";
import UserCheck from "../apis/UserCheck";
import LoadingPage from "../components/common/LoadingPage/LoadingPage";
import { CourseContext } from "../context/CourseContext";
import { UsersContext } from "../context/UsersContext";
import s from "../styles/ViewOpenCourses.module.css"

export default function ViewOpenCourses(){
    
    let queryClient = useQueryClient();
    let navigate = useNavigate();
    let userPersist = localStorage.getItem("username")

    let [loadedCourses, setLoadedCourses] = useState(false);
    const {selectedCourse, setSelectedCourse} = useContext(CourseContext)
    const {courses, setCourses} = useContext(CourseContext)

    const {usersUsername, setUsersUsername} = useContext(UsersContext)

    const handleCourseSelect = async(course_id) => {
        setSelectedCourse(course_id)
        localStorage.setItem("recently-selected-course", course_id)
        
    
     const prefetchEnrolledStatus = await queryClient.prefetchQuery(`${course_id}${usersUsername ? usersUsername : userPersist}`, ()=>UserCheck.get(`/${course_id}/${usersUsername ? usersUsername : userPersist}`,{
            cacheTime: 100000,
        }))
        navigate(`/view/${course_id}`, { replace: true })
    }

    const handleDashboardNavigate = () => {
        navigate(`/dashboard/`, {replace:true})
    }


    useEffect(()=>{
        
        const fetchOpenCourses = async() => {
            try {
                const fetchCourses = await StudentsAllAvailableClasses.get(`/retrieve`)
              
                setCourses(fetchCourses.data.data.courses)
                setLoadedCourses(true)
          
         

            } catch (err) {
                console.error(err.message)
            }
        }

        fetchOpenCourses()
    },[])

    if(loadedCourses === false) {
        return(
            <LoadingPage/>
        )
    }

    
    return(
 
            <div className={s.main}>
                
                <div className={s.top}>
                    <div className={s.toptitlebox}>
                        <h2 className={s.toptitle}>
                            Available Courses
                        </h2>
                        
                    </div>
                    <div className={s.buttonbox}>
                        <button className={s.button} onClick={() => handleDashboardNavigate()} >
                            Dashboard
                        </button>
                    </div>
                    
                </div>
                <div className={s.courses}>
            {courses.map((item) => (
                <div className={s.card}  key={item.course_id} onClick={() => handleCourseSelect(item.course_id)}>
                    <div className={s.cardtext}>
                        <div  className={s.titlebox}>
                        <h2 className={s.title}>
                        {item.course_title}
                        </h2>
                        </div>
                        <div className={s.professorbox}>
                        <h3 className={s.professor}>
                        {item.professor}
                        </h3>
                        </div>
                    </div>
                </div>
            ))

            }
       </div>
            </div>
     
    )
}