import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getArticles } from "../utils/api";
import "./Articlelist.css"

export const Articlelist = ({ topics }) => {

    const navigate = useNavigate()
    const [articles, setArticles] = useState([])
    const [isLoading, SetIsLoading] = useState(true)
    const [params, setParams] = useState();
    const [orderBy, setOrderBy] = useState('ASC')
    const [searchParams ,setSearchParams] = useSearchParams();

    useEffect(() => {
        getArticles(params)
            .then((articles) => {
                setArticles(articles);
                SetIsLoading(false)
                setSearchParams(params)
            })

    }, [params])


    const sort = (param) => {

        setParams((currSearchParams) => {
            return {...currSearchParams, sort_by : param}
        })
    }

    const order = (param) => {

        if(param !== "ASC"){
            setOrderBy("ASC")
        } else {
            setOrderBy("DESC")
        }

        setParams((currSearchParams) => {
            return {...currSearchParams, order : param}
        })
    }


    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <div className="topics">
                {topics.map((topic) => {
                    return (

                        <button key={topic.slug} className="button" onClick={() => {
                            setParams({ topic : topic.slug })
                            setOrderBy('ASC')
                        }}>{topic.slug}</button>

                    )
                })}
                <button className="button" onClick={() => {
                    setParams({})
                }}>All</button>

            </div>
            <br />
            <button onClick={() => { sort("created_at") }}>Sort By Date</button>
            <button onClick={() => { sort("votes") }}>Sort By Votes</button>
            <button onClick={() => { sort("comment_count") }}>Sort By No. Comment</button>
            <button onClick={() => { order(orderBy)}}>Order By:{orderBy}</button>
            {articles.map((article) => {
                return (
                    <div key={article.article_id}>
                        <br />
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