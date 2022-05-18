import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router'

import scrollUp from '../../utils/scrollUp'
import { onClickButtonBuy } from '../../service/cart/CartBuyService'
import { CART_ROUTE, API_URL } from '../../utils/consts'
import Notification from '../myBootstrap/Notification'
import { Button } from '../myBootstrap'
import addDataLayer from '../../service/dataLayer/add'
import removeDataLayer from '../../service/dataLayer/remove'
// import priceFormater from '../../utils/priceFormater'

import { Context } from '../..'
import './ButtonBuy.css'



const ButtonBuy = (props) => { 
    
    const context = useContext(Context)

    const [notificationVisible, setNotificationVisible] = useState(false)
    
    const history = useHistory()

    const [ value, setValue ] = useState(1) // количество единиц товара
    const [ quantity, setQuantity ] = useState(1) // общее количество товаров в корзине

    let className
    if (props?.className) className = props?.className

    const onClickValue = (e, arg) => {
        if (arg === "plus") {
            let cart = onClickButtonBuy(e, props?.product)
            cart.then(data => {
                data.forEach(i => {
                    if (i.id === props?.product?.id) {
                        setValue(i.value)
                    }
                })
                context.cart.setCart(data)
            })
            addDataLayer({
                article: props?.product?.article,
                name: props?.product?.name,
                price: props?.product?.price,
                value: 1
            })
        }
        if (arg === "minus") {
            if (value > 1) {
                let cart = onClickButtonBuy(e, props?.product, "remove")
                cart.then(data => {
                    data.forEach(i => {
                        if (i.id === props?.product?.id) {
                            setValue(i.value)
                        }
                    })
                    context.cart.setCart(data)
                })
                removeDataLayer({
                    article: props?.product?.article,
                    name: props?.product?.name,
                    price: props?.product?.price,
                    value: 1
                })
            }
        }
        if (arg === "delete") {
            let cart = onClickButtonBuy(e, props?.product, "delete")
            cart.then(data => {
                setQuantity(data.length)
                setNotificationVisible(false)
                context.cart.setCart(data)
            })
            removeDataLayer({
                article: props?.product?.article,
                name: props?.product?.name,
                price: props?.product?.price,
                value
            })
        }
    }

    return (
        <>
        <Button
            // это временный запрет на покупку товаров (в связи с обновлением цен)
            // disabled={props?.product?.brandId === 2} // 2 - это Husqvarna
            className={"ButtonBuy "+className}
            variant="outline-warning"
            onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                setNotificationVisible(true)
                if (props?.product) {
                    addDataLayer({
                        article: props?.product?.article,
                        name: props?.product?.name,
                        price: props?.product?.price,
                        value: 1
                    })
                }
                
                let cart = onClickButtonBuy(e, props?.product)
                cart.then(data => {
                    data.forEach(i => {
                        if (i.id === props?.product?.id) {
                            setValue(i.value)
                        }
                    })
                    setQuantity(data.length)
                    context.cart.setCart(data)
                })
            }}
        >
            {props.children}
        </Button>

        <Notification 
            show={notificationVisible} 
            onHide={() => setNotificationVisible(false)}
            time="600000" // в милисекундах
            size="lg"
            title="Товар добавлен в корзину!"
            titleMore={"Товаров в корзине: " + quantity}
        >
            <div
                className="ButtonBuyNotification"
            >
                <div
                    className="NotificationCart"
                >
                    <div
                        className="NotificationCart_product"
                    >
                        <div>
                            {props?.product?.img && typeof(props?.product?.img) === "string"
                            ? 
                                <img 
                                    src={API_URL + JSON.parse(props.product.img)[0]?.big} 
                                    width="200" 
                                    alt="изображение товара" 
                                />
                            :
                            <img src={API_URL + props.product.img[0]?.big} width="200" alt="изображение товара" />
                            }
                        </div>
                        <div
                            className="NotificationCart_product_body"
                        >
                            <div
                                className="NotificationCart_product_name"
                            >
                                {props?.product?.name}
                            </div>
                            <br />
                            <div
                                className="NotificationCart_product_article"
                            >
                                артикул: {props?.product?.article}
                            </div>
                        </div>
                    </div>
                    <div
                        className="NotificationCart_price"
                    >
                        <div>
                            <label>Цена</label>
                            {/* {priceFormater(props?.product?.price)}&nbsp;р. */}
                            {props?.product?.price}&nbsp;р.
                        </div>
                        <div className="NotificationCart_price_value">
                            <label>Количество</label>
                            
                            <small onClick={(e) => onClickValue(e, "minus")} className="NotificationCart_price_value_minus">-</small>
                            <small className="NotificationCart_price_value_data">{value}</small>
                            <small onClick={(e) => onClickValue(e, "plus")} className="NotificationCart_price_value_plus">+</small>
                        </div>
                        <div>
                            <label>Итого</label>
                            {/* {priceFormater(props?.product?.price * value)}&nbsp;р. */}
                            {props?.product?.price * value}&nbsp;р.
                        </div>
                        <div>
                            <label>&nbsp;</label>
                            <span onClick={(e) => onClickValue(e, "delete")} className="NotificationCart_price_delete"><i className="fa fa-window-close" aria-hidden="true"></i></span>
                        </div>
                    </div>
                </div>

                <div
                    className="NotificationDivButtons"
                >
                    <Button
                        // variant="outline-warning"
                        variant="warning"
                        onClick={() => {
                            history.push(CART_ROUTE)
                            scrollUp(200)
                        }}
                    >
                        Перейти в корзину!
                    </Button>
                    
                    <Button
                        variant="outline-primary"
                        onClick={() => setNotificationVisible(false)}
                    >
                        Продолжить покупки
                    </Button>
                </div>
            </div>
        </Notification>
        </>
    )
}

export default observer(ButtonBuy)
