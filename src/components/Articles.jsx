import React, { useEffect, useState } from "react";
import { getTopics } from "../utils/api";
import { Articlelist } from "./Articlelist";
import "./Articles.css"

export const Articles = () => {

    const [topics, setTopics] = useState([])
    const [isLoading, SetIsLoading] = useState(true)
    
    useEffect(() => {
        getTopics()
            .then((topics) => {
                setTopics(topics)
                SetIsLoading(false)
            })
    }, [])


    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <div className="List">
                <div className="col"></div>
                <div className="Content">
                    <Articlelist topics={topics}/>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}