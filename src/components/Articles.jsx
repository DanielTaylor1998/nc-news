import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTopics } from "../utils/api";
import { Articlelist } from "./Articlelist";
import "./Articles.css"

export const Articles = () => {

    const navigate = useNavigate()

    const search = useLocation().search;
    const qTopic = new URLSearchParams(search).get('topic')

    const [topics, setTopics] = useState([])
    const [topic, setTopic] = useState('')
    const [isLoading, SetIsLoading] = useState(true)


    useEffect(() => {
        getTopics()
            .then((topics) => {
                setTopics(topics)
                SetIsLoading(false)
            })
            if (qTopic) {
                setTopic(qTopic)
            } else{
                setTopic('')
            }
    }, [qTopic])


    if (isLoading) {
        return <p>Loading...</p>
    }


    return (
        <div>
            <div className="List">
                <div className="col"></div>
                <div className="Content">
                    <div className="topics">
                        {topics.map((topic) => {
                            return (

                                <button key={topic.slug} className="button" onClick={() => {
                                    navigate(`/Articles?topic=${topic.slug}`)
                                }}>{topic.slug}</button>

                            )
                        })}
                        <button className="button" onClick={() => {
                            navigate(`/Articles`)
                        }}>All</button>
                    </div>
                    <Articlelist topic={topic} />
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}