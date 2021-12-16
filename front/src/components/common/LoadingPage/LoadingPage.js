import React from 'react'
import s from "./LoadingPage.module.css"


export default function LoadingPage() {
    return (

            <div className={s.main}>
                <div className={s.textbox}>
                    <h1 className={s.text}>
                        Loading...
                    </h1>
                    <p className={s.slash}>
                        /
                    </p>
                </div>
            </div>
  
    )
}
