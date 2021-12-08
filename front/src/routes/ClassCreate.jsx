import React, { Fragment, useState, useEffect, useContext } from 'react'
import { UsersContext } from '../context/UsersContext'
import s from "../styles/ClassCreate.module.css"
import ClassCreateApi from "../apis/ClassCreateApi"

export default function ClassCreate({setAuth}) {
    const teacherPersist = localStorage.getItem("username")
    const {users, setUser} = useContext(UsersContext)
    const {usersFirstName, setUsersFirstName} = useContext(UsersContext)
    const {usersLastName, setUsersLastName} = useContext(UsersContext)
    const {usersRole, setUsersRole} = useContext(UsersContext)
    const [inputs, setInputs] = useState({
        course_title:"",
        course_description:"",
        course_category:"",
        course_capacity:"",
        course_tag:""
    })

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const { course_title, course_description, course_category, course_capacity, course_tag } = inputs;

    const onSubmitData = async(e) => {
        e.preventDefault()
        try {
            const response = await ClassCreateApi.post('/new', {
                professor:usersFirstName + ` ` + usersLastName,
                professor_username: teacherPersist,
                course_title:course_title,
                course_description:course_description,
                course_category:course_category,
                course_capacity:course_capacity,
                course_tag:course_tag
            })
            console.log(response.data.status)
            if(response.data.status === 200 || response.data.status === "success") {
                window.location.reload(true);
            }



        } catch (err) {
            console.error(err.message)
        }
    }

    return (
  
        <Fragment>
            <div className={s.main}>
                <div className={s.responsive}>
                    <div className={s.content}>
                        <form className={s.inputsform}>
                            <div className={s.inputcontainer}>
                                <label className={s.inputtitle}>
                                Course Title
                                </label>
                                <input className={s.shortinput} type="text" name="course_title" placeholder="Enter your title" value={course_title} onChange={e => onChange(e)} />
                            </div>
                            <div className={s.inputcontainer}>
                                <label className={s.inputtitle}>
                                Course Category
                                </label>
                                <input className={s.shortinput} type="text" name="course_category" placeholder="Enter your category" value={course_category} onChange={e => onChange(e)} />
                            </div>
                            <div className={s.inputcontainer}>
                                <label className={s.inputtitle}>
                                Course Description
                                </label>
                                <textarea className={s.tallinput} type="text" name="course_description" placeholder="Enter your description" value={course_description} onChange={e => onChange(e)} />
                            </div>
                            <div className={s.inputcontainer}>
                                <label className={s.inputtitle}>
                                Course Capacity
                                </label>
                                <input className={s.shortinput} type="number" name="course_capacity" max="216" placeholder="Enter max course capacity" value={course_capacity} onChange={e => onChange(e)} />
                            </div>
                            <div className={s.inputcontainer}>
                                <label className={s.inputtitle}>
                                Course Capacity
                                </label>
                                <input className={s.shortinput} type="text" name="course_tag" maxLength="6" placeholder="Enter 6 letter class tag (ex: ENG101)" value={course_tag} onChange={e => onChange(e)} />
                            </div>
            
                     <button onClick={e => onSubmitData(e)}>Create Course</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
