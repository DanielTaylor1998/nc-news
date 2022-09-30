import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user";
import { deleteComment, getComments } from "../utils/api";
import { Commentform } from "./Commentform";
import "./comments.css"

export const Comments = (article_id) => {


    const [isLoading, setIsLoading] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false)
    const [comments, setComments] = useState([])
    const [error, setError] = useState(false)

    const { loggedInUser } = useContext(UserContext)

    useEffect(() => {
        getComments(article_id.article_id)
            .then((comments) => {
                setComments(comments.reverse())
                setIsLoading(false)
            })
            .catch((err) => {
                setError(true)
            }) 
    }, [comments, article_id.article_id])


    const del = (comment_id) => {


        setIsDisabled(true)

        deleteComment(comment_id)
            .then(() => {
                setIsDisabled(false)
            })
            .catch((err) => {
                console.log(err)
                setError(true)
            })
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <Commentform article_id={article_id.article_id} />
            <h1>Comments</h1>
            {error ? <h3>There was an error fetching new comments.. Please try again later !</h3> : null}
            {comments.map((comment) => {
                return (
                    <div className="comment" key={comment.comment_id}>
                        <div className="commentBody">
                            <p>{comment.body}</p>
                            <h3>{comment.author}</h3>
                            {loggedInUser.username === comment.author ? <button disabled={isDisabled} onClick={() => {del(comment.comment_id)}}>Delete !</button> : null}
                        </div>
                        <br />
                    </div>
                )

            })}
        </div>
    )


}