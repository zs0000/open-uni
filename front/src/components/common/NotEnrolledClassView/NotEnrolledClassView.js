import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router'
import StudentsJoinClassApi from '../../../apis/StudentsJoinClassApi'
import { CourseContext } from '../../../context/CourseContext'
import { UsersContext } from '../../../context/UsersContext'
import s from "./NotEnrolledClassView.module.css"
import DashboardApi from '../../../apis/DashboardApi'
import GrabClassDetails from '../../../apis/GrabClassDetails'
import UserCheck from '../../../apis/UserCheck'


export default function NotEnrolledClassView({setAuth}) {
    let navigate = useNavigate()
    let { course_id } = useParams()
    let userPersist = localStorage.getItem("username")

    const [test, setTest] = useState()
    const {enrollable, setEnrollable} = useContext(CourseContext)
    const [currentCount, setCurrentCount] = useState()
    const {enrolled, setEnrolled} = useContext(CourseContext)
    const {usersRole, setUsersRole} = useContext(UsersContext);
    const {usersFirstName, setUsersFirstName} = useContext(UsersContext)
    const {usersLastName, setUsersLastName} = useContext(UsersContext)
    const {usersUsername, setUsersUsername} = useContext(UsersContext)
    const [loaded, setLoaded] = useState(false)
    const {professor, setProfessor} = useContext(CourseContext)
    const [teach, setTeach] = useState(false)
    const {courseTitle, setCourseTitle} = useContext(CourseContext)
    const {courseDescription, setCourseDescription} = useContext(CourseContext)
    const {courseCapacity, setCourseCapacity} = useContext(CourseContext)
    const {courseTag, setCourseTag} = useContext(CourseContext)
    const options = {
        headers : {'token': localStorage.getItem("token")}
    }
    
    const courseUserCombo = course_id + userPersist;

    
    
    const handleJoinClass = async(e) => {
        try {
            const joinRequest = await StudentsJoinClassApi.post(`/${course_id}/${usersUsername}/${usersFirstName}/${usersLastName}/${courseUserCombo}/${courseTag}/${courseTitle}/${professor}`)
            navigate(`/view/${course_id}`, { replace: true })
            setEnrolled(true)
            setEnrollable(false)
        } catch (err) {
            console.log("error joining class")

        }
    }
    const queryClient = useQueryClient()
    const fetchEnrollability = async() => {
        try {
            const res = await queryClient.fetchQuery(`${course_id}-enrollable`, ()=>GrabClassDetails.get(`/check/${course_id}`,{
                cacheTime: 100000,
            }))
            const studentCount = res.data.data.students.length
           console.log(res)
            if(studentCount === courseCapacity) {
                setEnrollable(false)
            }
            
            setCurrentCount(studentCount)
            setEnrollable(true)

        } catch (err) {
            console.error(err.message)
        }
    }
    const fetchUserData = async() =>{
        try {
            const userData = await queryClient.fetchQuery('user-data', () => DashboardApi.get("/", options), {
                cacheTime: Infinity,
                staleTime: Infinity,
            })
            setUsersFirstName(userData.data.user_firstname)
            setUsersLastName(userData.data.user_lastname)
            setUsersRole(userData.data.user_role)
            setUsersUsername(userData.data.user_username)
            if(usersRole === "teacher") {
                setTeach(true)
            }
        } catch (err) {
            console.error(err.message)
        }
}

const fetchEnrolledStatus = async () => {
    try {
        const res = await queryClient.fetchQuery(`${course_id}${userPersist}`, ()=>UserCheck.get(`/${course_id}/${userPersist}`,{
            cacheTime: 100000,
        }))

        console.log(res)
        if(res.data.data.users.length === 0) {
            setEnrolled(false)
        }
        if(res.data.data.users.length > 0) {
            setEnrolled(true)
            navigate(`/view/${course_id}`, { replace: true })
        }
      
    } catch (err) {
        console.error(err.message)
    }
}
const fetchClassData = async () => {
    try {
        const res = await queryClient.fetchQuery(`${course_id}-data`, ()=>GrabClassDetails.get(`/retrieve/${course_id}`,{
            cacheTime: 100000,
        }))
        setCourseTitle(res.data.data.courseDetails[0].course_title)
        setCourseDescription(res.data.data.courseDetails[0].course_description)
        setCourseTag(res.data.data.courseDetails[0].course_tag)
        setCourseCapacity(res.data.data.courseDetails[0].course_capacity)
        setProfessor(res.data.data.courseDetails[0].professor)
    } catch (err) {
        console.error(err.message)
    }
}

    useEffect(()=> {
        fetchEnrollability()
        fetchEnrolledStatus()
        fetchUserData()
        fetchClassData()

     
    },[])
    if(enrolled === true) {
        navigate(`/view/${course_id}`)
    }
    if(teach === true) {
        navigate(`/view/${course_id}`, {replace:true})
    }



    return (
        <Fragment>
            <div className={s.main}>
                <div className={s.responsive}>
                    <div className={s.content}>
                        <div className={s.text}>
                        <div className={s.titlebox}>
                            <span className={s.courselabel}>Course</span>
                            <h2 className={s.title}>{courseTitle}</h2>
                            
                          
                        </div>
                        <div className={s.descriptionbox}>
                           
                            <p className={s.description}>{courseDescription}</p>
                        </div>
                        </div>
                        <div className={s.enrollbox}>
                            <div className={s.buttonbox}>
                                {enrolled ? <button className={s.button}>Already Enrolled</button> : <button className={s.button} onClick={e => handleJoinClass(e)}>
                                    Join {courseTag}
                                </button>}
                            </div>
                        <div className={s.cap}>
                    <span >
                
                    </span>
                    <span>

                    </span>
                </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
