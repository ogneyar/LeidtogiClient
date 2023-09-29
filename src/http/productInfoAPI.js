
import { $host, $authHost } from './index'


export const getAllProductInfos = async () => {
    const { data } = await $host.get('api/product_info')
    return data
}


export const editProductInfos = async (productId, title, body) => { // title = "description", "characteristics" or "equipments", body = data
    const { data } = await $authHost.put('api/product_info/edit/' + productId, { title, body })
    return data
}

