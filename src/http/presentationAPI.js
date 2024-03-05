
import { $host, $authHost } from './index'


export const getAllPresentations = async () => {
    const { data } = await $host.get('api/presentation') 
    return data  
}

export const addedPresentation = async (body) => {
    const { data } = await $authHost.post('api/presentation', body) 
    return data  
}

export const deletePresentation = async (name) => {
    const { data } = await $authHost.delete('api/presentation/' + name) 
    return data  
}
