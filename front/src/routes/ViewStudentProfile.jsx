import React, { useState, useEffect, useContext } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import GrabProfileDataApi from '../apis/GrabProfileDataApi';
import { SelectedUserContext } from '../context/SelectedUserContext';
import { useParams } from "react-router"
import s from "../styles/ViewStudentProfile.module.css"
import DashboardApi from '../apis/DashboardApi';
import { UsersContext } from '../context/UsersContext';
import MessagesApi from "../apis/MessagesApi"


export default function ViewStudentProfile(){
    
    let { user_username } = useParams()
    let navigate = useNavigate()
    let queryClient = useQueryClient()


    const [loadedUserData, setLoadedUserData] = useState(false);
    const [loadedUserCourses, setLoadedUserCourses] = useState(false);

    const {selectedUser, setSelectedUser} = useContext(SelectedUserContext)    
    const {selectedUsersUsername, setSelectedUsersUsername} = useContext(SelectedUserContext) 
    const {selectedUsersRole, setSelectedUsersRole} = useContext(SelectedUserContext) 
    const {selectedUsersFirstName, setSelectedUsersFirstName} = useContext(SelectedUserContext) 
    const {selectedUsersLastName, setSelectedUsersLastName} = useContext(SelectedUserContext) 
    const {selectedUsersCourses, setSelectedUsersCourses} = useContext(SelectedUserContext) 
    
    const {users, setUser} = useContext(UsersContext)
    const {usersRole, setUsersRole} = useContext(UsersContext)
    const {usersFirstName, setUsersFirstName} = useContext(UsersContext)
    const {usersLastName, setUsersLastName} = useContext(UsersContext)
    const {usersFullName, setUsersFullName} = useContext(UsersContext)
    
    const [username, setUsername] = useState("")


    const options = {
        headers : {'token': localStorage.getItem("token")}
    }

    const handleClickMessage = async() => {
        try {
            const messageUser = await MessagesApi.post(`/create/${users}/${user_username}/${users}${user_username}`)
            navigate(`/inbox/${users}${user_username}`, {replace:true})
            console.log(messageUser)
            
        } catch (err) {
            console.error(err.message)
            navigate(`/inbox/${users}${user_username}`, {replace:true})
        }
    }

    //on mount, grab all user data (ex: First and last name,) and all enrolled courses.

    useEffect(()=>{
        
        const fetchLoggedInUser = async() => {
            try {
                
                const loggedInUserData = await queryClient.fetchQuery('user-data', () => DashboardApi.get("/", options), {
                    cacheTime: Infinity,
                    staleTime: Infinity,
                })

                if(loggedInUserData) {
                    setUsername(loggedInUserData.data.user_username)
                    setUsersRole(loggedInUserData.data.user_role)
                    setUser(loggedInUserData.data.user_username)

                    console.log(users)
                }

            } catch (err) {
                console.error(err.message)
            }
        }

        const fetchSelectedUserData = async() =>{
            try {
                const selectedUserData = await queryClient.fetchQuery(`${user_username}-profile-data`, () => GrabProfileDataApi.get(`/user_data/${user_username}`))
                
                if(selectedUserData) {
                    
                    setSelectedUsersFirstName(selectedUserData.data.data.userdata[0].user_firstname)
                    setSelectedUsersLastName(selectedUserData.data.data.userdata[0].user_lastname)
                    
                 

                    setLoadedUserData(true)
                }
                
            } catch (err) {
                console.error(err.message)
            }
        }
        
        const fetchSelectedUserCourses = async() => {
            try {
                const selectedUserCoursesList = await queryClient.fetchQuery(`${user_username}-course-data`, () => GrabProfileDataApi.get(`/user_courses/${user_username}`))

                if(selectedUserCoursesList) {
                    setSelectedUsersCourses(selectedUserCoursesList.data.data.usercourses.length)
                    
                    setLoadedUserCourses(true)
                }

            } catch (err) {
                console.error(err.message)
            }
        }
        fetchLoggedInUser();
        fetchSelectedUserData();
        fetchSelectedUserCourses();
    },[]) 
    
    return(
        <div className={s.main}>
            <div className={s.content}>
                            <div className={s.profiletopbox}>
                            <div className={s.buttonbox}>
                                    <button className={s.button} onClick={() => handleClickMessage()} >
                                        Message
                                    </button>
                                </div>
                                <div className={s.picturebox}>
                                <img className={s.picture} src="https://res.cloudinary.com/repdb/image/upload/v1646334254/pxtcouhaxx9jo95e8q6m.png" />
                                </div>
                                <span className={s.username}>
                                   @{user_username}
                                </span>
                                <span className={s.fullname}>
                                    {selectedUsersFirstName + " " + selectedUsersLastName}
                                </span>
                                
                            </div>
                            <div className={s.profilemiddlebox}>
                                <div className={s.enrolledbox}>
                                    <span className={s.enrolled}>
                                        {selectedUsersCourses}
                                    </span>
                                </div>
                            </div>
            </div>
        </div>
    )
}