import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import QuestionController from "../apis/QuestionController"
import LoadingPage from "../components/common/LoadingPage/LoadingPage"
import StudentDashboard from "../components/common/StudentDashboard/StudentDashboard"
import StudentsSidebar from "../components/common/StudentsSidebar/StudentsSidebar"
import { CourseContext } from "../context/CourseContext"
import s from "../styles/ViewQuestionPage.module.css"
import dateFormat,{masks} from 'dateformat'
import { UsersContext } from "../context/UsersContext"
import { useQueryClient } from "react-query"
import DashboardApi from "../apis/DashboardApi"

export default function ViewQuestionPage(){

    let { course_id ,question_id} = useParams()
    let navigate = useNavigate()
    let queryClient = useQueryClient()
    let [loadedQuestion, setLoadedQuestion] = useState(false);
    let [loadedAnswers, setLoadedAnswers] = useState(false);
    let [isCreator, setIsCreator] = useState(false)
    let [answered, setAnswered] = useState(false);
    const {creator, setCreator} = useContext(CourseContext)
    const {usersFirstName, setUsersFirstName} = useContext(UsersContext)
    const {usersLastName, setUsersLastName} = useContext(UsersContext)
    const {usersUsername, setUsersUsername} = useContext(UsersContext)
    const {question, setQuestion} = useContext(CourseContext);
    const {replies, setReplies} = useContext(CourseContext);
    const [ inputs, setInputs ] = useState({
        messageText:""
    })
    const { messageText} = inputs;
    const options = {
        headers : {'token': localStorage.getItem("token")}
    }
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]
        : e.target.value})
    }
    const fetchUserData = async() =>{
        try {
            const userData = await DashboardApi.get("/", options)
            console.log(userData)
            setUsersFirstName(userData.data.user_firstname)
            setUsersLastName(userData.data.user_lastname)
           
            setUsersUsername(userData.data.user_username)
            
        } catch (err) {
            console.error(err.message)
        }
}
    const fetchQuestionDetails = async() => {
        try {
            const questionDetails = await QuestionController.get(`/question_details/${question_id}`)
            setQuestion(questionDetails.data.data.question)
            setCreator(questionDetails.data.data.question[0].question_created_by_username)
          
   
            setLoadedQuestion(true)
        } catch (err) {
            console.error(err.message)
        }
    }

    let reservedArray =[]
    const fetchQuestionAnswers = async() => {
        try {
            const questionAnswers = await QuestionController.get(`/grab_answers/${question_id}`)
            setReplies(questionAnswers.data.data.replies)
            
            
           
            
            for(let i = 0; i < replies.length; i++){
                if(replies[i].answer_is_final === true) {
                    reservedArray.pop([i])
                   setAnswered(true)
                    console.log(replies)
                }
            }
            setLoadedAnswers(true)
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(()=>{
        fetchQuestionAnswers()
        fetchUserData()
        fetchQuestionDetails()
    },[])

    if(loadedQuestion === false){
        
        return(
            <LoadingPage/>
        )
    }
    let notATruthy = false;
    let needABoolean = true;
    const handleSolvedButtonClick = async(answer_id) => {
        try {
            const solvedAnswer = await QuestionController.put(`/set_answer/${needABoolean}/${answer_id}`)
            const solvedQuestion = await QuestionController.put(`/set_solved/${notATruthy}/${question_id}`)

            console.log(solvedAnswer)
            console.log(solvedQuestion)
        } catch (err) {
            console.error(err.message)
        }
    }

    const onSubmitForm = async (e) => {
   
        try {
            const body = { messageText };
            const response = await QuestionController.post(`/add_answer/${usersFirstName + " " + usersLastName}/${usersUsername}/${question_id}`, {
               answer_content:messageText,
               
            })
            navigate(`/view/${course_id}`, { replace: true })

  

        } catch (err) {
          
            console.error(err.message)
        
        }
    }

    if(loadedQuestion === false) { 
        return(
            <LoadingPage/>
        )
    }

    return(
        <div className={s.main}>
            <div className={s.content}>
                <div className={s.sidebar}>
                <StudentsSidebar/>
                </div>
                <div className={s.right}>
                <div className={s.questioncontainer}>
                                
                             
                    {question.map((obj) => (
                        <div className={s.question}>
                            
                            <div className={s.questiontitlebox}>
                                <span className={s.questiontitle}>
                                    {obj.question_title}
                                </span>

                                
                                <div className={s.questionsecondarycontainer}>
                                <div className={s.questiondatebox}>
                                   
                                </div>
                                
                                </div>
                            
                                
                            </div>
                            <div className={s.questioncontentbox}>
                            <div className={s.questionnamebox}>
                            <div className={s.picturebox}>
                <img className={s.picture} src="https://res.cloudinary.com/repdb/image/upload/v1646334254/pxtcouhaxx9jo95e8q6m.png" />
            </div>
                                <span className={s.questionname}>
                                    {obj.question_created_by_name}
                                </span>
                                <span className={s.questionusername}>
                                    {"@" + obj.question_created_by_username}
                                </span>
                                <span className={s.questiondate}>
                                        {dateFormat(obj.question_created_on, "dddd, mmmm dS, h:MM TT")}
                                    </span>
                            </div>
                            
                                <span className={s.questioncontent}>
                                    {obj.question_content}
                                </span>
                            </div>
                        </div>
                    ))}
                        
                        {replies.filter(function(reply) {
                        return reply.answer_is_final
                    }).map((reply)=>(
                            <div className={reply.answer_is_final === true ? s.solvedanswer : s.answer}>
                            <div className={s.questioncontentbox}>
                            
                            
                                <span className={s.answercontent}>
                                    {reply.answer_content}
                                </span>
                                <div className={reply.answer_is_final === true ? s.solvedanswernamebox : s.answernamebox}>
                                <div className={s.picturebox}>
                <img className={s.picture} src="https://res.cloudinary.com/repdb/image/upload/v1646334254/pxtcouhaxx9jo95e8q6m.png" />
            </div>
                                <span className={s.questionname}>
                                    {reply.answer_created_by_name}
                                </span>
                                <span className={s.questionusername}>
                                    {"@" + reply.answer_created_by_username}
                                </span>
                                {creator === usersUsername && answered ===false && reply.answer_is_final !== true ? <button className={s.solvedbutton} onClick={() => handleSolvedButtonClick(reply.answer_id)}>
                                    Solved?
                                </button> : <></>}
                                <span className={s.questiondate}>
                                        {dateFormat(reply.answered_on, "dddd, mmmm dS, h:MM TT")}
                                    </span>
                            </div>
                            </div>
                        </div>
                        ))}
                        {replies.filter(function(reply) {
                        return reply.answer_is_final !== true
                    }).map((reply)=>(
                            <div className={reply.answer_is_final === true ? s.solvedanswer : s.answer}>
                            <div className={s.questioncontentbox}>
                            
                            
                                <span className={s.answercontent}>
                                    {reply.answer_content}
                                </span>
                                <div className={reply.answer_is_final === true ? s.solvedanswernamebox : s.answernamebox}>
                                <div className={s.picturebox}>
                <img className={s.picture} src="https://res.cloudinary.com/repdb/image/upload/v1646334254/pxtcouhaxx9jo95e8q6m.png" />
            </div>
                                <span className={s.questionname}>
                                    {reply.answer_created_by_name}
                                </span>
                                <span className={s.questionusername}>
                                    {"@" + reply.answer_created_by_username}
                                </span>
                                {creator === usersUsername && answered ===false && reply.answer_is_final !== true ? <button className={s.solvedbutton} onClick={() => handleSolvedButtonClick(reply.answer_id)}>
                                    Solved?
                                </button> : <></>}
                                <span className={s.questiondate}>
                                        {dateFormat(reply.answered_on, "dddd, mmmm dS, h:MM TT")}
                                    </span>
                            </div>
                            </div>
                        </div>
                        ))}
           
                    {usersUsername === undefined || usersUsername === null ? 
                    <div className={s.replybox}>
                        <span className={s.signedout}>
                        please sign in.
                        </span>
                    </div> : <div className={s.replybox}>
                           
                     <textarea className={s.reply} placeholder="Type your message here." name="messageText" value={messageText} onChange={e => onChange(e)} />
                           <button className={s.button} onClick={onSubmitForm}>Reply</button>
                       </div>}
                       </div>
                      
                </div>
            </div>
        </div>
    )
}