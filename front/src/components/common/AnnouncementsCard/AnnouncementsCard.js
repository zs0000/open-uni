import React, {useEffect} from 'react'
import s from "./AnnouncementsCard.module.css"
import dateFormat,{masks} from 'dateformat'

export default function AnnouncementsCard({
    item
}) {

    
    return (
        <div className={s.card}>
           <div className={s.textbox}>
               <div className={s.titlebox}>
                   <span className={s.titlelabel}>
                       ANNOUNCEMENT
                   </span>
                   
                    <span className={s.title}>
                        {item.announcement_title}
                    </span>
               </div>
               <div className={s.descriptionbox}>
                   <p className={s.description}>
                       {item.announcement_description}
                   </p>
               </div>
               <div className={s.dates}>
                    <span className={s.due}>
                        <strong>Posted: </strong>{dateFormat(item.announcement_due_date, "dddd, mmmm dS, yyyy")}
                    </span>
               </div>
           </div>
        </div>
    )
}
