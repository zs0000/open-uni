import React, { Fragment, useEffect, useState, useContext } from 'react'
import GrabClassDetails from '../apis/GrabClassDetails'
import { CourseContext } from '../context/CourseContext';
import s from "../styles/ClassAssignments.module.css"
import dateFormat, { masks } from "dateformat";
import { useParams } from 'react-router';
import TeachersSidebar from '../components/common/TeachersSidebar/TeachersSidebar';
import { useQuery, useQueryClient } from 'react-query';



export default function ClassAssignments() {

    
    const {assignmentsList, setAssignments} = useContext(CourseContext)

    let { course_id } = useParams()
    
    const { isLoading, data, isError } = useQuery(`${course_id}-assignments`, () =>  GrabClassDetails.get(`/assignments/${course_id}`))  

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
