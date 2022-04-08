import React from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import GrabProfileDataApi from "../../../apis/GrabProfileDataApi";
import s from "./StudentCard.module.css"


export default function StudentCard({item}){

    let navigate = useNavigate()
    let queryClient = useQueryClient()

    const handleStudentSelect = async(item) => {
        const prefetchUserData = await queryClient.prefetchQuery(`${item.user_username}-profile-data`, () => GrabProfileDataApi.get(`/user_data/${item.user_username}`));
        const prefetchUserCourses = await queryClient.prefetchQuery(`${item.user_username}-profile-data`, () => GrabProfileDataApi.get(`/user_courses/${item.user_username}`));
        navigate(`/profile/${item.user_username}`, { replace: true })
    }
  

    return(
        <div className={s.card} onClick={() => handleStudentSelect(item) }>
            <div className={s.picturebox}>
                <img className={s.picture} src="https://res.cloudinary.com/repdb/image/upload/v1646334254/pxtcouhaxx9jo95e8q6m.png" />
            </div>
            <div className={s.textbox}>
                <div className={s.usernamebox}>
                    <span className={s.username}>
                        {item.user_username}
                    </span>
                </div>
                <div className={s.studentnamebox}>
                
                </div>
            </div>
        </div>
    )
}