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
import GrabAnnouncements from '../apis/GrabAnnouncements';


export default function ClassAnnouncements() {
    
    const queryClient = useQueryClient()
    const {announcementsList, setAnnouncements} = useContext(CourseContext)
    let navigate = useNavigate()
    let { course_id } = useParams()
    let newArray = [];
    const { isLoading, data, isError } = useQuery(`${course_id}-assignments`, () =>  GrabClassDetails.get(`/announcements/${course_id}`))  

    const userData = queryClient.getQueryData(`user-data`)

    const handleAnnouncementSelect = async(announcement_id) => {

        const prefetchAnnouncementData = await queryClient.prefetchQuery(`${course_id}-${announcement_id}-data`, () => GrabAnnouncements.get(`/${course_id}/${announcement_id}`), {
            staleTime: Infinity,
            cacheTime: Infinity,
        } )
        navigate(`/announcements/${course_id}/${announcement_id}`, {replace:true})
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
        for(let i = 0; i < announcementsList.length; i++){
            newArray.push(announcementsList[i])
            
        }
        var reversedArray = newArray.reverse()
       
      
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
                            Current Announcements
                        </h2>
                    </div>
                    {reversedArray.map((item) => (
                <div className={s.card} onClick={() => handleAnnouncementSelect(item.announcement_id)}>
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

    for(let i = 0; i < announcementsList.length; i++){
        newArray.push(announcementsList[i])
        
    }
    var reversedArray = newArray.reverse()
  
    
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
                    {reversedArray.map((item) => (
                <div className={s.card} onClick={() => handleAnnouncementSelect(item.announcement_id)}>
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
