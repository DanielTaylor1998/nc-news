import React, { useEffect, useState } from "react";
import { getComments } from "../utils/api";
import "./comments.css"

export const Comments = (article_id) => {


    const [isLoading, setIsLoading] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false)
    const [comments, setComments] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        getComments(article_id.article_id)
            .then((comments) => {
                setComments(comments)
                setIsLoading(false)
                console.log(comments)
            })
    }, [])


    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
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