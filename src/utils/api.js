import axios from "axios";

const newsApi = axios.create({
    baseURL: "https://dtaylor-nc-news.herokuapp.com/api"
})

export const getArticles = (topic) => {
    return newsApi.get('/articles', { params: { topic: topic } })
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

export const patchArticle = (articleId) => {
    return newsApi.patch(`/articles/${articleId}`)
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