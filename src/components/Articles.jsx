import React, { useEffect, useState } from "react";
import { getTopics } from "../utils/api";
import { Articlelist } from "./Articlelist";
import "./Articles.css"

export const Articles = () => {

    const [topics, setTopics] = useState([])
    const [topic, setTopic] = useState('')
    const [loading, Isloading] = useState(true)

    useEffect(() => {
        getTopics()
            .then((topics) => {
                setTopics(topics)
                Isloading(false)
            })
    }, [])


    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <div className="List">
                <div className="col"></div>
                <div className="Content">
                    {topics.map((topic) => {
                        return (
                            <div key={topic.slug} className="topics">
                                <button className="button" onClick={setTopic(topic.slug)}>{topic.slug}</button>
                            </div>
                        )
                    })}
                    <Articlelist topic={topic} />
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}