import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getArticles } from "../utils/api";
import "./Articlelist.css"

export const Articlelist = ({ topics }) => {

    const navigate = useNavigate()
    const [articles, setArticles] = useState([])
    const [isLoading, SetIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        getArticles(searchParams)
            .then((articles) => {
                setArticles(articles);
                SetIsLoading(false)
            })

    }, [searchParams])


    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <div className="topics">
                {topics.map((topic) => {
                    return (

                        <button key={topic.slug} className="button" onClick={() => {
                            setSearchParams({ topic: topic.slug })
                        }}>{topic.slug}</button>

                    )
                })}
                <button className="button" onClick={() => {
                    setSearchParams({})
                }}>All</button>
                <br />
                <button >Sort By</button>
                <br />

            </div>
            {articles.map((article) => {
                return (
                    <div key={article.article_id}>
                        <div className="Article-Card" onClick={() => { navigate(`/Articles/${article.article_id}`) }}>
                            <h1 className="title">{article.title}</h1>
                        </div>
                        <br />
                    </div>
                )
            })}
        </div>
    )

}