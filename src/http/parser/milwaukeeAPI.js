// eslint-disable-next-line
import { $host, $authHost } from '../index'


// добавление новых товаров
export const mlkAddNewProduct = async (formData, number, party) => {
    const {data} = await $authHost.post('api/parser/milwaukee/add_new_product', formData, {params: {
        number, party
    }})
    return data
}

// получение всех данных о товаре (пока не используется)
export const mlkGetAll = async (brand, article) => {
    const {data} = await $authHost.get('api/parser/milwaukee/get_all', {params: {
        brand, article
    }})
    return data
}

// узнать количество товаров в файле (пока не используется)
export const mlkGetLength = async (formData) => {
    const {data} = await $authHost.post('api/parser/milwaukee', formData)
    return data
}

// смена цены одного товара
export const mlkChangePriceOne = async (formData, number) => {
    const {data} = await $authHost.post('api/parser/milwaukee', formData, {
        params: {
            change: true,
            number
        }
    })
    return data
}

// смена цены всех товаров
export const mlkChangePriceAll = async (formData) => {
    const {data} = await $authHost.post('api/parser/milwaukee', formData, {
        params: {
            change: true
        }
    })
    return data
}
