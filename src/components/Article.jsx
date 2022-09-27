import React, { useState } from "react";
import { useParams } from "react-router-dom";

export const Article = () => {

    const { article_id } = useParams();
    const [currentArticle, setCurrArticle] = useState({})

    return (
        <h1>Got here !</h1>
    )
}