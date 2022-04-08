import React , {Fragment}from 'react'
import MessagesComponent from '../MessagesComponent/MessagesComponent'
import StudentsClassesComponent from '../StudentsClassesComponent/StudentsClassesComponent'
import TeachersClassesComponent from '../TeachersClassesComponent/TeachersClassesComponent'

import s from "./TeachersDashboard.module.css"



export default function TeachersDashboard({
    usersFirstName,
    usersLastName,
    usersFullName,
    usersRole,
    users
}) {

   

    return (
        <Fragment> 
        <div className={s.main}>
            <div className={s.responsive}>
                <div className={s.content}>
                <div className={s.left}>
                    <>
                    </>
                    <div className={s.placeholder} >
                       <TeachersClassesComponent/>
                                <div className={s.messages}>
                    <MessagesComponent users={users} />
                    </div>
                    </div>
                    
                </div>
                <div className={s.right}>
                    
                </div>
                </div>
            </div>
        </div>
        </Fragment>
    )
}
