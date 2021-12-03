import React, { useState, useEffect } from 'react'
import { useQueryParam, NumberParam, StringParam } from 'use-query-params'

import NavLink from '../../components/myBootstrap/NavLink'
import { getOrder, setPay } from '../../http/orderAPI'
import Loading from '../../components/Loading'
import InfoPage from '../info/InfoPage'
import { SUPPORT_ROUTE, URL } from '../../utils/consts'
import './SuccessPage.css'

const SuccessPage = () => {

    // eslint-disable-next-line
    const [id, setId] = useQueryParam('id', NumberParam)
    // eslint-disable-next-line
    const [uuid, setUuid] = useQueryParam('uuid', StringParam)
    // eslint-disable-next-line
    const [orderId, setOrderId] = useQueryParam('orderId', StringParam)
    // eslint-disable-next-line
    const [lang, setLang] = useQueryParam('lang', StringParam)

    const [ error, setError ] = useState(false) 

    useEffect(() => {
        let isMounted = true; // 👈
        getOrder(id).then(data => {
            if (data) {
                if (data?.pay) {
                    // перевод на страницу поздравлений
                    window.open(URL + "congratulation?id=" + id + "&email=" + data?.email ,'_self',false)
                }else {
                    if (uuid === data?.uuid) {
                        // установим флаг pay = true
                        // там же на сервере отправится сообщение админу
                        if (isMounted) setPay(uuid)
                        // очистим корзину
                        localStorage.removeItem('cart')
                        // перевод на страницу поздравлений
                        window.open(URL + "congratulation?id=" + id + "&email=" + data?.email ,'_self',false)
                    }else {
                        setError(true)
                    }
                }
            }else setError(true)
        }).catch(err => setError(true))
        return () => {
            isMounted = false // 👈
        }
    // eslint-disable-next-line
    }, [])

    
    return (
        <InfoPage>
            <div className="SuccessPage">
                {error
                ?
                    <div>
                        <header>Возникла ОШИБКА при проверке номера заказа!</header>
                        <p>Номер вашего заказа: <strong>{id}</strong></p>
                        <p>Если Вы зарегистрированный клиент, то обратитесь в <NavLink to={SUPPORT_ROUTE}>тех. поддержку.</NavLink></p>
                        <p>Если Вы НЕ зарегистрированный клиент, тогда напишите нам на email адрес - <a href="mailto:it@leidtogi.ru">it@leidtogi.ru</a></p>
                    </div>
                :
                    <Loading />
                }
            </div>
        </InfoPage>
    )
}

export default SuccessPage
