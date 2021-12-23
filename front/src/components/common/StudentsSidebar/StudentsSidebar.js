import React, { Fragment } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router'
import s from "./StudentsSidebar.module.css"
import { Link } from "react-router-dom"
import { useQueryClient } from 'react-query'


export default function StudentsSidebar() {
    
    const recentlySelectedCourse = localStorage.getItem("recently-selected-course")

    let { course_id } = useParams() 
    let navigate = useNavigate();

    const handleClickAssignments = () => {

    }

    const queryClient = useQueryClient()

    const data = queryClient.getQueryData(`${course_id}-data`)
    
    if(data ===undefined) {

      

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
                    <h2 className={s.title}>
                    {data.data.data.courseDetails[0].course_title}
                    </h2>
                </div>
                
               
                
                </div>
                <div className={s.sidebarlinks}>
                    <nav className={s.navlinks}>
                        <Link className={s.navlink} to={`/assignments/${recentlySelectedCourse}`}>Assignments</Link>
                        <Link className={s.navlink} to={`/assignments/${recentlySelectedCourse}`}>Assignments</Link>
                        <Link className={s.navlink} to={`/assignments/${recentlySelectedCourse}`}>Assignments</Link>
                    </nav>
                </div>
                </div>
            <Outlet/>
        </Fragment>
    )
}
