import React, { useContext, useEffect } from 'react'
import { Query, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import DashboardApi from '../../../apis/DashboardApi';
import StudentsAllAvailableClasses from '../../../apis/StudentsAllAvailableClasses';
import UserCheck from '../../../apis/UserCheck';
import { CourseContext } from '../../../context/CourseContext';
import s from "./StudentsClassesComponent.module.css"


export default function StudentsClassesComponent({

}) {
    let navigate = useNavigate()
    let queryClient = useQueryClient()
    let userPersist = localStorage.getItem("username")

    const {selectedCourse, setSelectedCourse} = useContext(CourseContext)
    const {courses, setCourses} = useContext(CourseContext)

    const options = {
        headers : {'token': localStorage.getItem("token")}
    }
    useEffect(()=> {

     


        const fetchAvailableCourses = async() => {
            try {
               
               const res = await StudentsAllAvailableClasses.get(`/retrieve/${userPersist}`);
                
               setCourses(res.data.data.courses)

          
               
            } catch (err) {
                console.error(err.message)
            }
        }
   
        fetchAvailableCourses();
    },[])

   
    const handleCourseSelect = async(course_id) => {
        setSelectedCourse(course_id)
        localStorage.setItem("recently-selected-course", course_id)
        
    
     const prefetchEnrolledStatus = await queryClient.prefetchQuery(`${course_id}${userPersist}`, ()=>UserCheck.get(`/${course_id}/${userPersist}`,{
            cacheTime: 100000,
        }))
        navigate(`/view/${course_id}`, { replace: true })
    }




    return (
        <div>
           {courses.map((item) => (
                <div className={s.card} onClick={() => handleCourseSelect(item.course_id)}  key={item.course_id}>
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
    )
}
