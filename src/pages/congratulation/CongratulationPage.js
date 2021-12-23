import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { useQueryParam, NumberParam, StringParam } from 'use-query-params'

import { LK_ROUTE, MAIL, PHONE_ONE, SUPPORT_ROUTE } from '../../utils/consts'
import NavLink from '../../components/myBootstrap/NavLink'
import Loading from '../../components/Loading'
import InfoPage from '../info/InfoPage'


const CongratulationPage = () => {
    
    // eslint-disable-next-line
    const [id, setId] = useQueryParam('id', NumberParam)
    // eslint-disable-next-line
    const [email, setEmail] = useQueryParam('email', StringParam)

    if (!id) return <Loading />

    return (
        <InfoPage>
            <div className="SuccessPage">
            
                <header>Оплата упешно произведена!</header>
                
                <p>Номер вашего заказа: <strong>{id}</strong></p>

                <p>Наш менеджер свяжется с Вами в ближайшее время.</p>

                <p>Если Вы зарегистрированный клиент, то посмотреть информацию о Ваших заказах можете в <NavLink to={LK_ROUTE}>личном кабинете</NavLink>, а все возникшие вопросы направляйте в <NavLink to={SUPPORT_ROUTE}>тех. поддержку.</NavLink></p>

                <p>Если Вы НЕ зарегистрированный клиент, тогда обращайтесть по номеру {ReactHtmlParser(PHONE_ONE)}, либо направляйте возникающие вопросы на email адрес {ReactHtmlParser(MAIL)}</p>
                
                <p>Чек с информацией о Вашем заказе будет отправлен на указанный email{email && ` (${email})`}.</p>

            </div>
        </InfoPage>
    )
}

export default CongratulationPage
