import React, { useEffect, useState } from "react";
import { getUsers } from "../utils/api";
import "./Users.css"

export const Users = () => {

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {
        getUsers()
            .then((users) => {
                setUsers(users);
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="users">
            <div className="col"></div>
            <div className="content">
                {users.map((user) => {
                    return (
                        <div className="user-list" key={user.name}>
                            <div className="userCard">
                                <h1>{user.username}</h1>
                                <img className="profile-pic" src={user.avatar_url} />
                                <br />
                                <button>Log In !</button>
                            </div>
                        </div>

                    )
                })}
            </div>

            <div className="col"></div>
        </div>
    )
}