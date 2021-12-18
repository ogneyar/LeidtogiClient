// eslint-disable-next-line
import {$host,$authHost} from './index'


export const setFeed = async (body) => {
    const { data } = await $authHost.post('api/tester/feed', body)
    return data
}
