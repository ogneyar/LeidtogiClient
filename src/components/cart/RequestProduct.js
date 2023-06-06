// RequestProduct
import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router'

import { API_URL, URL, SHOP_ROUTE } from '../../utils/consts'
import Notification from '../myBootstrap/Notification'
import { sendRequestProduct } from '../../http/mailAPI'
import scrollUp from '../../utils/scrollUp'
import Phone from '../helpers/phone/Phone'
import Email from '../helpers/email/Email'
import { Button } from '../myBootstrap'
import Loading from '../Loading'

import { Context } from '../..'
import './RequestProduct.css'


const RequestProduct = (props) => { 
    
    const context = useContext(Context)

    const [ notificationVisible, setNotificationVisible ] = useState(false)

    const [ loading, setLoading ] = useState(false)
    const [ success, setSuccess ] = useState(false)

    const [ image ] = useState(API_URL + props?.product?.img[0]?.big)

    const [ url ] = useState(props?.product?.url)
    const [ nameProduct ] = useState(props?.product?.name)
    const [ article ] = useState(props?.product?.article)
    const [ brand ] = useState(() => {
        let response
        context.brandStore.brands.forEach(i => {
            if (i.id === props?.product?.brandId) response = i.name
        })
        return response
    })

    const [ name, setName ] = useState("")
    const [ phone, setPhone ] = useState("")
    const [ email, setEmail ] = useState("")
    

    const history = useHistory()

    let className
    if (props?.className) className = props?.className


    const onClickRequestProduct = async () => {
        if ( ! name ) {
            window.alert("Необходимо ввести имя.")
        }else if ( ! phone || phone.replace(/\D/g, "").length < 10 ) {
            window.alert("Необходимо ввести номер телефона (10ть чисел).")
        }else if ( ! email || email.indexOf("@") === -1 || email.indexOf(".") === -1 ) {
            window.alert("Необходимо ввести почту вида email@mail.ru.")
        }else {
            setLoading(true)
            await sendRequestProduct({
                url: URL + brand.toLowerCase() + "/" + url,
                name,
                phone,
                email,
                nameProduct,
                article,
                brand
            })
            setLoading(false)
            setSuccess(true)
        }
    } 


    return (
        <>
        <Button
            className={"RequestProduct "+className}
            variant="outline-warning"
            onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                setNotificationVisible(true)
            }}
        >
            {props.children}
        </Button>

        <Notification 
            show={notificationVisible} 
            onHide={() => {
                setSuccess(false)
                setLoading(false)
                setName("")
                setPhone("")
                setEmail("")
                setNotificationVisible(false)
            }}
            time="600000" // в милисекундах
            size="lg"
            title="Заказ товара!"
            titleMore={success ? "Успех" : "Укажите своё имя, номер и почту."}
        >
            {loading ? <Loading /> 
            :
            success ? // если заказ отправлен
            <div
                className="RequestProductSuccess"
            >
                <label>Заказ успешно отправлен, ожидайте, с Вами свяжутся.</label>
                <br /><br />
                <Button
                    variant="outline-primary"
                    onClick={() => {
                        setSuccess(false)
                        setNotificationVisible(false)
                        history.push(SHOP_ROUTE)
                        scrollUp(200)
                    }}
                >
                    Хорошо
                </Button>
            </div>
            : // когда запрос ещё не отправлялся
            <div
                className="RequestProductNotification"
            >
                <div
                    className="RequestProductNotification_Cart"
                >
                    <div
                        className="RequestProductNotification_Cart_product"
                    >
                        <div
                            className="RequestProductNotification_Cart_product_image"
                        >
                            <img src={image} width={window.innerWidth < 400 ? "100" : "200"} alt="изображение товара" />
                        </div>
                        <div>
                            <div
                                className="RequestProductNotification_Cart_product_name"
                            >
                                {nameProduct}
                            </div>
                            {window.innerWidth > 400 && <br />}
                            <div
                                className="RequestProductNotification_Cart_product_article"
                            >
                                артикул: {article}
                            </div>
                            {window.innerWidth > 400 && <br />}
                            <div
                                className="RequestProductNotification_Cart_product_brand"
                            >
                                бренд: {brand}
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="RequestProductNotification_fields"
                >
                    <table>
                        <tr>
                            <td><label>Ваше имя&nbsp;<span style={{color:"red"}}>*</span></label>&nbsp;</td>
                            <td>
                                <input 
                                    type="text" 
                                    placeholder="Введите имя" 
                                    value={name} 
                                    onChange={e => {
                                        setName(e.target.value)
                                    }} 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Ваш номер телефона&nbsp;<span style={{color:"red"}}>*</span></label>&nbsp;</td>
                            <td>
                                <Phone phone={phone} setPhone={setPhone} placeholder="Номер телефона" withLabel={true} />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Ваша почта (email)&nbsp;<span style={{color:"red"}}>*</span></label>&nbsp;</td>
                            <td>
                                <Email email={email} setEmail={setEmail} placeholder="Введите email" withLabel={true} />
                            </td>
                        </tr>
                    </table>
                </div>


                <div
                    className="RequestProductNotification_DivButtons"
                >
                    <Button
                        variant="warning"
                        onClick={() => onClickRequestProduct() }
                    >
                        Оформить заказ!
                    </Button>
                    
                    <Button
                        variant="outline-primary"
                        onClick={() => setNotificationVisible(false)}
                    >
                        Продолжить покупки
                    </Button>
                </div>
            </div>
            }
        </Notification>
        </>
    )
}

export default observer(RequestProduct)
