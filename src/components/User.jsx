import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/user";
import "./User.css"

export const User = () => {

    const { loggedInUser } = useContext(UserContext)

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
            <img className="profile-pic" src={loggedInUser.avatar_url} alt={"This is your profile pic"}/>
            <h2>{loggedInUser.username}</h2>
            <h1>You are logged In</h1>
        </div>

    )


}