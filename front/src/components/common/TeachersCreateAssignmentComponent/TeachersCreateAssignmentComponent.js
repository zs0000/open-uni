import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import TeacherAssignmentCreateApi from '../../../apis/TeacherAssignmentCreateApi'
import s from "./TeachersCreateAssignmentComponent.module.css"


export default function TeachersCreateAssignmentComponent() {
    let navigate = useNavigate()
    const recentlySelectedCourseID = localStorage.getItem("recently-selected-course")
    
    const [inputs, setInputs] = useState({
        course_id:recentlySelectedCourseID,
        title:"",
        description:"",
        instruction:"",
        startDate:"",
        dueDate:"",
        materialLink:"",
        
       
    })

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const { course_id, title, description, instruction, startDate, dueDate, materialLink } = inputs;
    
    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const res = await TeacherAssignmentCreateApi.post(`/new`, {
                course_id,
                assignment_title: title,
                assignment_description: description,
                assignment_instruction: instruction,
                assignment_start_date: startDate,
                assignment_due_date: dueDate,
                assignment_material_link: materialLink
                
            })
            console.log(res)
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
                                Assignment Title
                                </label>
                                <input className={s.shortinput} type="text" name="title" placeholder="Enter your title" value={title} onChange={e => onChange(e)} />
                            </div>
                            <div className={s.inputcontainer}>
                                <label className={s.inputtitle}>
                                Assignment Description
                                </label>
                                <input className={s.shortinput} type="text" name="description" placeholder="Ex: 'Mid-terms quiz on Unit 5'" value={description} onChange={e => onChange(e)} />
                            </div>
                            <div className={s.inputcontainer}>
                                <label className={s.inputtitle}>
                                Assignment Material Link
                                </label>
                                <input className={s.shortinput} type="text" name="materialLink" placeholder="https://nasa.com/important-article" value={materialLink} onChange={e => onChange(e)} />
                            </div>
                            <div className={s.inputcontainer}>
                                <label className={s.inputtitle}>
                                Assingment Instruction
                                </label>
                                <textarea className={s.tallinput} type="text" name="instruction" placeholder="Enter assignment instruction" value={instruction} onChange={e => onChange(e)} />
                            </div>
                            <div className={s.inputcontainer}>
                                <label className={s.inputtitle}>
                                Starting Date
                                </label>
                                <input className={s.shortinput} type="date" name="startDate" max="216" placeholder="Enter start date" value={startDate} onChange={e => onChange(e)} />
                            </div>
                            <div className={s.inputcontainer}>
                                <label className={s.inputtitle}>
                                Due Date
                                </label>
                                <input className={s.shortinput} type="date" name="dueDate" max="216" placeholder="Enter start date" value={dueDate} onChange={e => onChange(e)} />
                            </div>
                            
            
                     <button>Create Assignment</button>
                        </form>
                    </div>
                </div>
            </div>

    )
}
