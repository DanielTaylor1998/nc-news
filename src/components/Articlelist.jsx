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
        <div>

            <div className="topics">
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

                <br />
                <div className="buttonsList">
                    <div className="sortbuttons">
                        <button className="buttons" onClick={() => { sort("date") }}>Sort By Date</button>
                        <button className="buttons" onClick={() => { sort("votes") }}>Sort By Votes</button>
                        <button className="buttons" onClick={() => { sort("comment_count") }}>Sort By No. Comment</button>
                    </div>
                    <button className="orderButton" onClick={() => { order(orderBy) }}>Order By:{orderBy}</button>
                </div>
            </div>


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