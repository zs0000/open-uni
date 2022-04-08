import React, { useContext, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import GrabAnnouncements from '../apis/GrabAnnouncements'
import LoadingPage from '../components/common/LoadingPage/LoadingPage'
import StudentsSidebar from '../components/common/StudentsSidebar/StudentsSidebar'
import { AnnouncementContext } from '../context/AnnouncementContext'
import { CourseContext } from '../context/CourseContext'
import s from "../styles/ViewAnnouncementDetails.module.css"
import dateFormat, { masks } from "dateformat";
import { UsersContext } from '../context/UsersContext'
import DashboardApi from '../apis/DashboardApi'

export default function ViewAnnouncementDetails() {

    let queryClient = useQueryClient()
    let navigate = useNavigate()
    
    let { course_id, announcement_id } = useParams()

    let [loaded, setLoaded] = useState(false)

    const {announcementTitle, setAnnouncementTitle} = useContext(AnnouncementContext)
    const {announcementDescription, setAnnouncementDescription} = useContext(AnnouncementContext)
    const {announcementInstruction, setAnnouncementInstruction} = useContext(AnnouncementContext)
    const {usersRole, setUsersRole} = useContext(UsersContext);
    const {usersFirstName, setUsersFirstName} = useContext(UsersContext)
    const {usersLastName, setUsersLastName} = useContext(UsersContext)
    const {usersUsername, setUsersUsername} = useContext(UsersContext)
    const options = {
        headers : {'token': localStorage.getItem("token")}
    }
    const {announcementLink, setAnnouncementLink} = useContext(AnnouncementContext)

    useEffect(() => {
        const fetchUserData = async() =>{
            try {
                const userData = await queryClient.fetchQuery('user-data', () => DashboardApi.get("/", options), {
                    cacheTime: Infinity,
                    staleTime: Infinity
                })
                setUsersFirstName(userData.data.user_firstname)
                setUsersLastName(userData.data.user_lastname)
                setUsersRole(userData.data.user_role)
                setUsersUsername(userData.data.user_username)
                
            } catch (err) {
                console.error(err.message)
            }
    }
        
        const fetchAnnouncementDetails = async() => {
            try {
                const fetchAnnouncementData = await queryClient.fetchQuery(`${course_id}-${announcement_id}-data`,() => GrabAnnouncements.get(`/${course_id}/${announcement_id}`), {
                    staleTime:Infinity,
                    cacheTime:Infinity,
                })
                setAnnouncementTitle(fetchAnnouncementData.data.data.announcement.announcement_title)
                setAnnouncementDescription(fetchAnnouncementData.data.data.announcement.announcement_description)
                setAnnouncementInstruction(fetchAnnouncementData.data.data.announcement.announcement_instruction)
                
                
                setAnnouncementLink(fetchAnnouncementData.data.data.announcement.announcement_material_link)
                
                if (fetchAnnouncementData) {
                    setLoaded(true)
                }
              
            } catch (err) {
                console.error(err.message)
            }
        }
        fetchUserData();
        fetchAnnouncementDetails();
    },[])


    if (loaded === false){
        
        return(
            <>
            <LoadingPage/>
            </>
        )
    }

 

     
        return (
            <div className={s.main}>
                <div className={s.content}>
                    <div className={s.sidebar}>
                       <StudentsSidebar/>
                    </div>
                    <div className={s.right}>
                       
                            <div className={s.card}>
                               
                        <div className={s.dates}>
                            
                        </div>
                        <div className={s.middle}>
                        
                        <div className={s.titlebox}>
                           
                            <h3 className={s.title}>
                            {announcementTitle}
                            </h3>
                        </div>
                        <div className={s.descriptionbox}>
                       
                            <p className={s.description}>
                                {announcementDescription}
                            </p>
                        </div>
                        </div>
                       
                    
                        <div className={s.materiallinkbox}>
                            <span className={s.material}>
                              <strong>Material Link: </strong>
                            </span>
                            <Link className={s.materiallink} to="https://www.google.com/" target="_blank" rel='noopener noreferrer'>
                                {announcementLink}
                            </Link>
                        </div>
                        
                        </div>
                        
                    </div>
                </div>
            </div>
        )
}