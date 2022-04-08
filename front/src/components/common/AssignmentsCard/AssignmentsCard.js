import React, {useEffect} from 'react'
import s from "./AssignmentsCard.module.css"
import dateFormat,{masks} from 'dateformat'
import { useNavigate, useParams } from 'react-router';
import { useQueryClient } from 'react-query';
import GrabAssignmentDetails from '../../../apis/GrabAssignmentDetails';

export default function AssignmentsCard({
    item
}) {
    let {course_id} = useParams()

    let queryClient = useQueryClient();

    let navigate = useNavigate()

    const handleAssignmentsCardClick = async(assignment_id) => {

        const prefetchAssignmentData = await queryClient.prefetchQuery(`${course_id}-${assignment_id}-data`, () => GrabAssignmentDetails.get(`/${course_id}/${assignment_id}`), {
            staleTime: Infinity,
            cacheTime: Infinity,
        } )
        navigate(`/assignments/${course_id}/${assignment_id}`, {replace:true})
    }
    
    return (
        <div className={s.card} onClick={() => handleAssignmentsCardClick(item.assignment_id)}>
           <div className={s.textbox}>
               <div className={s.titlebox}>
                   <span className={s.titlelabel}>
                       ASSIGNMENT
                   </span>
                    <span className={s.title}>
                        {item.assignment_title ? item.assignment_title : "Fetching assignments..." }
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
