
import { $host } from './index'


export const getAllCatalogs = async () => {
    const { data } = await $host.get('api/catalogs') 
    return data  
}
