import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle, patchArticle } from "../utils/api";
import "./Article.css"

export const Article = () => {

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
    }, [article_id])

    if (isLoading) {
        return <p>Loading...</p>
    }

    const vote = (article_id) => {

        setVotes(currentArticle.votes + 1)
        setIsDisabled(true)

        const reqBody = {
            inc_votes : 1,
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
        <div className="article">
            <div className="col"></div>
            
            <div className="Content">
                <h2>{currentArticle.author}</h2>
                <div>
                    <h1>{currentArticle.title}</h1>
                    <h3>{currentArticle.topic}</h3>
                    <p>votes: {votes}</p>
                    <button disabled={isDisabled} onClick={() => vote(currentArticle.article_id)}>Upvote !</button>
                    {error ? <p>There was an issue upvoting, please try again later !</p> : null}
                </div>
                <br />
                <p>{currentArticle.body}</p>
                <></>
            </div>

            <div className="col"></div>
        </div>

    )
}