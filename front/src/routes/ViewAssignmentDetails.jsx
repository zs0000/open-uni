import React, { useContext, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import GrabAssignmentDetails from '../apis/GrabAssignmentDetails'
import LoadingPage from '../components/common/LoadingPage/LoadingPage'
import StudentsSidebar from '../components/common/StudentsSidebar/StudentsSidebar'
import { AssignmentContext } from '../context/AssignmentContext'
import { CourseContext } from '../context/CourseContext'
import s from "../styles/ViewAssignmentDetails.module.css"
import dateFormat, { masks } from "dateformat";

export default function ViewAssignmentDetails() {

    let queryClient = useQueryClient()
    let navigate = useNavigate()
    
    let { course_id, assignment_id } = useParams()

    let [loaded, setLoaded] = useState(false)

    const {assignmentTitle, setAssignmentTitle} = useContext(AssignmentContext)
    const {assignmentDescription, setAssignmentDescription} = useContext(AssignmentContext)
    const {assignmentInstruction, setAssignmentInstruction} = useContext(AssignmentContext)
    const {assignmentDate, setAssignmentDate} = useContext(AssignmentContext)
    const {assignmentDue, setAssignmentDue} = useContext(AssignmentContext)
    const {assignmentLink, setAssignmentLink} = useContext(AssignmentContext)

    useEffect(() => {
        
        const fetchAssignmentDetails = async() => {
            try {
                const fetchAssignmentData = await queryClient.fetchQuery(`${course_id}-${assignment_id}-data`,() => GrabAssignmentDetails.get(`/${course_id}/${assignment_id}`))
                console.log(fetchAssignmentData)
                setAssignmentTitle(fetchAssignmentData.data.data.assignment.assignment_title)
                setAssignmentDescription(fetchAssignmentData.data.data.assignment.assignment_description)
                setAssignmentInstruction(fetchAssignmentData.data.data.assignment.assignment_instruction)
                setAssignmentDate(fetchAssignmentData.data.data.assignment.assignment_start_date)
                setAssignmentDue(fetchAssignmentData.data.data.assignment.assignment_due_date)
                setAssignmentLink(fetchAssignmentData.data.data.assignment.assignment_material_link)
                
                if (fetchAssignmentData) {
                    setLoaded(true)
                }
              
            } catch (err) {
                console.error(err.message)
            }
        }

        fetchAssignmentDetails();
    },[])


    if (loaded === false){
        
        return(
            <>
            <LoadingPage/>
            </>
        )
    }

    return (
        <div className={s.main}>
            <div className={s.content}>
                <div className={s.sidebar}>
                   <StudentsSidebar/>
                </div>
                <div className={s.right}>
                   
                        <div className={s.card}>
                    <div className={s.dates}>
                        <span className={s.startdate}>
                            <strong>Assigned: </strong>{dateFormat(assignmentDate, "dddd, mmmm dS, yyyy")}
                        </span>
                        <span className={s.duedate}>
                        <strong>Due: </strong>{dateFormat(assignmentDue, "dddd, mmmm dS, yyyy")}
                        </span>
                    </div>
                    <div className={s.middle}>
                    
                    <div className={s.titlebox}>
                        <span>
                            <strong>Title:</strong> 
                        </span>
                        <h3 className={s.title}>
                        {assignmentTitle}
                        </h3>
                    </div>
                    <div className={s.descriptionbox}>
                    <span>
                          <strong>  Description: </strong>
                        </span>
                        <p className={s.description}>
                            {assignmentDescription}
                        </p>
                    </div>
                    </div>
                    <div className={s.instructionbox}>
                        <span>
                            <strong>Instruction</strong>
                        </span>
                        <span className={s.instruction}>
                            {assignmentInstruction}
                        </span>
                    </div>
                    
                    <div className={s.materiallinkbox}>
                        <span>
                          <strong>Assignment Material: </strong>
                        </span>
                        <Link className={s.materiallink} to="https://www.google.com/" target="_blank" rel='noopener noreferrer'>
                            {assignmentLink}
                        </Link>
                    </div>
                    
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
