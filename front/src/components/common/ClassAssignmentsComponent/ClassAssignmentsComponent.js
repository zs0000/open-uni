import React, { useContext, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router'
import GrabClassDetails from '../../../apis/GrabClassDetails'
import { CourseContext } from '../../../context/CourseContext'
import LoadingPage from '../LoadingPage/LoadingPage'
import s from "./ClassAssignmentsComponent.module.css"
import AssignmentsCard from "../AssignmentsCard/AssignmentsCard"

export default function ClassAssignmentsComponent() {

    let queryClient = useQueryClient()
    let navigate = useNavigate
    let { course_id } = useParams()   

    let blankData = 
  {
            "assignment_id": 3,
            "course_id": 2,
            "assignment_title": "No Assignments",
            "assignment_start_date": "2021-12-16T08:00:00.000Z",
            "assignment_due_date": "2021-12-17T08:00:00.000Z",
        }

    const { isLoading, data, isError } = useQuery(`${course_id}-assignments`, () =>  GrabClassDetails.get(`/assignments/${course_id}`))  
   

    const {assignmentsList, setAssignments} = useContext(CourseContext)
 
    if(!assignmentsList) {
        return(<div>
            fetching...
        </div>)
    }
    let moreThanThreeAssignments = false;
 
  if(assignmentsList !== undefined && assignmentsList.length > 0){

        setAssignments(assignmentsList)
        let startingPoint = assignmentsList.length;
        let endPoint = assignmentsList.length;
  
    if(assignmentsList !== undefined && startingPoint > 3) {
       moreThanThreeAssignments = true
    
        if(startingPoint > 3) {
            endPoint = endPoint - 3

    

        }
    }
        
      return(
          <div className={s.main}>
              <div className={s.content}>
                {moreThanThreeAssignments === true ? assignmentsList.slice(endPoint, startingPoint).reverse().map((item)=> (
                    <AssignmentsCard item={item} />
                )) : assignmentsList.reverse().map((item) =>(
                    <AssignmentsCard item={item} />
                ))}
              </div>
          </div>
      )
  }

    return (
        
      
        <div className={s.main}>
            <div className={s.content}>
               
            <AssignmentsCard item={blankData}/>
            <AssignmentsCard item={blankData}/>
            <AssignmentsCard item={blankData}/>
            </div>
        </div>
    )
}
