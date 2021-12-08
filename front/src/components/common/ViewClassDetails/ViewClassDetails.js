import { useContext, useEffect } from "react"
import StudentsJoinClassApi from "../../../apis/StudentsJoinClassApi"
import UserCheck from "../../../apis/UserCheck"
import { CourseContext } from "../../../context/CourseContext"
import { UsersContext } from "../../../context/UsersContext"
import s from "./ViewClassDetails.module.css"

export default function ViewClassDetails({professor, courseIdentifier, courseTitle, courseDescription, courseCategory, courseTag, courseCapacity}) {
    
    const {enrolled, setEnrolled} = useContext(CourseContext)
    const userPersist = localStorage.getItem("username")
    const {usersRole, setUsersRole} = useContext(UsersContext);
    const rolePersist = localStorage.getItem("is-user")
    const studentsFirstName = localStorage.getItem("first-name")
    const studentsLastName = localStorage.getItem("last-name")

    const handleJoinClass = async(e) => {
        try {
            const joinRequest = await StudentsJoinClassApi.post(`/${courseIdentifier}/${userPersist}/${studentsFirstName}/${studentsLastName}`)
            setEnrolled(true)
            console.log(joinRequest)
        } catch (err) {
            console.log("error joining class")

        }
    }

    

    useEffect(()=>{
        const checkIfEnrolled = async() => {
            try {
                const res = await UserCheck.get(`/${courseIdentifier}/${userPersist}`)
                if(res.data.data.users.length === 0){
                    setEnrolled(false);
                }
                if(!res.data.data.users.length === 0){
                    setEnrolled(true)
                }
                console.log(res)

            } catch (err) {
                console.error(err.message)
            }
        }
        checkIfEnrolled();
    },[])
   
    if(enrolled === false && rolePersist === 'user'){
        return(
            <div className={s.main}>
            <div className={s.responsive}>
                <div className={s.content}>
                <div className={s.top}>
                <div className={s.titlebox}>
                    <h2 className={s.title}>
                    {courseTitle}
                    </h2>
                    <p>
                        not enrolled
                    </p>
                    <button className={s.button} onClick={e => handleJoinClass(e)} >
                        Join Class
                    </button>
                </div>
                </div>
                <div className={s.left}>

                </div>
                <div className={s.right}>
                    
                </div>
                </div>
            </div>
        </div>
        )
    }

    return (
        <div className={s.main}>
            <div className={s.responsive}>
                <div className={s.content}>
                <div className={s.top}>
                <div className={s.titlebox}>
                    <h2 className={s.title}>
                    {courseTitle}
                    </h2>
                </div>
                </div>
                <div className={s.left}>

                </div>
                <div className={s.right}>
                    
                </div>
                </div>
            </div>
        </div>
    )
}
