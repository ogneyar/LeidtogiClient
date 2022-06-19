
import {$host,$authHost} from './index'


export const setFeed = async (body) => {
    const { data } = await $authHost.post('api/tester/set_feed', body)
    return data
}

export const setSiteMap = async (body) => {
    const { data } = await $authHost.post('api/tester/set_sitemap', body)
    return data
}

export const setLocationCitiesSdek = async (params) => {
    const { data } = await $authHost.get('api/tester/set_location_cities_sdek', { params })
    return data
}

export const setPlacesDl = async () => {
    const { data } = await $authHost.get('api/tester/set_places_dl')
    return data
}

export const echo = async () => {
    const { data } = await $host.get('echo')
    return data
}
