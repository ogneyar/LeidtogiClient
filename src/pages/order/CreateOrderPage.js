import React, { useState, useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import DeliverySdek from '../../components/delivery/sdek/DeliverySdek'
import Payment from '../../components/payment/Payment'
import { Context } from '../..'
import { Input } from '../../components/myBootstrap'
import { LOGIN_ROUTE, SCROLL_TOP } from '../../utils/consts'
import Loading from '../../components/Loading'
import scrollUp from '../../utils/scrollUp'
import InfoPage from '../info/InfoPage'
import './CreateOrderPage.css'


const CreateOrderPage = () => {
    
    const { user } = useContext(Context)
    
    const [amount, setAmount] = useState(0)

    const [ choiseDelivery, setСhoiseDelivery ] = useState(true)
    const [ load, setLoad ] = useState(false)
    const [ payment, setPayment ] = useState(false)
    const [ email, setEmail ] = useState("")
    const [ client, setClient ] = useState("")
    const [ newEmail, setNewEmail ] = useState("")
    const [ address, setAddress ] = useState("")
    const [ deliverySum, setDeliverySum ] = useState("")

    const [ message, setMessage ] = useState("")

    useEffect(() => {
        let cart = localStorage.getItem('cart')
        if (cart) {
            cart = JSON.parse(cart)
            let totalValue = 0
            cart.forEach(i => totalValue += i.total)
            setAmount(totalValue)
        }
    }, [])

    useEffect(() => {
        if (user?.user?.email) {
            setEmail(user.user?.email)
        }
        if (user?.user?.id) {
            setClient(user.user.id);
        }
    }, [user?.user])

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
                            <label>Нам нужен Ваш Email</label>
                            <Input value={newEmail} onChange={e => setNewEmail(e.target.value)} />
                            <span>чтобы мы могли отправить на него чек, как того требует ФЗ №54</span>
                            <div>
                                или <NavLink to={LOGIN_ROUTE}>войдите</NavLink>, если Вы зарегистрированы!
                            </div>
                            <Button size="lg" onClick={()=>{newEmail && setEmail(newEmail)}}>Далее</Button>
                        </div>
                    :
                        choiseDelivery 
                        ?
                            load
                            ? <Loading />
                            :
                            <div className="CreateOrderPageChoiseDelivery" >
                                <div>
                                    <p>Из города Курск</p>
                                    <Payment 
                                        text="Самовывоз" 
                                        variant="success" 
                                        load={load} 
                                        setLoad={setLoad} 
                                        amount={amount} 
                                        email={email} 
                                        client={client} 
                                        setMessage={setMessage}
                                    />
                                </div>
                                <label>или&nbsp;</label>
                                <Button 
                                    size="lg" 
                                    onClick={()=>{
                                        setСhoiseDelivery(false)
                                        setPayment(false)
                                        setMessage("")
                                        scrollUp(SCROLL_TOP)
                                    }}
                                >
                                    С доставкой
                                </Button>
                            </div>
                        :
                            payment
                            ? 
                                <div className="CreateOrderPagePayment" >
                                    <p>Адрес склада СДЭК: {address}</p>
                                    <p>Товара на сумму: {amount}</p>
                                    <p>Доставка на сумму: {deliverySum}</p>
                                    <p style={{fontSize:"20px"}}>Итого к оплате: {amount + deliverySum}</p>

                                    <Payment 
                                        address={address}
                                        deliverySum={deliverySum} 
                                        // amount={props?.amount} 
                                        email={email}
                                        client={client}
                                        setMessage={setMessage}
                                    />
                                </div>
                            : 
                                <div className="CreateOrderPageDeliverySdek" >
                                    <DeliverySdek 
                                        setAddress={setAddress} 
                                        setPayment={setPayment} 
                                        setDeliverySum={setDeliverySum} 
                                    />
                                </div>
                    }

                </div>

            </div>
                
        </InfoPage>
    )
}

export default observer(CreateOrderPage)
