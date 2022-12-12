// eslint-disable-next-line
import { $host, $authHost } from '../index'


// узнать количество товаров в файле
export const rgkGetLength = async () => {
    const {data} = await $authHost.get('api/parser/rgk')
    return data
}

// добавление нового товара
export const rgkAddNewProduct = async (number) => {
    const {data} = await $authHost.get('api/parser/rgk', {params: {
        number
    }})
    return data
}

// изменение цены 
export const rgkChangePrice = async (update = true) => {
    const {data} = await $authHost.get('api/parser/rgk', {params: {
        change: true,
        update
    }})
    return data
}

// добавление габаритов товара (пока не используется)
export const rgkAddSizes = async () => {
    const {data} = await $authHost.get('api/parser/rgk/add_sizes')
    return data
}

