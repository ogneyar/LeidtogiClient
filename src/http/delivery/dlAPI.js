// eslint-disable-next-line
import { $host, $authHost } from '../index'
// import { DELIVERY_DL_DERIVAL_CITY } from '../../utils/consts'


// Калькулятор стоимости и сроков заказа
export const calculator = async (delivery, cargo) => {
    const { data } = await $host.get('api/delivery/dl/calculator',{ params: {
        delivery, // информация о доставке
        cargo // информация о товаре
    }})
    return data
}

// Калькулятор ориентировочной стоимости и сроков заказа
export const getMicroCalc = async (arrival_city, derival_city) => {
    const { data } = await $host.get('api/delivery/dl/micro_calc',{ params: {
        arrival_city, // город прибытия
        derival_city // отправка
    }})
    return data
}

// Поиск населённых пунктов (поиск кода КЛАДР)
export const getKladr = async (q, limit = 5) => {
    const { data } = await $host.get('api/delivery/dl/kladr',{ params: {
        q, // часть названия города
        limit // количество записей
    }})
    return data
}

// Справочник терминалов (метод возвращает hash и url)
export const getUrlTerminals = async () => {
    const { data } = await $host.get('api/delivery/dl/url_terminals')
    return data
}

// Справочник терминалов (метод возвращает файл json)
export const getTerminalsCatalog = async (url) => {
    const { data } = await $host.get('api/delivery/dl/terminals_catalog', { params: {
        url
    }})
    return data
}

// Поиск терминалов
export const getTerminal = async (kladr) => {
    const { data } = await $host.get('api/delivery/dl/search_terminals', { params: {
        code: kladr
    }})
    return data
}