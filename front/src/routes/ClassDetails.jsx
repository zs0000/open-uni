import React, { Fragment, useEffect, useContext } from 'react'
import { Outlet } from 'react-router'
import GrabClassDetails from '../apis/GrabClassDetails'
import ViewClassDetails from '../components/common/ViewClassDetails/ViewClassDetails'
import { CourseContext } from '../context/CourseContext'
import { useQuery } from 'react-query'
import LoadingPage from '../components/common/LoadingPage/LoadingPage'
export default function ClassDetails() {

    const mostRecentlySelectedCourse = localStorage.getItem("recently-selected-course")
    const {professor, setProfessor} = useContext(CourseContext)
    const {courseTitle, setCourseTitle} = useContext(CourseContext)
    const {courseDescription, setCourseDescription} = useContext(CourseContext)
    const {courseCapacity, setCourseCapacity} = useContext(CourseContext)
    const {courseTag, setCourseTag} = useContext(CourseContext)
    const {courseCategory, setCourseCategory} = useContext(CourseContext)
    const { courseIdentifier, setCourseIdentifier } = useContext(CourseContext)
    
    const { isLoading, data, error } = useQuery(`${mostRecentlySelectedCourse}-data`,() => 
    GrabClassDetails.get(`/retrieve/${mostRecentlySelectedCourse}`)
    )

    useEffect(()=>{
        const fetchClassData = async() => {
        try {
            const res = await GrabClassDetails.get(`/retrieve/${mostRecentlySelectedCourse}`)
            console.log(res.data.data.courseDetails[0])
            setProfessor(res.data.data.courseDetails[0].professor)
            setCourseTitle(res.data.data.courseDetails[0].course_title)
            setCourseDescription(res.data.data.courseDetails[0].course_description)
            setCourseCapacity(res.data.data.courseDetails[0].course_capacity)
            setCourseCategory(res.data.data.courseDetails[0].course_category)
            setCourseTag(res.data.data.courseDetails[0].course_tag)
            setCourseIdentifier(res.data.data.courseDetails[0].course_id)
      
        } catch (err) {
            console.error(err.message)
        }
    }
    setProfessor("Loading...")
            setCourseTitle("Loading...")
            setCourseDescription("Loading...")
            setCourseCapacity("Loading...")
            setCourseCategory("Loading...")
            setCourseTag("Loading...")
            setCourseIdentifier("Loading...")
    fetchClassData()
    },[])


    if(isLoading) {
        return(
            <div>
                <LoadingPage/>
            </div>
        )
    }

    return (
        
        <div>
            <ViewClassDetails
            professor={professor}
            courseTitle={courseTitle}
            courseDescription={courseDescription}
            courseCapacity={courseCapacity}
            courseCategory={courseCategory}
            courseTag={courseTag}
            courseIdentifier={courseIdentifier}
            
            
            
            />
        </div>
    )
}
