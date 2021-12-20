import { serverpostNews } from './constants'
import httpClient from './httpClient'




const getPostNews = async () => {
    const result = await httpClient.get(serverpostNews.getpostNews)
    return result.data
}

const createPost = async(data) => {
    // console.log(data);
    const result = await httpClient.post(serverpostNews.createpost, data)
    // console.log(result.data.result);
    return result.data.result
}

const deletePost = async(ID) => {
    // console.log(`${serverpostNews.deletepost}/${ID}`)
    const result = await httpClient.delete(`${serverpostNews.deletepost}/${ID}`)
    // console.log(result.data.result)
    return result.data.result
}

const disablePost = async(ID) => {
    const result = await httpClient.put(`${serverpostNews.disablepost}/${ID}`)
    return result.data.result
}


export default {
    getPostNews,
    createPost,
    deletePost,
    disablePost
}