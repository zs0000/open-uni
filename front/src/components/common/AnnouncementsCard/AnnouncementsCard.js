import React, {useEffect} from 'react'
import s from "./AnnouncementsCard.module.css"
import dateFormat,{masks} from 'dateformat'
import { useNavigate, useParams } from 'react-router'
import { useQueryClient } from 'react-query'
import GrabAnnouncements from '../../../apis/GrabAnnouncements'

export default function AnnouncementsCard({
    item

}) {

    let {course_id} = useParams()

    let queryClient = useQueryClient();

    let navigate = useNavigate()

    const handleAnnouncementsCardClick = async(announcement_id) => {

        const prefetchAnnouncementData = await queryClient.prefetchQuery(`${course_id}-${announcement_id}-data`, () => GrabAnnouncements.get(`/${course_id}/${announcement_id}`), {
            staleTime: Infinity,
            cacheTime: Infinity,
        } )
        navigate(`/announcements/${course_id}/${announcement_id}`, {replace:true})
    }

    return (
        <div className={s.card} onClick={() => handleAnnouncementsCardClick(item.announcement_id)}>
           <div className={s.textbox}>
               <div className={s.titlebox}>
                   <span className={s.titlelabel}>
                       ANNOUNCEMENT
                   </span>
                   
                    <span className={s.title}>
                        {item.announcement_title ? item.announcement_title : "Fetching announcement..." }
                    </span>
               </div>
               <div className={s.descriptionbox}>
                   <p className={s.description}>
                       {item.announcement_description ?  item.announcement_description : "Fetching announcement description"  }
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
