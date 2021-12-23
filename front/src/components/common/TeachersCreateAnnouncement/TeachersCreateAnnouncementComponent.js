import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import TeacherCreateAnnouncement from '../../../apis/TeacherCreateAnnouncement'
import s from "./TeachersCreateAnnouncementComponent.module.css"


export default function TeachersCreateAnnoucementComponent() {
    let navigate = useNavigate()
    const recentlySelectedCourseID = localStorage.getItem("recently-selected-course")
    
    const [inputs, setInputs] = useState({
        course_id:recentlySelectedCourseID,
        title:"",
        description:"",
        postDate:"",
        materialLink:"",
        
       
    })

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const { course_id, title, description,  postDate, materialLink } = inputs;
    
    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const res = await TeacherCreateAnnouncement.post(`/new`, {
                course_id,
                announcement_title: title,
                announcement_description: description,
                announcement_post_date: postDate,
                announcement_material_link: materialLink
                
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
                                Announcement Title
                                </label>
                                <input className={s.shortinput} type="text" name="title" placeholder="Enter your title" value={title} onChange={e => onChange(e)} />
                            </div>
                            <div className={s.inputcontainer}>
                                <label className={s.inputtitle}>
                                Announcement Description
                                </label>
                                <input className={s.shortinput} type="text" name="description" placeholder="Ex: 'Mid-terms quiz on Unit 5'" value={description} onChange={e => onChange(e)} />
                            </div>
                            <div className={s.inputcontainer}>
                                <label className={s.inputtitle}>
                                Announcement Material Link
                                </label>
                                <input className={s.shortinput} type="text" name="materialLink" placeholder="https://nasa.com/important-article" value={materialLink} onChange={e => onChange(e)} />
                            </div>
                            <div className={s.inputcontainer}>
                                <label className={s.inputtitle}>
                                Post Date
                                </label>
                                <input className={s.shortinput} type="date" name="postDate"  value={postDate} onChange={e => onChange(e)} />
                            </div>
            
                     <button>Create Announcement</button>
                        </form>
                    </div>
                </div>
            </div>

    )
}
