import {$host,$authHost} from './index'


export const setFeed = async (body) => {
    const { data } = await $authHost.post('api/tester/feed', body)
    return data
}

export const locationCitiesSdek = async (params) => {
    const { data } = await $host.get('api/tester/locationCitiesSdek', { params })
    return data
}
