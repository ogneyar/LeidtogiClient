import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import NavLink from '../../components/myBootstrap/NavLink'
import { getOrder, setPay } from '../../http/orderAPI'
import Loading from '../../components/Loading'
import InfoPage from '../info/InfoPage'
// eslint-disable-next-line
import { LK_ROUTE, SUPPORT_ROUTE } from '../../utils/consts'
import './SuccessPage.css'

const SuccessPage = () => {

    const { id, uuid } = useParams()

    const [ email, setEmail ] = useState("")
    const [ loading, setLoading ] = useState(true)
    const [ success, setSuccess ] = useState(false)
    const [ error, setError ] = useState(false)

    useEffect(() => {
        let isMounted = true; // 👈
        if (!success) {
            setLoading(true)
            getOrder(id).then(data => {
                setEmail(` (${data?.email})`)
                if (data?.pay) {
                    setSuccess(true)
                }else {
                    if (uuid === data?.uuid) {
                        setSuccess(true)
                        // установим флаг pay = true
                        // там же на сервере отправится сообщение админу
                        if (!isMounted) setPay(uuid)
                        // очистим корзину
                        localStorage.removeItem('cart')
                    }else {
                        setError(true)
                    }
                }
            })
            setLoading(false)
        }
        return () => {
            isMounted = false // 👈
        }
    // eslint-disable-next-line
    }, [])

    if (loading && !success && !error) return <Loading />

    return (
        <InfoPage>
            <div className="SuccessPage">
                {success
                ?
                    <div>
                        <header>Оплата упешно произведена!</header>
                        <p>Номер вашего заказа: <strong>{id}</strong></p>
                        <p>Наш менеджер с Вами свяжется в ближайшее время.</p>
                        <p>Чек с информацией о Вашем заказе будет отправлен на указанный email{email}.</p>
                        {/* <p>Если Вы зарегистрированный клиент, то отследить заказ можете в <NavLink to={LK_ROUTE}>личном кабине</NavLink>, все возникшие вопросы направляйте в <NavLink to={SUPPORT_ROUTE}>тех. поддержку.</NavLink></p> */}
                        <p>Если Вы зарегистрированный клиент, то все возникшие вопросы можете направить в <NavLink to={SUPPORT_ROUTE}>тех. поддержку.</NavLink></p>
                        <p>Если Вы НЕ зарегистрированный клиент, тогда все возникающие вопросы направляйте на email адрес - <a href="mailto:it@leidtogi.ru">it@leidtogi.ru</a></p>
                    </div>
                :
                    error
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
