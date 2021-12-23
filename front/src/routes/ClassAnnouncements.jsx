import React, { Fragment, useEffect, useState, useContext } from 'react'
import GrabClassDetails from '../apis/GrabClassDetails'
import { CourseContext } from '../context/CourseContext';
import s from "../styles/ClassAnnouncements.module.css"
import dateFormat, { masks } from "dateformat";
import { useNavigate, useParams } from 'react-router';
import TeachersSidebar from '../components/common/TeachersSidebar/TeachersSidebar';
import { useQuery, useQueryClient } from 'react-query';
import StudentsSidebar from '../components/common/StudentsSidebar/StudentsSidebar';
import GrabAssignmentDetails from "../apis/GrabAssignmentDetails"


export default function ClassAnnouncements() {
    
    const queryClient = useQueryClient()
    const {announcementsList, setAnnouncements} = useContext(CourseContext)
    let navigate = useNavigate()
    let { course_id } = useParams()
    
    const { isLoading, data, isError } = useQuery(`${course_id}-assignments`, () =>  GrabClassDetails.get(`/announcements/${course_id}`))  

    const userData = queryClient.getQueryData(`user-data`)

    const handleAnnouncementSelect = async(announcement_id) => {

        const prefetchAnnouncementData = await queryClient.prefetchQuery(`${course_id}-${announcement_id}-data`, () => GrabAssignmentDetails.get(`/${course_id}/${announcement_id}`), {
            staleTime: Infinity,
            cacheTime: Infinity,
        } )
        navigate(`/announcements/${course_id}/${announcement_id}`)
    }

    
    useEffect(()=> {
        const fetchAnnouncements = async() => {
            try {
                
                const res = await GrabClassDetails.get(`/announcements/${course_id}`)
                
                setAnnouncements(res.data.data.announcements)
   
        
         
            } catch (err) {
                console.error(err.message)
            }
        }
        fetchAnnouncements()
    },[])    
        
    if(userData === undefined) {

       
        navigate(`/view/${course_id}`)

        return(
            <div>
                Please try accessing this page again. Sorry for the inconvienience.
            </div>
        )
    }

    if(userData.data.user_role === "user") {
        return (
            <Fragment>
            <div className={s.main}>
                   <div className={s.responsive}>
                <div className={s.content}>
                    <div className={s.sidebar}>
                    <StudentsSidebar
                    
                    />
                    </div>
                    <div className={s.right}>
                <div className={s.toptitlebox}>
                        <h2 className={s.toptitle}>
                            Current Assignments
                        </h2>
                    </div>
            {announcementsList.map((item) => (
                <div className={s.card} onClick={() => handleAnnouncementSelect(item.announcement_id)}>
                    <div className={s.textbox}>
                    <div className={s.titlebox}>
                    <span className={s.title}>
                    {item.assignment_title}
                    </span>
                    </div>
                    <div className={s.descriptionbox}>
                    <span className={s.description}>
                    {item.assignment_description}
                    </span>
                    </div>
                    </div>
                    <div className={s.dates}>
                        <div className={s.startdate}>
                            <span className={s.start}>
                            <strong>Assigned: </strong>{dateFormat(item.announcement_start_date, "dddd, mmmm dS, yyyy")}
                            </span>
                        </div>
                        <div className={s.duedate}>
                            <span className={s.due}>
                            <strong>Due: </strong>{dateFormat(item.announcement_due_date, "dddd, mmmm dS, yyyy")}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
            </div>
                </div>
                </div>
            </div>
        </Fragment>
        )
    }



    return (

        <Fragment>
            <div className={s.main}>
                   <div className={s.responsive}>
                <div className={s.content}>
                    <div className={s.sidebar}>
                    <TeachersSidebar 
                    
                    
                    />
                    </div>
                    <div className={s.right}>
                <div className={s.toptitlebox}>
                        <h2 className={s.toptitle}>
                            Current Announcements
                        </h2>
                    </div>
            {announcementsList.map((item) => (
                <div className={s.card}>
                    <div className={s.textbox}>
                    <div className={s.titlebox}>
                    <span className={s.title}>
                    {item.announcement_title}
                    </span>
                    </div>
                    <div className={s.descriptionbox}>
                    <span className={s.description}>
                    {item.announcement_description}
                    </span>
                    </div>
                    </div>
                    <div className={s.dates}>
                        <div className={s.startdate}>
                            <span className={s.start}>
                            {dateFormat(item.announcement_start_date, "dddd, mmmm dS, yyyy")}
                            </span>
                        </div>
                        <div className={s.duedate}>
                            <span className={s.due}>
                            {dateFormat(item.announcement_due_date, "dddd, mmmm dS, yyyy")}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
            </div>
                </div>
                </div>
            </div>
        </Fragment>
    )
}
