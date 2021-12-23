import React, { Fragment, useEffect, useState, useContext } from 'react'
import GrabClassDetails from '../apis/GrabClassDetails'
import { CourseContext } from '../context/CourseContext';
import s from "../styles/ClassAssignments.module.css"
import dateFormat, { masks } from "dateformat";
import { useNavigate, useParams } from 'react-router';
import TeachersSidebar from '../components/common/TeachersSidebar/TeachersSidebar';
import { useQuery, useQueryClient } from 'react-query';
import StudentsSidebar from '../components/common/StudentsSidebar/StudentsSidebar';
import GrabAssignmentDetails from "../apis/GrabAssignmentDetails"


export default function ClassAssignments() {
    
    const queryClient = useQueryClient()
    const {assignmentsList, setAssignments} = useContext(CourseContext)
    let navigate = useNavigate()
    let { course_id } = useParams()
    
    const { isLoading, data, isError } = useQuery(`${course_id}-assignments`, () =>  GrabClassDetails.get(`/assignments/${course_id}`))  

    const userData = queryClient.getQueryData(`user-data`)

    const handleAssignmentSelect = async(assignment_id) => {

        const prefetchAssignmentData = await queryClient.prefetchQuery(`${course_id}-${assignment_id}-data`, () => GrabAssignmentDetails.get(`/${course_id}/${assignment_id}`), {
            staleTime: Infinity,
            cacheTime: Infinity,
        } )
        navigate(`/assignments/${course_id}/${assignment_id}`, {replace:true})
    }

    
    useEffect(()=> {
        const fetchAssignments = async() => {
            try {
                
                const res = await GrabClassDetails.get(`/assignments/${course_id}`)
                
                setAssignments(res.data.data.assignments)
   
        
         
            } catch (err) {
                console.error(err.message)
            }
        }
        fetchAssignments()
    },[])    
        
    if(userData === undefined) {

       
        navigate(`/view/${course_id}`, {replace:true})

        return(
            <div>
                Please try accessing this page again. Sorry for the inconvienience.
            </div>
        )
    }

    if(userData.data.user_role === "user") {
        return (
            <Fragment>
            <div className={s.main}>
                   <div className={s.responsive}>
                <div className={s.content}>
                    <div className={s.sidebar}>
                    <StudentsSidebar
                    
                    />
                    </div>
                    <div className={s.right}>
                <div className={s.toptitlebox}>
                        <h2 className={s.toptitle}>
                            Current Assignments
                        </h2>
                    </div>
            {assignmentsList.map((item) => (
                <div className={s.card} onClick={() => handleAssignmentSelect(item.assignment_id)}>
                    <div className={s.textbox}>
                    <div className={s.titlebox}>
                    <span className={s.title}>
                    {item.assignment_title}
                    </span>
                    </div>
                    <div className={s.descriptionbox}>
                    <span className={s.description}>
                    {item.assignment_description}
                    </span>
                    </div>
                    </div>
                    <div className={s.dates}>
                        <div className={s.startdate}>
                            <span className={s.start}>
                            <strong>Assigned: </strong>{dateFormat(item.assignment_start_date, "dddd, mmmm dS, yyyy")}
                            </span>
                        </div>
                        <div className={s.duedate}>
                            <span className={s.due}>
                            <strong>Due: </strong>{dateFormat(item.assignment_due_date, "dddd, mmmm dS, yyyy")}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
            </div>
                </div>
                </div>
            </div>
        </Fragment>
        )
    }



    return (

        <Fragment>
            <div className={s.main}>
                   <div className={s.responsive}>
                <div className={s.content}>
                    <div className={s.sidebar}>
                    <TeachersSidebar 
                    
                    
                    />
                    </div>
                    <div className={s.right}>
                <div className={s.toptitlebox}>
                        <h2 className={s.toptitle}>
                            Current Assignments
                        </h2>
                    </div>
            {assignmentsList.map((item) => (
                <div className={s.card}>
                    <div className={s.textbox}>
                    <div className={s.titlebox}>
                    <span className={s.title}>
                    {item.assignment_title}
                    </span>
                    </div>
                    <div className={s.descriptionbox}>
                    <span className={s.description}>
                    {item.assignment_description}
                    </span>
                    </div>
                    </div>
                    <div className={s.dates}>
                        <div className={s.startdate}>
                            <span className={s.start}>
                            {dateFormat(item.assignment_start_date, "dddd, mmmm dS, yyyy")}
                            </span>
                        </div>
                        <div className={s.duedate}>
                            <span className={s.due}>
                            {dateFormat(item.assignment_due_date, "dddd, mmmm dS, yyyy")}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
            </div>
                </div>
                </div>
            </div>
        </Fragment>
    )
}
