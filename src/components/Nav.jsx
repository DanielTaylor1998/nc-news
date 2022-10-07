import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {

    return (


        <div className="Nav">
            <nav>
                <Link className="Link" to="/">Home </Link>
                <Link className="Link" to="/Articles">Articles </Link>
                <Link className="Link" to="/Users">Users</Link>
            </nav>
            <br />
        </div>

    )

}