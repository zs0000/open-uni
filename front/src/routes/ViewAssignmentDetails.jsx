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
import { UsersContext } from '../context/UsersContext'
import DashboardApi from '../apis/DashboardApi'

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
    const {usersRole, setUsersRole} = useContext(UsersContext);
    const {usersFirstName, setUsersFirstName} = useContext(UsersContext)
    const {usersLastName, setUsersLastName} = useContext(UsersContext)
    const {usersUsername, setUsersUsername} = useContext(UsersContext)
    const options = {
        headers : {'token': localStorage.getItem("token")}
    }
    useEffect(() => {
        const fetchUserData = async() =>{
            try {
                const userData = await queryClient.fetchQuery('user-data', () => DashboardApi.get("/", options), {
                    cacheTime: Infinity,
                    staleTime: Infinity
                })
                setUsersFirstName(userData.data.user_firstname)
                setUsersLastName(userData.data.user_lastname)
                setUsersRole(userData.data.user_role)
                setUsersUsername(userData.data.user_username)
                
            } catch (err) {
                console.error(err.message)
            }
    }
        const fetchAssignmentDetails = async() => {
            try {
                const fetchAssignmentData = await queryClient.fetchQuery(`${course_id}-${assignment_id}-data`,() => GrabAssignmentDetails.get(`/${course_id}/${assignment_id}`))
       
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
        fetchUserData()
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
                 
                    <div className={s.middle}>
                    
                    <div className={s.titlebox}>
                        
                        <h3 className={s.title}>
                        {assignmentTitle}
                        </h3>
                    </div>
                    <div className={s.dates}>
                        <span className={s.startdate}>
                            <strong>Assigned: </strong>{dateFormat(assignmentDate, "dddd, mmmm dS, yyyy")}
                        </span>
                        <span className={s.duedate}>
                        <strong>Due: </strong>{dateFormat(assignmentDue, "dddd, mmmm dS, yyyy")}
                        </span>
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
