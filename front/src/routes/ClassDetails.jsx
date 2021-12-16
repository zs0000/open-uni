import React, { Fragment, useEffect, useContext } from 'react'
import { Outlet, useParams } from 'react-router'
import GrabClassDetails from '../apis/GrabClassDetails'
import ViewClassDetails from '../components/common/ViewClassDetails/ViewClassDetails'
import { useQuery, useQueryClient } from 'react-query'
import LoadingPage from '../components/common/LoadingPage/LoadingPage'
import DashboardApi from '../apis/DashboardApi'
export default function ClassDetails() {

    let { course_id } = useParams()

    const queryClient = useQueryClient()
  

   

    const { isLoading, data, error, isFetching } = useQuery(`${course_id}-data`,() => 
    GrabClassDetails.get(`/retrieve/${course_id}`)
    )
 


    if(isLoading || isFetching) {
        return(
            <div>
                <LoadingPage/>
            </div>
        )
    }

    return (
        
        <div>
            <ViewClassDetails
            courseTitle={data.data.data.courseDetails[0].course_title}
            courseDescription={data.data.data.courseDetails[0].course_description}
            courseCapacity={data.data.data.courseDetails[0].course_capacity}
            courseTag={data.data.data.courseDetails[0].course_tag}
            />
        </div>
    )
}
