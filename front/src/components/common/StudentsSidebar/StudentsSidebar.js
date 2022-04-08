import React, { Fragment, useContext, useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router'
import s from "./StudentsSidebar.module.css"
import { Link } from "react-router-dom"
import { useQueryClient } from 'react-query'
import { CourseContext } from '../../../context/CourseContext'
import GrabClassDetails from "../../../apis/GrabClassDetails"

export default function StudentsSidebar() {
    
    const recentlySelectedCourse = localStorage.getItem("recently-selected-course")
    const {courseTitle, setCourseTitle} = useContext(CourseContext)
    const {courseDescription, setCourseDescription} = useContext(CourseContext)
    const {courseCapacity, setCourseCapacity} = useContext(CourseContext)
    const {courseTag, setCourseTag} = useContext(CourseContext)
    let { course_id } = useParams() 
    let navigate = useNavigate()
    const queryClient = useQueryClient()

    const handleClassTitleClick = () => {
        navigate(`/view/${course_id}`, {replace:true})
    }


    useEffect(()=> {
        const fetchClassData = async () => {
            try {
                const res = await queryClient.fetchQuery(`${course_id}-data`, ()=> GrabClassDetails.get(`/retrieve/${course_id}`,{
                    cacheTime: Infinity,
                    staleTime: Infinity
                }))
                setCourseTitle(res.data.data.courseDetails[0].course_title)
                setCourseDescription(res.data.data.courseDetails[0].course_description)
                setCourseTag(res.data.data.courseDetails[0].course_tag)
                setCourseCapacity(res.data.data.courseDetails[0].course_capacity)
              
            } catch (err) {
                console.error(err.message)
            }
        }
        fetchClassData()
    },[])


    if(courseTitle === undefined) {

      

        return(
            <div>
                Loading...
            </div>
        )
    }


    return (
        <Fragment>
            <div className={s.sidebar}>
            <div className={s.sidebartop}>
                <div className={s.titlebox}>
                    <h2 className={s.title} onClick={() => handleClassTitleClick()}>
                    {courseTitle}
                    </h2>
                </div>
                
               
                
                </div>
                <div className={s.sidebarlinks}>
                    <nav className={s.navlinks}>
                    <Link className={s.navlink} to={`/announcements/${recentlySelectedCourse}`}>Announcements</Link>
                        <Link className={s.navlink} to={`/assignments/${recentlySelectedCourse}`}>Assignments</Link>
                        <Link className={s.navlink} to={`/roster/${recentlySelectedCourse}`}>Students</Link>
                        <Link className={s.navlink} to={`/questions/${recentlySelectedCourse}`}>Questions</Link>
                    </nav>
                </div>
                </div>
            <Outlet/>
        </Fragment>
    )
}
