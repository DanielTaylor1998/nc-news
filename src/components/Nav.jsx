import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Nav = () => {

    return (


        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/Articles">Articles</Link>
                <Link to="/Users">Users</Link>
            </nav>
            <br />
        </div>

    )

}