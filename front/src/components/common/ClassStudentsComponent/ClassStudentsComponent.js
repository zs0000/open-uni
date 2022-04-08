import React, { useState, useEffect, useContext } from "react" 
import { useQueryClient } from "react-query";
import { useParams } from "react-router";
import GrabClassDetails from "../../../apis/GrabClassDetails";
import { CourseContext } from "../../../context/CourseContext"
import StudentCard from "../StudentCard/StudentCard";
import s from "./ClassStudentsComponent.module.css"

export default function ClassStudentsComponent(){

    let queryClient = useQueryClient()
    let { course_id } = useParams()
    const {studentRoster, setStudentRoster} = useContext(CourseContext)
    const [loadedStudents, setLoadedStudents] = useState(false); 

    useEffect(()=>{

        const fetchStudentsJoined = async() => {
        try {
            const studentsJoined = await queryClient.fetchQuery(`${course_id}-students`, () => GrabClassDetails.get(`/students/${course_id}`), {
                cacheTime:100000,
                staleTime:100000
            })
            if(studentsJoined){
                    setStudentRoster(studentsJoined.data.data.students)
                    setLoadedStudents(true)
            }
        } catch (err) {
            console.error(err.message)
        }
        }

        fetchStudentsJoined();
    },[])

    if(loadedStudents === false){
        return(
            <div className={s.main}>
              Fetching students...
            </div>
        )
    }

    return(
    <div className={s.main}>
    {studentRoster.map((item)=>(
        <StudentCard item={item}/>
        
    ))}
    </div>
)
}