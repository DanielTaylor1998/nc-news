import React from "react";
import { Articlelist } from "./Articlelist";
import "./Articles.css"

export const Articles = () => {
    return (
        <div className="List">
            <div className="col"></div>
            <div className="Content">
                <Articlelist />
            </div>
            <div className="col"></div>
        </div>
    )
}