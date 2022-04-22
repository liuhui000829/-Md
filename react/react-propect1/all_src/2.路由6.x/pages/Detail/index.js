import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Detail() {

    const { state:{id,title,context} } = useLocation();

    console.log(id)

    return (
        <div>
            <ul>
                <li>{id}</li>
                <li>{title}</li>
                <li>{context}</li>
            </ul>
        </div>
    )



}
