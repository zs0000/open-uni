import React, { useState, useEffect, useContext } from 'react'
import { useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router'

import DashboardApi from '../apis/DashboardApi'
import GrabClassDetails from '../apis/GrabClassDetails'
import QuestionController from '../apis/QuestionController'
import { CourseContext } from '../context/CourseContext'
import { UsersContext } from '../context/UsersContext'
import s from "../styles/CreateAQuestionPage.module.css"


export default function CreateAQuestionPage() {
    let navigate = useNavigate()
    let { course_id } = useParams()
    let baseStatus = true;
    const recentlySelectedCourseID = localStorage.getItem("recently-selected-course")
    const {usersFirstName, setUsersFirstName} = useContext(UsersContext)
    const {usersLastName, setUsersLastName} = useContext(UsersContext)
    const {usersUsername, setUsersUsername} = useContext(UsersContext)
    const {courseTitle, setCourseTitle} = useContext(CourseContext)
    const {courseTag, setCourseTag} = useContext(CourseContext)
    const options = {
        headers : {'token': localStorage.getItem("token")}
    }
    
    const queryClient = useQueryClient()


        const fetchClassData = async () => {
        try {
            const res = await queryClient.fetchQuery(`${course_id}-data`, ()=> GrabClassDetails.get(`/retrieve/${course_id}`,{
                cacheTime: Infinity,
                staleTime: Infinity
            }))
            setCourseTitle(res.data.data.courseDetails[0].course_title)
            setCourseTag(res.data.data.courseDetails[0].course_tag)
          
        } catch (err) {
            console.error(err.message)
        }
    }

        const fetchUserData = async() =>{
                try {
                    const userData = await queryClient.fetchQuery('user-data', () => DashboardApi.get("/", options), {
                        cacheTime: Infinity,
                        staleTime: Infinity
                    })
                    setUsersFirstName(userData.data.user_firstname)
                    setUsersLastName(userData.data.user_lastname)
                   
                    setUsersUsername(userData.data.user_username)
                    
                } catch (err) {
                    console.error(err.message)
                }
        }

    useEffect(()=> {
        fetchUserData()
        fetchClassData()
    },[])


    const [inputs, setInputs] = useState({
        title:"",
        description:"",
    })

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const { title, description } = inputs;
    
    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const res = await QuestionController.post(`/new/${usersFirstName + " " + usersLastName}/${usersUsername}/${courseTitle}/${baseStatus}/${course_id}`, {
                question_title: title,
                question_content: description,
            })
            if(res) {
                navigate(`/view/${recentlySelectedCourseID}`, { replace: true })
            }
        } catch (err) {
            console.error(err.message)
        }
    }


    const handleClick = async(e) => {
        navigate(`/view/${recentlySelectedCourseID}`, { replace: true })
    }
    
    return (

            <div className={s.main}>
                 <div className={s.backbuttonbox}>
                        <button className={s.backbutton} onClick={e => handleClick(e)}>
                           / Back to previous page
                        </button>
                    </div>
                <div className={s.responsive}>
                   
                    <div className={s.content}>
                        <form className={s.inputsform} onSubmit={onSubmitForm}>
                            <div className={s.inputcontainer}>
                                <label className={s.inputtitle}>
                                Question Title
                                </label>
                                <input className={s.shortinput} type="text" name="title" placeholder="Ex: Formatting the new Essay" value={title} onChange={e => onChange(e)} />
                            </div>
                            <div className={s.inputcontainer}>
                                <label className={s.inputtitle}>
                                Detailed Question
                                </label>
                                <input className={s.shortinput} type="text" name="description" placeholder="Enter details and extra comments here." value={description} onChange={e => onChange(e)} />
                            </div>
                     <button>Create Question</button>
                        </form>
                    </div>
                </div>
            </div>

    )
}
