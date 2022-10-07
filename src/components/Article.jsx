import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArticle, patchArticle } from "../utils/api";
import "./Article.css"
import { Comments } from "./Comments";

export const Article = () => {

    const navigate = useNavigate()

    const { article_id } = useParams();
    const [currentArticle, setCurrArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false)
    const [votes, setVotes] = useState(0)
    const [error, setError] = useState(false)

    useEffect(() => {
        getArticle(article_id)
            .then((article) => {
                setCurrArticle(article);
                setVotes(article.votes);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err)
                navigate("*")
            })
    }, [article_id])

    if (isLoading) {
        return <p>Loading...</p>
    }


    const vote = (article_id) => {

        setVotes(currentArticle.votes + 1)
        setIsDisabled(true)

        const reqBody = {
            inc_votes: 1,
        }
        patchArticle(article_id, reqBody)
            .then((article) => {
                console.log(article.article.votes, "Votes Updated !")
            })
            .catch((err) => {
                console.log(err)
                setError(true)
                setVotes(votes)
                setIsDisabled(false)
            })
    }

    return (
        <div className="Content">
            <div className="article">
                <div className="articleContent">
                    <div className="articleTitle">
                        <h1 className="titleText">{currentArticle.title}</h1>
                        <h3 className="articleTopic">Topic: {currentArticle.topic}</h3>
                        <h4 className="articleAuthor">{currentArticle.author}</h4>
                    </div>
                    
                </div>
                <br />
                <div className="articleText">
                    <p className="text">{currentArticle.body}</p>
                    <p>votes: {votes}</p>
                    <button disabled={isDisabled} onClick={() => vote(currentArticle.article_id)}>Upvote !</button>
                    {error ? <p>There was an issue upvoting, please try again later !</p> : null}
                </div>

                <div>
                    <Comments article_id={currentArticle.article_id} />
                </div>
            </div>

        </div>

    )
}