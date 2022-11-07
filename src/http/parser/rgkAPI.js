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
export const rgkChangePrice = async (number) => {
    const {data} = await $authHost.get('api/parser/rgk', {params: {
        change: true,
        number
    }})
    return data
}

// добавление габаритов товара (пока не используется)
export const rgkAddSizes = async () => {
    const {data} = await $authHost.get('api/parser/rgk/add_sizes')
    return data
}

// обновление файла feed.csv (пока не работает)
export const rgkUpdateFeed = async () => {
    const {data} = await $authHost.get('api/parser/rgk', {params: {
        update: true
    }})
    return data
}

//  сохранение данных в файл
export const rgkSaveInfo = async (text) => {
    const {data} = await $authHost.post('api/parser/rgk/save_info', {text})
    return data
}
