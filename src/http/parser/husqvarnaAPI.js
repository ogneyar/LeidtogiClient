// eslint-disable-next-line
import { $host, $authHost } from '../index'


// добавление товара
export const addProduct = async (formData, number) => {
    const {data} = await $authHost.post('api/parser/husqvarna/', formData, {
        params: { 
            add: true,
            number
        }
    })
    return data
}

// возвращает количество всех товаров в файле
export const getLength = async (formData) => {
    const {data} = await $authHost.post('api/parser/husqvarna/', formData)
    return data
}

// добавление всех товаров из файла
export const addAllProducts = async (formData) => {
    const {data} = await $authHost.post('api/parser/husqvarna/', formData, {
        params: { 
            add: true,
            all: true
        }
    })
    return data
}


// получение изображения товара
export const getImage = async (article) => {
    const {data} = await $host.get('api/parser/husqvarna/get_image', {params: {article}})
    return data
}

// получение характеристик товара
export const getCharcteristics = async (article) => {
    const {data} = await $host.get('api/parser/husqvarna/get_charcteristics', {params: {article}})
    return data
}

// получение описания товара
export const getDescription = async (article) => {
    const {data} = await $host.get('api/parser/husqvarna/get_description', {params: {article}})
    return data
}
