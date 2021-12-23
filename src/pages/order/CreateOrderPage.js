import React, { useState, useContext, useEffect, useRef } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Form } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

// import DeliverySdek from '../../components/delivery/sdek/DeliverySdek'
import Delivery from '../../components/delivery/Delivery'
import Payment from '../../components/payment/Payment'
import { Context } from '../..'
// import { Input } from '../../components/myBootstrap'
// eslint-disable-next-line
import { LOGIN_ROUTE, CREATE_ORDER_ROUTE, SCROLL_TOP, SCROLL_TOP_MOBILE, REGISTRATION_ROUTE, ADDRESS, PHONE_ONE, MAIL } from '../../utils/consts'
import Loading from '../../components/Loading'
import scrollUp from '../../utils/scrollUp'
import InfoPage from '../info/InfoPage'
import './CreateOrderPage.css'


const CreateOrderPage = () => {
    
    const { user, cart } = useContext(Context)

    const refPhone = useRef()

    const [amount, setAmount] = useState(0)

    const [ choiseDelivery, setСhoiseDelivery ] = useState(true)
    const [ load, setLoad ] = useState(true)
    const [ payment, setPayment ] = useState(false)
    const [ pickup, setPickup ] = useState(false)
    const [ email, setEmail ] = useState("")
    const [ client, setClient ] = useState("")
    const [ newEmail, setNewEmail ] = useState("")
    const [ address, setAddress ] = useState("")
    const [ deliverySum, setDeliverySum ] = useState("")
    const [ delivery, setDelivery ] = useState("sdek")
    
    const [ phone, setPhone ] = useState("")
    const [ phoneSelection, setPhoneSelection ] = useState(0)
    const [ name, setName ] = useState("")

    const [ message, setMessage ] = useState("")

    useEffect(() => {
        // let basket = localStorage.getItem('cart')
        // if (basket) {
        //     basket = JSON.parse(basket)
        //     let totalValue = 0
        //     basket.forEach(i => totalValue += i.total)
        //     setAmount(totalValue)
        // }
        if (cart?.cart) {
            let totalValue = 0
            cart?.cart.forEach(i => totalValue += i.total)
            setAmount(totalValue)
        }
    }, [cart?.cart])

    useEffect(() => {
        if (user?.user?.email) {
            setEmail(user.user?.email)
            setLoad(false)
        }
        if (user?.user?.id) {
            setClient(user.user.id);
        }
       
    }, [user?.user, user?.loading])

    useEffect(() => {
        if (user?.loading === false && !localStorage.getItem('token')) {
            setLoad(false)
        }
    }, [user?.loading])
    

    useEffect(() => {
        if (refPhone && refPhone.current?.selectionStart && refPhone.current?.selectionEnd) {
            refPhone.current.selectionStart = phoneSelection
            refPhone.current.selectionEnd = phoneSelection
        }
    },[phone, phoneSelection])

    
    const phoneFunction = (e) => {
        let val = e.target.value
        let offset = 0
        let start = e.target.selectionStart
        let length = val.length
        let lastLength = phone.length
        val = val.match(/\d/g).join('')
        let numberLength = val.length
        if (Number(val) || val === "") {
            switch(numberLength) {
                case 4:
                    val = "(" + val[0] + val[1] + val[2] + ") " + val[3]
                    if (start === length) offset = 3
                break
                case 5:
                    val = "(" + val[0] + val[1] + val[2] + ") " + val[3] + val[4]
                break
                case 6:
                    val = "(" + val[0] + val[1] + val[2] + ") " + val[3] + val[4] + val[5]
                break
                case 7:
                    val = "(" + val[0] + val[1] + val[2] + ") " + val[3] + val[4] + val[5] + "-" + val[6]
                    if (start === length) offset = 1
                break
                case 8:
                    val = "(" + val[0] + val[1] + val[2] + ") " + val[3] + val[4] + val[5] + "-" + val[6] + val[7]
                break
                case 9:
                    val = "(" + val[0] + val[1] + val[2] + ") " + val[3] + val[4] + val[5] + "-" + val[6] + val[7] + "-" + val[8]
                    if (start === length) offset = 1
                break
                case 10:
                    val = "(" + val[0] + val[1] + val[2] + ") " + val[3] + val[4] + val[5] + "-" + val[6] + val[7] + "-" + val[8] + val[9]
                break
                default:
                break
            }

            if (start !== length) {
                switch(start) {
                    case 1:
                        if (lastLength < length) offset = 1
                    // eslint-disable-next-line
                    case 2:
                    case 3:
                        if (lastLength > length && numberLength === 3) offset = -1
                    break
                    case 5:
                        offset = 2
                    break
                    case 10:
                    case 13:
                        if (lastLength < length) offset = 1
                    break
                    default:
                    break
                }
            }

            setPhone(val.toString())
            setPhoneSelection(start + offset)

        }else setPhoneSelection(start)
    }
    

    if (load) return <Loading />

    return (
        <InfoPage
            width={800}
        >

            <div className="CreateOrderPage">
                
                <div className="CreateOrderPageTitle">
                    Формирование заказа
                </div>

                <div className="CreateOrderPageBody">

                    {message 
                    ? 
                        <label
                            className="CreateOrderPageBodyMessage"
                        >
                            {message}
                        </label> 
                    : null}

                    {!email
                    ?
                        <div className="CreateOrderPageInputEmail" >
                            <div>
                                Если Вы зарегистрированы на нашем сайте, то <NavLink to={LOGIN_ROUTE + "?returnUrl=" + CREATE_ORDER_ROUTE}>авторизуйтесь</NavLink>, тогда не надо будет повторно вводить Ваши данные и проще будет отследить Ваш заказ!
                            </div>

                            <label>Введите Ваше Ф.И.О.</label>
                            <Form.Control 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                                title="Введите Ваше Ф.И.О." 
                                placeholder="Ваше Ф.И.О." 
                            />
                            <span>&nbsp;</span>

                            <div className="d-flex flex-column">
                                <label>Укажите телефонный номер</label>
                                <div className="d-flex align-items-center" style={{padding:0,margin:0}}>
                                    <label style={{paddingTop:"5px"}}>+7&nbsp;</label>
                                    <Form.Control 
                                        ref={refPhone} 
                                        maxLength="15"
                                        value={phone} 
                                        onChange={e => phoneFunction(e)} 
                                        title="Введите телефонный номер без +7" 
                                        placeholder="(999) 888-77-66" 
                                    />
                                </div>
                                <span>чтобы мы могли с вами связаться</span>
                            </div>

                            <label>Ваш Email</label>
                            <Form.Control 
                                value={newEmail} 
                                onChange={e => setNewEmail(e.target.value)} 
                                title="Введите Ваш email" 
                                placeholder="Ваш email" 
                            />
                            <span>чтобы мы могли отправить на него чек, как того требует ФЗ №54</span>

                            <br />

                            {/* <div>
                                или <NavLink to={REGISTRATION_ROUTE}>зарегистрируйтесь</NavLink>, если не зарегистрированы!
                            </div> */}

                            <Button 
                                disabled={!newEmail || !phone || !name}
                                size="lg" 
                                onClick={()=>{
                                    setEmail(newEmail)
                                    window.innerWidth > 991 ? scrollUp(SCROLL_TOP) : scrollUp(SCROLL_TOP_MOBILE)
                                }}
                            >
                                Далее
                            </Button>

                        </div>
                    :
                        choiseDelivery 
                        ?
                            <div className="CreateOrderPageChoiseDelivery" >
                                <div>
                                    <p>Из города Курск</p>
                                    <Button 
                                        variant="success"
                                        size="lg" 
                                        onClick={()=>{
                                            setСhoiseDelivery(false)
                                            setPickup(true)
                                            setMessage("")
                                            window.innerWidth > 991 ? scrollUp(SCROLL_TOP) : scrollUp(SCROLL_TOP_MOBILE)
                                        }}
                                    >
                                        Самовывоз
                                    </Button>
                                </div>
                                <label>&nbsp;или&nbsp;</label>
                                <Button 
                                    size="lg" 
                                    onClick={()=>{
                                        setСhoiseDelivery(false)
                                        setPayment(false)
                                        setMessage("")
                                        window.innerWidth > 991 ? scrollUp(SCROLL_TOP) : scrollUp(SCROLL_TOP_MOBILE)
                                    }}
                                >
                                    С доставкой
                                </Button>
                            </div>
                        :
                            pickup
                            ?
                                <div>
                                    <div className="CreateOrderPagePayment">
                                        {name && <p>Ваше имя: <strong>{name}</strong></p>}
                                        {phone && <p>Ваш телефон: <strong>+7&nbsp;{phone}</strong></p>}
                                        <p>Ваш email: <strong>{email}</strong></p>
                                        
                                        <p>Адрес офиса из которого осуществляется самовывоз:</p>
                                        <p><strong>{ADDRESS}</strong></p>

                                        <p>По всем возникающим вопросам обращайтесь по номеру:</p>
                                        <p><strong>{ReactHtmlParser(PHONE_ONE)}</strong></p>

                                        <p>Так же можете обращаться с любыми вопросами по email:</p>
                                        <p><strong>{ReactHtmlParser(MAIL)}</strong></p>
                                        <br />
                                        <p><strong>Ваш заказ:</strong></p>
                                        <div style={{border:"1px solid grey", padding:"15px 0 5px 0",width:"100%",textAlign:"center"}}>
                                            {cart?.cart.map(i => {
                                                if (i.name.length > 20) {
                                                    return <p>{i.name.substring(0,20)+"... - "+ i.value + "шт. - "}<strong>{i.price}р.</strong></p>
                                                }
                                                return <p>{i.name + i.value + "шт. - "}<strong>{i.price}р.</strong></p>
                                            })}
                                        </div>
                                        <br />
                                        <p>Итого к оплате: <strong>{amount}р.</strong></p>
                                    </div>
                                    <Payment 
                                        text="Оплатить картой" 
                                        variant="danger" 
                                        load={load} 
                                        setLoad={setLoad} 
                                        amount={amount} 
                                        email={email} 
                                        client={client} 
                                        name={name} 
                                        phone={"7" + phone.replace(/\D/g, "")} 
                                        setMessage={setMessage}
                                    />
                                </div>
                            :
                                !payment
                                ?
                                    <div className="CreateOrderPageDeliverySdek" >
                                        <Delivery 
                                            setAddress={setAddress} 
                                            setPayment={setPayment} 
                                            setDeliverySum={setDeliverySum} 
                                            setDelivery={setDelivery}
                                        />
                                    </div>
                                : 
                                <div>
                                    <div className="CreateOrderPagePayment">
                                        {name && <p>Ваше имя: <strong>{name}</strong></p>}
                                        {phone && <p>Ваш телефон: <strong>+7&nbsp;{phone}</strong></p>}
                                        <p>Ваш email: <strong>{email}</strong></p>
                                        
                                        <p>Адрес склада{delivery === "sdek" ? " СДЕК" : delivery === "boxberry" ? " Boxberry" : null }:</p>
                                        <p><strong>{address}</strong></p>
                                        <p>После оплаты с Вами свяжется наш менеджер и подскажет как отследить доставку, как вызвать курьера, когда ожидать прибытие Ваших покупок на склад.</p>

                                        <p>По всем возникающим вопросам обращайтесь по номеру:</p>
                                        <p><strong>{ReactHtmlParser(PHONE_ONE)}</strong></p>

                                        <p>Так же можете обращаться с любыми вопросами по email:</p>
                                        <p><strong>{ReactHtmlParser(MAIL)}</strong></p>
                                        <br />
                                        <p><strong>Ваш заказ:</strong></p>
                                        <div style={{border:"1px solid grey", padding:"15px 0 5px 0",width:"100%",textAlign:"center"}}>
                                            {cart?.cart.map(i => {
                                                if (i.name.length > 20) {
                                                    return <p>{i.name.substring(0,20)+"... - "+ i.value + "шт. - "}<strong>{i.price}р.</strong></p>
                                                }
                                                return <p>{i.name + i.value + "шт. - "}<strong>{i.price}р.</strong></p>
                                            })}
                                        </div>
                                        <br />
                                        {/* <p>Итого к оплате: <strong>{amount}р.</strong></p> */}
                                        
                                        <p>Товара на сумму: <strong>{amount}р.</strong></p>
                                        <p>Доставка на сумму: <strong>{deliverySum}р.</strong></p>

                                        <p style={{fontSize:"20px"}}>Итого к оплате: <strong>{amount + deliverySum}р.</strong></p>
                                    </div>
                                    <Payment 
                                        address={address}
                                        deliverySum={deliverySum} 
                                        delivery={delivery} 
                                        // amount={props?.amount} 
                                        email={email}
                                        client={client}
                                        name={name} 
                                        phone={"7" + phone.replace(/\D/g, "")} 
                                        setMessage={setMessage}
                                    />
                                </div>
                    }

                </div>

            </div>
                
        </InfoPage>
    )
}

export default observer(CreateOrderPage)
