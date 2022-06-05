// eslint-disable-next-line
import { $host, $authHost } from '../index'


// добавление товара
export const addProduct = async (brand, formData, number, quantity = 1) => {
    const { data } = await $authHost.post(`api/parser/${brand}/`, formData, {
        params: { 
            add: quantity,
            number
        }
    })
    return data
}

// возвращает количество всех товаров в файле
export const getLength = async (brand, formData) => {
    const { data } = await $authHost.post(`api/parser/${brand}/`, formData)
    return data
}

// смена цен
export const changePrices = async (brand, formData) => {
    const { data } = await $authHost.post(`api/parser/${brand}/`, formData, {
        params: { 
            change: true
        }
    })
    return data
}







//
// export const parseMailRu = async (email) => {
//     const {data} = await $host.get('api/parser/parse/mail.ru', {params: {email}})
//     return data
// }

//
// export const parseYaRu = async (email) => {
//     const {data} = await $host.get('api/parser/parse/ya.ru', {params: {email}})
//     return data
// }
