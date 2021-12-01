import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react-lite'
import { Button } from 'react-bootstrap'

import PersonalInfo from '../../components/lk/PersonalInfo'
import OrdersInfo from '../../components/lk/OrdersInfo'
import { LOGIN_ROUTE } from '../../utils/consts'
import InfoPage from '../info/InfoPage'
import Error from '../error/ErrorPage'
import { Context } from '../..'
import './LkPage.css'


const Lk = observer(() => {

    const { user } = useContext(Context)

    const history = useHistory()
    
    const [ redirect, setRedirect ] = useState(false)

    const [ ordersInfo, setOrdersInfo ] = useState(false)
    const [ personalInfo, setPersonalInfo ] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem("token")
        if (!token) setRedirect(true)
    },[])

    if (redirect) history.push(LOGIN_ROUTE)

    if (!user?.user?.isActivated) {
        return (
            <InfoPage>
                <div className="Lk" style={{textAlign:"center"}}>
                    <label>{user?.user?.name ? user.user.name : "Уважаемый клиент"}, добро пожаловать в личный кабинет!</label>
                    <hr/>
                    <p>Для продолжения Вам необходимо подтвердить свой почтовый ящик <span style={{color:"green"}}>{user.user.email}</span>.</p>
                    <p>Вам на него отправлена ссылка для активации аккаунта.</p>
                    <p>Если письмо не пришло проверьте папку СПАМ.</p>
                    {/* <p>Если и в папке СПАМ письма нет, напишите нам в тех.поддержку.</p> */}
                </div>
            </InfoPage>
        )
    }

    if (user?.user?.name) {
        return (
            <InfoPage>
                <div className="Lk">
                    <label>{user?.user?.name}, добро пожаловать в личный кабинет!</label>
                    <hr/>

                    {!ordersInfo && !personalInfo 
                    ? 
                    <div
                        className="LkCards"
                    >
                        <div
                            className="LkCards_Card" 
                            onClick={() => setOrdersInfo(true)}
                        >
                            <div>
                                Заказы
                            </div>
                        </div>
                        <div
                            className="LkCards_Card" 
                            onClick={() => setPersonalInfo(true)}
                        >
                            <div>
                                Личные данные
                            </div>
                        </div>
                    </div>
                    :
                    <div style={{textAlign: "left"}}>
                        <Button variant="outline-success" onClick={() => {setOrdersInfo(false);setPersonalInfo(false)}}>Вернуться назад</Button>
                        <hr />
                    </div>
                    }

                    {ordersInfo && <OrdersInfo back={() => setOrdersInfo(false)} />}
                    {personalInfo && <PersonalInfo back={() => setPersonalInfo(false)} />}

                </div>
            </InfoPage>
        )
    }else return <Error />
})

export default Lk
