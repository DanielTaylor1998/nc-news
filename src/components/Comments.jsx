import React, { useEffect, useState } from "react";
import { getComments } from "../utils/api";
import { Commentform } from "./Commentform";
import "./comments.css"

export const Comments = (article_id) => {


    const [isLoading, setIsLoading] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false)
    const [comments, setComments] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        getComments(article_id.article_id)
            .then((comments) => {
                setComments(comments.reverse())
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setError(true)
            }) 
    }, [comments, article_id.article_id])


    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <h1>Oops Something Went Wrong</h1>
    }

    return (
        <div>
            <Commentform article_id={article_id.article_id} />
            <h1>Comments</h1>
            {comments.map((comment) => {
                return (
                    <div className="comment" key={comment.comment_id}>
                        <div className="commentBody">
                            <p>{comment.body}</p>
                            <h3>{comment.author}</h3>
                        </div>
                        <br />
                    </div>
                )

            })}
        </div>
    )


}