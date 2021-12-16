import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router';
import StudentsAllAvailableClasses from '../../../apis/StudentsAllAvailableClasses';
import { CourseContext } from '../../../context/CourseContext';
import s from "./StudentsClassesComponent.module.css"


export default function StudentsClassesComponent() {
    let navigate = useNavigate()
    const {selectedCourse, setSelectedCourse} = useContext(CourseContext)
    const {courses, setCourses} = useContext(CourseContext)
    const userPersist = localStorage.getItem("username")
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

   
    const handleCourseSelect = (course_id) => {
        setSelectedCourse(course_id)
        localStorage.setItem("recently-selected-course", course_id)
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
