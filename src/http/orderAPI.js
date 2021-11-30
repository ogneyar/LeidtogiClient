// eslint-disable-next-line
import { $host, $authHost } from './index'


export const createOrder = async (props) => {
    const {data} = await $host.post('api/order', props) 
    return data  
}

export const getOrderForUser = async (id) => {
    const {data} = await $authHost.get('api/order/user/' + id) 
    return data  
}

export const getOrder = async (id) => {
    const {data} = await $host.get('api/order/' + id) 
    return data  
}

export const setPay = async (uuid) => {
    const {data} = await $host.put('api/order/pay/' + uuid) 
    return data  
}
