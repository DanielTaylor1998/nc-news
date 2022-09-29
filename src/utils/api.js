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

export const patchArticle = (articleId, body) => {
    return newsApi.patch(`/articles/${articleId}`, body)
        .then((res) => {
            return res.data
        })
}

export const getComments = (articleId) => {
    return newsApi.get(`/articles/${articleId}/comments`)
        .then((res) => {
            return res.data
        })
}

export const getUsers = () => {
    return newsApi.get("/users")
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