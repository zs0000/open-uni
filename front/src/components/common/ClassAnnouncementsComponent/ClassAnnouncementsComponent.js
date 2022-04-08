import React, { useContext, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router'
import GrabClassDetails from '../../../apis/GrabClassDetails'
import { CourseContext } from '../../../context/CourseContext'
import LoadingPage from '../LoadingPage/LoadingPage'
import s from "./ClassAnnouncementsComponent.module.css"
import AnnouncementsCard from "../AnnouncementsCard/AnnouncementsCard"
import GrabAnnouncements from '../../../apis/GrabAnnouncements'

export default function ClassAnnouncementsComponent() {

    let queryClient = useQueryClient()
    let navigate = useNavigate
    let { course_id } = useParams()    
    const {announcementsList, setAnnouncements} = useContext(CourseContext)

    let blankData = 
         {
          "announcement_title":"No Announcements",
          "announcement_description":"Currently this class does not have any announcements posted. Check back periodically to check for updates.",
          "announcement_date":"01/03/1337"
        }
       
    

    const { isLoading, data, isError } = useQuery(`${course_id}-announcements`, () =>  GrabAnnouncements.get(`/grab/recent/${course_id}`))  
    const handleAnnouncementSelect = async(announcement_id) => {

        const prefetchAnnouncementData = await queryClient.prefetchQuery(`${course_id}-${announcement_id}-data`, () => GrabAnnouncements.get(`/${course_id}/${announcement_id}`), {
            staleTime: Infinity,
            cacheTime: Infinity,
        } )
        navigate(`/announcements/${course_id}/${announcement_id}`, {replace:true})
    }

    const {recentAnnoucement, setRecentAnnouncement} = useContext(CourseContext)
 
    if(isLoading) {
        return(<div>
            Fetching recent annoucement...
        </div>)
    }

  if(announcementsList !== undefined && announcementsList.length > 0 ){


      return(
          <div className={s.main}>
              <div className={s.content}>
              <AnnouncementsCard item={data.data.data.announcements}  />
                  
              </div>
          </div>
      )
  }

    return (
        
      
        <div className={s.main}>
            <div className={s.content}>
            <AnnouncementsCard item={blankData}/>
            </div>
        </div>
    )
}
