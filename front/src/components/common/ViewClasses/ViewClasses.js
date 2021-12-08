import React, { Fragment, useEffect, useContext } from 'react'
import { Outlet } from 'react-router'
import s from "./ViewClasses.module.css"
export default function ViewClasses({courses}) {
    console.log(courses)
    return (
        <Fragment>
            <div>
                <div>
                    <div>

                    </div>
                </div>
            </div>
            <Outlet/>
        </Fragment>
    )
}
