import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../utils/api";
import "./Article.css"

export const Article = () => {

    const { article_id } = useParams();
    const [currentArticle, setCurrArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getArticle(article_id)
            .then((article) => {
                setCurrArticle(article);
                setIsLoading(false);
            })
    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }

    const vote = (article_id) => {
        
    }

    return (
        <div className="article">
            <div className="col"></div>
            
            <div className="Content">
                <h2>{currentArticle.author}</h2>
                <div>
                    <h1>{currentArticle.title}</h1>
                    <button>{currentArticle.votes}</button>
                </div>
                <br />
                <p>{currentArticle.body}</p>
                <></>
            </div>

            <div className="col"></div>
        </div>

    )
}