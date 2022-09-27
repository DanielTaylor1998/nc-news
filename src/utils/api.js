import axios from "axios";

const newsApi = axios.create({
    baseURL: "https://dtaylor-nc-news.herokuapp.com/api"
})

export const getArticles = (author, topic, sort_by, order) => {
    return newsApi.get('/articles', { params: { author: author, topic: topic, sort_by: sort_by, order: order } })
    .then((res) => {
        return res.data
    })
}

export const getArticle = (articleId) => {
    return newsApi.get(`/articles/${articleId}`)
    .then((res) => {
        return res.data
    })
}

export const getTopics = () => {
    return newsApi.get('/topics')
    .then((res) => {
        return res.data
    })
}