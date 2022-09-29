import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getArticles } from "../utils/api";
import "./Articlelist.css"

export const Articlelist = (topic) => {

    const navigate = useNavigate()

    const [articles, setArticles] = useState([])
    const [isLoading, SetIsLoading] = useState(true)

    useEffect(() => {
        getArticles(topic.topic)
            .then((articles) => {
                setArticles(articles);
                SetIsLoading(false)
            })

    }, [topic])


    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            {articles.map((article) => {
                return (
                    <div key={article.article_id}>
                        <div className="Article-Card" onClick={() => {navigate(`/Articles/${article.article_id}`)}}>
                            <h1 className="title">{article.title}</h1>
                        </div>
                        <br />
                    </div>
                )
            })}
        </div>
    )

}