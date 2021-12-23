import React, {useEffect} from 'react'
import s from "./AssignmentsCard.module.css"
import dateFormat,{masks} from 'dateformat'

export default function AssignmentsCard({
    item
}) {

    
    return (
        <div className={s.card}>
           <div className={s.textbox}>
               <div className={s.titlebox}>
                   <span className={s.titlelabel}>
                       ASSIGNMENT
                   </span>
                    <span className={s.title}>
                        {item.assignment_title}
                    </span>
               </div>
               <div className={s.dates}>
                    <span className={s.due}>
                        <strong>Due: </strong>{dateFormat(item.assignment_due_date, "dddd, mmmm dS, yyyy")}
                    </span>
               </div>
           </div>
        </div>
    )
}
