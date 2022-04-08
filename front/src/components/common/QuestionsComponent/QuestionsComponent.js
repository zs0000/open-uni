import React, { useState, useEffect, useContext } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import QuestionController from "../../../apis/QuestionController";
import { UsersContext } from "../../../context/UsersContext";
import s from "./QuestionsComponent.module.css";


export default function QuestionsComponent({users}){
    
    let navigate = useNavigate();
    let queryClient = useQueryClient();

    const {recentQuestions, setRecentQuestions} = useContext(UsersContext);
    


    const fetchRecentQuestions = async() => {
        try {
            const recentQuestionsRequest = await QuestionController.get(`/users_questions/${users}`)

          
                setRecentQuestions(recentQuestionsRequest.data.data.questions)
           

        
        } catch (err) {
            console.error(err.message)
        }
    }
    

    useEffect(()=>{
       
          



       fetchRecentQuestions()
    },[])
    let moreThanThreeAssignments = false;
 
  if(recentQuestions !== undefined && recentQuestions.length > 0){

        
        let startingPoint = recentQuestions.length;
        let endPoint = recentQuestions.length;
  
    if(recentQuestions !== undefined && startingPoint > 3) {
       moreThanThreeAssignments = true
      
    
        if(startingPoint > 3) {
            endPoint = endPoint - 3

   

        }
 
    }
    return(
        <div className={s.main}>
            <div className={s.content}>
            <div className={s.questions}>
                {moreThanThreeAssignments === true ? recentQuestions.slice(endPoint,startingPoint).reverse().map((item)=> (
                    <div className={item.question_status === false ? s.solvedquestion : s.question}>
                    <span className={s.title}>
                        {item.question_title}
                    </span>
                    <span className={s.coursetitle}>
                        {item.course_title}
                    </span>
                    <span className={s.status}>
                        Status: {" "}
                    {item.question_status !== true ? 
                    <span className={s.solved}>
                    Solved
                </span> :
                    <span className={s.open}>
                    Open
                </span>
                    }
                    </span>
                    <span>
                        
                    </span>
                    
                </div>
                )) : recentQuestions.map((item) => (
                    <div className={s.question}>
                        <span className={s.title}>
                            {item.question_title}
                        </span>
                        <span>
                            {item.course_title}
                        </span>
                        <span className={s.status}>
                            Status:
                        {item.question_status === true ? 
                        <span className={s.open}>
                        Open
                        </span> :
                        <span className={s.solved}>
                            Solved
                        </span>
                        }
                        </span>
                        <span>
                            
                        </span>
                        
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
                    }
        return(
            <>
            Blank
            </>

        )
}