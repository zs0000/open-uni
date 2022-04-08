import React, {useContext, useEffect, useState} from "react"
import { useQueryClient } from "react-query"
import { useParams } from "react-router"
import GrabClassDetails from "../apis/GrabClassDetails"
import LoadingPage from "../components/common/LoadingPage/LoadingPage"
import { CourseContext } from "../context/CourseContext"
import StudentCard from "../components//common/StudentCard/StudentCard"


export default function ClassStudents(){
    
    let { course_id } = useParams()
    let queryClient = useQueryClient();
    const [loadedStudents, setLoadedStudents] = useState(false)
    const {studentRoster, setStudentRoster} = useContext(CourseContext)
    useEffect(()=> {
        const fetchStudentsJoined = async() => {
            try {
                const studentsJoined = await queryClient.fetchQuery(`${course_id}-students`, () => GrabClassDetails.get(`/students/${course_id}`), {
                    cacheTime: 100000,
                    staletime: 100000})

                    if(studentsJoined) {
                        setStudentRoster(studentsJoined.data.data.students)
                        setLoadedStudents(true)
                    }
            } catch (err) {
                console.error(err.message)
            }
        }

        fetchStudentsJoined()
    },[])

    if(loadedStudents === false || loadedStudents === undefined){
        return(
            <LoadingPage/>
        )
    }

    return(
        <>
        {studentRoster.map((item)=>(
            <StudentCard item={item} />
        ))}
        </>
    )
}