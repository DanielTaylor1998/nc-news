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
    const [searchParams, setSearchParams] = useSearchParams();

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
            return { ...currSearchParams, sort_by: param }
        })
    }

    const order = (param) => {

        if (param !== "ASC") {
            setOrderBy("ASC")
        } else {
            setOrderBy("DESC")
        }

        setParams((currSearchParams) => {
            return { ...currSearchParams, order: param }
        })
    }


    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className="articleList">

            <div className="topics">
                <h2>Topics</h2>
                {topics.map((topic) => {
                    return (

                        <button key={topic.slug} className="button" onClick={() => {
                            setParams({ topic: topic.slug })
                            setOrderBy('ASC')
                        }}>{topic.slug}</button>

                    )
                })}
                <button className="button" onClick={() => {
                    setParams({})
                }}>All</button>
            </div>

            <div className="listHeader">
                <div className="sortDesc">
                    <h3 className="text"> Articles sorted by :</h3>
                    <h3 className="sortText">{params ? params.sort_by !== undefined ? params.sort_by === "comment_count" ? "Number of comments" : params.sort_by : "date" : "date"}</h3>
                    <h3 className="text">in {orderBy === "ASC" ? "descending" : "asecending"} order</h3>
                </div>
                <div className="buttonsList">
                    <label className="sortbuttons">
                        Sort By
                        <select className="buttons">
                            <option onClick={() => { sort("date") }}>date</option>
                            <option onClick={() => { sort("votes") }}>votes</option>
                            <option onClick={() => { sort("comment_count") }}>comments</option>
                        </select>
                    </label>
                    <button className="orderButton" onClick={() => { order(orderBy) }}>Order By:{orderBy}</button>
                </div>
            </div>

            <div className="articles">
                {articles.map((article) => {
                    return (
                        <div key={article.article_id}>
                            <div className="Article-Card" onClick={() => { navigate(`/Articles/${article.article_id}`) }}>
                                <h2 className="title">{article.title}</h2>

                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )

}