import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user";
import { getArticles } from "../utils/api";
import "./Home.css"

export const Home = () => {

    const navigate = useNavigate()
    const [popularArticle, setPopularArticle] = useState({})
    const [params, setParams] = useState()
    const [isLoading, SetIsLoading] = useState(true)

    const { loggedInUser } = useContext(UserContext)


    useEffect(() => {
        getArticles({ sort_by: "votes" })
            .then((articles) => {
                setPopularArticle(articles[0])
                SetIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className="home">
            <div className="profileCard">
                {loggedInUser.username === undefined ? "you need to log in !" :
                    <div className="profile">
                        <h1>Profile</h1>
                        <img className="profile-pic" src={loggedInUser.avatar_url} alt={"This is your profile pic"} />
                        <h2>{loggedInUser.username}</h2>
                    </div>}
            </div>
            <div className="homeArticle">
                <h1>Most Popular Article</h1>
                <h2 className="titleText">{popularArticle.title}</h2>
                <h3 className="articleTopic">{popularArticle.author}</h3>
                <p className="text">{popularArticle.body}</p>
            </div>
        </div>
    )

}