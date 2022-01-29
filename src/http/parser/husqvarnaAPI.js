// eslint-disable-next-line
import { $host, $authHost } from '../index'


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
