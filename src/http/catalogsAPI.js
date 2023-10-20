
import { $host, $authHost } from './index'


export const getAllCatalogs = async () => {
    const { data } = await $host.get('api/catalogs') 
    return data  
}

export const addedCatalog = async (body) => {
    const { data } = await $authHost.post('api/catalogs', body) 
    return data  
}

export const deleteCatalog = async (name) => {
    const { data } = await $authHost.delete('api/catalogs/' + name) 
    return data  
}
