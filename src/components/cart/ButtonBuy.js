import React, { useState } from 'react'
import { useHistory } from 'react-router'
import $ from 'jquery'

import { onClickButtonBuy } from '../../service/cart/CartBuyService'
import Notification from '../myBootstrap/Notification'
// eslint-disable-next-line
import { Button, NavLink } from '../myBootstrap'
import { CART_ROUTE } from '../../utils/consts'
import './ButtonBuy.css'


const ButtonBuy = (props) => {

    const [notificationVisible, setNotificationVisible] = useState(false)

    const history = useHistory()

    let className
    if (props?.className) className = props?.className

    return (
        <>
        <Button
            className={"ButtonBuy "+className}
            variant="outline-warning"
            onClick={e => {
                setNotificationVisible(true)
                onClickButtonBuy(e, props?.product)
            }}
        >
            {props.children}
        </Button>

        <Notification 
            show={notificationVisible} 
            onHide={() => setNotificationVisible(false)}
            className="ButtonBuyNotification"
            time="10000"
        >
            <div
                className="NotificationDiv"
            >
                {/* Товар добавлен в&nbsp;<NavLink to={CART_ROUTE}><span>корзину</span></NavLink>! */}
                Товар добавлен в корзину!
            </div>

            <div
                className="NotificationDivButtons"
            >
                <Button
                    variant="outline-success"
                    onClick={() => {
                        history.push(CART_ROUTE)
                        $('html, body').animate(
                            {
                                scrollTop: 200
                            }, 
                            700, 
                            function(){}
                        )
                    }}
                >
                    ОФОРМИТЬ ЗАКАЗ!
                </Button>
                
                <Button
                    variant="outline-primary"
                    onClick={() => setNotificationVisible(false)}
                >
                    Продолжить покупки
                </Button>
            </div>
        </Notification>
        </>
    )
}

export default ButtonBuy
