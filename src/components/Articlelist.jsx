import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../utils/api";
import "./Articlelist.css"

export const Articlelist = (topic) => {

    const [articles, setArticles] = useState([])
    const [isLoading, SetIsLoading] = useState(true)

    useEffect(() => {
        getArticles()
            .then((articles) => {
                setArticles(articles);
                SetIsLoading(false)
            })

        if (topic) {
            getArticles(topic.topic)
        .then((articles) => {
            setArticles(articles);
            SetIsLoading(false)
        })
        }
    }, [topic])


    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            {articles.map((article) => {
                return (
                    <div key={article.article_id}>
                        <div className="Article-Card">
                            <Link className="title" to={`/Articles/${article.article_id}`}><h1>{article.title}</h1></Link>
                        </div>
                        <br />
                    </div>
                )
            })}
        </div>
    )

}