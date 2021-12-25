// eslint-disable-next-line
import { $host, $authHost } from '../index'


// Калькулятор ориентировочной стоимости и сроков заказа
export const getMicroCalc = async () => {
    const { data } = await $host.get('api/delivery/dl/micro_calc',{ params: {
        arrival_city: "5500000100000000000000000",
        derival_city: "7800000000000000000000000",
        sessionID: ""
    }})
    return data
}