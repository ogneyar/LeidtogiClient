// eslint-disable-next-line
import { $host, $authHost } from '../index'


// добавление товара
export const addProduct = async (formData, number, quantity) => {
    const { data } = await $authHost.post('api/parser/kvt/', formData, {
        params: { 
            add: quantity,
            number
        }
    })
    return data
}

// возвращает количество всех товаров в файле
export const getLength = async (formData) => {
    const { data } = await $authHost.post('api/parser/kvt/', formData)
    return data
}
