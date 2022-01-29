// eslint-disable-next-line
import { $host, $authHost } from '../index'


//
export const parseMailRu = async (email) => {
    const {data} = await $host.get('api/parser/parse/mail.ru', {params: {email}})
    return data
}

//
export const parseYaRu = async (email) => {
    const {data} = await $host.get('api/parser/parse/ya.ru', {params: {email}})
    return data
}
