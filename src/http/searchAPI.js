// eslint-disable-next-line
import {$host,$authHost} from './index'


export const searchArticle = async (body) => { // body = { text }
    const {data} = await $host.post('api/search/article', body) 
    if (data) {

    }
    return data  
}

export const searchName = async (body) => { // body = { text }
    const {data} = await $host.post('api/search/name', body) 
    if (data) {

    }
    return data  
}
