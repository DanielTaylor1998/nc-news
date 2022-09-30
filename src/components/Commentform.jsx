import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/user";
import { postComment } from "../utils/api";
import "./Commentform.css"

export const Commentform = ({ article_id }) => {

    const [isHidden, setIsHidden] = useState(true)
    const [hideBttn, setHideBttn] = useState(false)
    const [text, setText] = useState('')
    const [error, setError] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const { loggedInUser } = useContext(UserContext)

    const comment = (article_id) => {

        if (text.length !== 0) {

            setIsDisabled(true)

            const body = {
                username: loggedInUser.username,
                body: text,
            }

            postComment(article_id, body)
                .then((comment) => {
                    setIsHidden(true)
                    setIsDisabled(false)
                    setHideBttn(false)
                })
                .catch((err) => {
                    setError(true)
                })
        }

    }

    const handleChange = (event) => {
        setText(event.target.value)
    }

    if (loggedInUser.username === undefined) {
        return (
            <div>
                <h3>You aren't currently logged in. If you wish to add a comment go log in !</h3>
                <Link to="/Users" >Click here to go log in !</Link>
            </div>

        )
    }

    return (
        <div>
            <div hidden={isHidden}>
                <label>
                    Please enter you comment:
                    <br />
                    <textarea className="textBox" onChange={handleChange}></textarea>
                    <br />
                    <button disabled={isDisabled} onClick={() => { comment(article_id) }}>Sumbit</button>
                    {text.length === 0 ? <p> Please fill in the text box !</p> : null}
                    {error ? <p>There was an issue adding comment, please try again later !</p> : null}
                </label>
            </div>
            <br />
            <button hidden={hideBttn} onClick={() => { setIsHidden(false); setHideBttn(true) }}>Add Commment</button>
        </div>

    )


}