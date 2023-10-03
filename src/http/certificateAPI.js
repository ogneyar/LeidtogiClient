
import { $host, $authHost } from './index'


export const createCertificate = async (code, state = "issued") => {
    const { data } = await $authHost.post('api/certificate', { code, state }) // issued - выпущен; assigned - назначен (клиенту); applied - применён
    return data  
}

export const creatingCertificatesFromAFile = async (array) => { // array = [{ id, name, url },...{ id, name, url }]
    const { data } = await $authHost.post('api/certificate/from_a_file', { array })
    return data  
}

export const getAllCertificates = async () => {
    const { data } = await $host.get('api/certificate/get_all')
    return data
}

export const getCertificateByCode = async (code) => {
    const { data } = await $host.get('api/certificate/get_by_code', { params: { code }})
    return data
}

export const getCertificateByOrderId = async (order_id) => {
    const { data } = await $host.get('api/certificate/get_by_order_id', { params: { order_id }})
    return data
}

export const deleteCertificate = async (id) => {
    const { data } = await $authHost.delete('api/certificate/' + id)
    return data
}

export const updateCertificate = async (id, body) => {
    const { data } = await $authHost.put('api/certificate/' + id, body)
    return data
}