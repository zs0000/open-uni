import React, { useEffect, useState, Fragment, useContext } from 'react'
import TeachersAllExistingClasses from '../../../apis/TeachersAllExistingClasses'
import { CourseContext } from '../../../context/CourseContext'
import { UsersContext } from '../../../context/UsersContext'
import { useNavigate } from 'react-router'
import s from "./TeachersClassesComponent.module.css"

export default function TeachersClassesComponent() {
    let navigate = useNavigate();

    const {courses, setCourses} = useContext(CourseContext)
    const {selectedCourse, setSelectedCourse} = useContext(CourseContext);
    const teacherPersist = localStorage.getItem("username")
    

    const handleCourseSelect = (course_id) => {
        setSelectedCourse(course_id)
        localStorage.setItem("recently-selected-course", course_id)
        navigate(`/view/${course_id}`, { replace: true })
    }

    useEffect(() => {
        const fetchClasses = async() => {

      
        try {
            const res = await TeachersAllExistingClasses.get(`/retrieve/${teacherPersist}`);
      
            setCourses(res.data.data.courses)
            
 
        } catch (err) {
            console.error(err.message)
        }
    }
    fetchClasses();
    
    },[])

   
    return (
        <Fragment>
            <div className={s.main}>
                
                <div className={s.top}>
                    <div className={s.toptitlebox}>
                        <h2 className={s.toptitle}>
                            Courses
                        </h2>
                    </div>
                </div>
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
        </Fragment>
    )
}
