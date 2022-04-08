import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import QuestionController from "../apis/QuestionController";
import StudentsSidebar from "../components/common/StudentsSidebar/StudentsSidebar";
import { CourseContext } from "../context/CourseContext";
import s from "../styles/ClassQuestions.module.css";

export default function ClassQuestions(){

    let { course_id } = useParams();
    let navigate = useNavigate();
    let newArray = [];
    const {questionsList, setQuestionsList} = useContext(CourseContext)


    useEffect(()=>{
      
            
            const fetchClassQuestions = async() => {
                try {
                    const classQuestions = await QuestionController.get(`/retrieve_questions/${course_id}`)
                    setQuestionsList(classQuestions.data.data.questions)
                    console.log(classQuestions.data.data)
                } catch (err) {
                    console.error(err.message)
                }
            }
        fetchClassQuestions()
    },[])

    const handleViewQuestion = (question_id) => {
        navigate(`/questions/${course_id}/${question_id}`, {replace:true})
    }

    const handleClickNewQuestion = () => {
        navigate(`/ask_question/${course_id}`, {replace:true})
    }
    for(let i = 0; i <questionsList.length; i++){
        newArray.push(questionsList[i])
        
    }
    var reversedArray = newArray.reverse()
    console.log(reversedArray)
  
    return(
   
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
                            Questions
                        </h2>
                    </div>
                    <div className={s.buttonbox}>
                        <button className={s.button} onClick={() => handleClickNewQuestion()}>
                            New Question
                        </button>
                    </div>
                    
                {reversedArray.map((item) => (
                    <div className={s.card} onClick={()=>handleViewQuestion(item.question_id)}>
                                           <div className={s.textbox}>
                    <div className={s.titlebox}>
                    <span className={s.title}>
                    {item.question_title}
                    </span>
                    </div>
                    <div className={s.descriptionbox}>
                    <span className={s.description}>
                    {item.question_created_by_name}
                    </span>
                    </div>
                    </div>
                        
                    </div>
                ))}
         
            </div>
           
                </div>
                </div>
            </div>

    )
}