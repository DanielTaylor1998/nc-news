import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
                    <div key={article.article_id}>
                        <div className="Article-Card">
                            <Link to={`/Articles/${article.article_id}`}><h1>{article.title}</h1></Link>
                            <p>{article.body}</p>
                        </div>
                        <br />
                    </div>
                )
            })}
        </div>
    )

}