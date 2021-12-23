import React , {Fragment}from 'react'
import StudentsClassesComponent from '../StudentsClassesComponent/StudentsClassesComponent'

import s from "./StudentDashboard.module.css"



export default function StudentDashboard({
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
                    <div className={s.placeholder}>
                        <StudentsClassesComponent
                        usersFullName={usersFullName}
                        usersFirstName={usersFirstName}
                        usersLastName={usersLastName}
                        usersRole={usersRole}
                        users={users} />    
                    </div>
                </div>
                <div className={s.right}>
                    <div>
                            
                    </div>
                </div>
                </div>
            </div>
        </div>
        </Fragment>
    )
}
