import React, { Fragment, useEffect, useContext,useState } from 'react'
import { Navigate, Outlet, useParams } from 'react-router'
import { CourseContext } from '../context/CourseContext'
import GrabClassDetails from '../apis/GrabClassDetails'
import ViewClassDetails from '../components/common/ViewClassDetails/ViewClassDetails'
import { useQuery, useQueryClient } from 'react-query'
import LoadingPage from '../components/common/LoadingPage/LoadingPage'
import DashboardApi from '../apis/DashboardApi'
export default function ClassDetails() {

    let { course_id } = useParams()
    let queryClient = useQueryClient();
    
    const [loadedAnnouncements, setLoadedAnnouncements] = useState(false)
    const [loadedAssignments, setLoadedAssignments] = useState(false)
    const {assignmentsList, setAssignments} = useContext(CourseContext)
    const {announcementsList, setAnnouncements} = useContext(CourseContext)
    const {courseTitle, setCourseTitle} = useContext(CourseContext)
    const {courseDescription, setCourseDescription} = useContext(CourseContext)
    const {courseCapacity, setCourseCapacity} = useContext(CourseContext)
    const {courseTag, setCourseTag} = useContext(CourseContext)

 
   


    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const res = await queryClient.fetchQuery(`${course_id}-data`, ()=>GrabClassDetails.get(`/retrieve/${course_id}`,{
                    cacheTime: 100000,
                }))
                setCourseTitle(res.data.data.courseDetails[0].course_title)
                setCourseDescription(res.data.data.courseDetails[0].course_description)
                setCourseTag(res.data.data.courseDetails[0].course_tag)
                setCourseCapacity(res.data.data.courseDetails[0].course_capacity)
              
            } catch (err) {
                console.error(err.message)
            }
        }
        
        const fetchAnnouncementList = async() => {
            try {
               
                const fetchAnnouncements = await queryClient.fetchQuery(`${course_id}-announcements`,() => GrabClassDetails.get(`/announcements/${course_id}`))
                if (fetchAnnouncements) {
                    setAnnouncements(fetchAnnouncements.data.data.announcements)
                
                    setLoadedAnnouncements(true)
              
                }
            } catch (err) {
                console.error(err.message)
            }
        }
        const fetchAssignmentList = async() => {
            try {
                const fetchAssignments = await queryClient.fetchQuery(`${course_id}-assignments`,() => GrabClassDetails.get(`/assignments/${course_id}`))
                if (fetchAssignments) {
                  
                    setAssignments(fetchAssignments.data.data.assignments)
                    setLoadedAssignments(true)
            
                    
                }
            } catch (err) {
                console.error(err.message)
            }
        }
        fetchAssignmentList()
        fetchAnnouncementList();
    },[])


    if(loadedAnnouncements !== true  || loadedAssignments !== true) {
        
        return(
            <div>
                <LoadingPage/>
            </div>
        )
    }


    
        return (
        
            <div className="w-full h-full">
                <ViewClassDetails
                assignments={assignmentsList}
                announcements={announcementsList}
                courseTitle={courseTitle}
                courseDescription={courseDescription}
                courseCapacity={courseCapacity}
                courseTag={courseTag}
                />
            </div>
        )
   
    
}
