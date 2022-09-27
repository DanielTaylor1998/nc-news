import React, { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import "./Articlelist.css"

export const Articlelist = () => {

    const [articles, setArticles] = useState([])
    const [loading, Isloading] = useState(true)

    useEffect(() => {
        getArticles()
            .then((articles) => {
                setArticles(articles);
                Isloading(false)
            })
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            {articles.map((article) => {
                return (
                    <div>
                    <div className="Article-Card">
                        <h1>{article.title}</h1>
                        <p>{article.body}</p>
                    </div>
                    <br />
                    </div>
                )
            })}
        </div>
    )

}