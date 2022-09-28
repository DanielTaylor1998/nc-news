import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTopics } from "../utils/api";
import { Articlelist } from "./Articlelist";
import "./Articles.css"

export const Articles = () => {

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
            } else {
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
                                    setTopic(topic.slug)
                                }}>{topic.slug}</button>

                            )
                        })}
                        <button className="button" onClick={() => {
                            setTopic('')
                        }}>All</button>
                    </div>
                    <Articlelist topic={topic} />
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}