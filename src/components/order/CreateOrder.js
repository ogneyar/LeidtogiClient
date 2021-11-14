import React, { useState, useContext, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import DeliverySdek from '../delivery/sdek/DeliverySdek'
import Payment from '../payment/Payment'
import {Context} from '../..'
import { Input } from '../myBootstrap'
import Loading from '../Loading'
import './CreateOrder.css'


const CreateOrder = observer((props) => {

    const { user } = useContext(Context)

    const [ choiseDelivery, setСhoiseDelivery ] = useState(true)
    const [ load, setLoad ] = useState(false)
    const [ payment, setPayment ] = useState(false)
    const [ visibleModal, setVisibleModal ] = useState(false)
    const [ email, setEmail ] = useState("")
    const [ client, setClient ] = useState("")
    const [ newEmail, setNewEmail ] = useState("")
    const [ address, setAddress ] = useState("")
    const [ deliverySum, setDeliverySum ] = useState("")

    const [ message, setMessage ] = useState("")

    const onHideModal = () => {
        // let alfaPaymentButton = document.getElementById("alfa-payment-button")
        // alfaPaymentButton.style.display = "none"
        setVisibleModal(false)
    }

    useEffect(() => {
        if (user?.user?.email) {
            setEmail(user.user?.email)
        }
        if (user?.user?.id) {
            setClient(user.user.id);
        }
    }, [user?.user])

    return (
        <div
            className="CreateOrder"
        >
            <Button
                onClick={() => {setVisibleModal(true);setСhoiseDelivery(true)}}
                className="CreateOrderButton"
                size="lg"
                variant="success"
            >
                Оформить заказ
            </Button>

            <Modal 
                show={visibleModal} 
                onHide={onHideModal}
                centered
                aria-labelledby="contained-modal-title-vcenter"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Формирование заказа
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {message ? <label style={{color:"red",paddingLeft:"20px"}}>{message}</label> : null}

                    {!email
                    ?
                        <div className="CreateOrderInputEmail" >
                            <label>Нам нужен Ваш Email</label>
                            <Input value={newEmail} onChange={e => setNewEmail(e.target.value)} />
                            <span>чтобы мы могли отправить на него чек, как того требует ФЗ №54</span>
                            <Button size="lg" onClick={()=>{newEmail && setEmail(newEmail)}}>Далее</Button>
                        </div>
                    :
                        choiseDelivery 
                        ?
                            load
                            ? <Loading />
                            :
                            <div className="CreateOrderChoiseDelivery" >
                                <label style={{position:"relative"}}>
                                    <p style={{position:"absolute",bottom:"-40px",left:"10px"}}>Из города Курск</p>
                                    {/* <Button size="lg" onClick={()=>{setСhoiseDelivery(false);setPayment(true)}}>Самовывоз</Button> */}
                                    <Payment 
                                        text="Самовывоз" 
                                        variant="success" 
                                        load={load} 
                                        setLoad={setLoad} 
                                        amount={props?.amount} 
                                        email={email} 
                                        client={client} 
                                        setMessage={setMessage}
                                    />
                                </label>
                                <Button size="lg" onClick={()=>{setСhoiseDelivery(false);setPayment(false);setMessage("")}}>С доставкой</Button>
                            </div>
                        :
                            payment
                            ? 
                                <div className="CreateOrderPayment" >
                                    <p>Адрес склада СДЭК: {address}</p>
                                    <p>Товара на сумму: {props?.amount}</p>
                                    <p>Доставка на сумму: {deliverySum}</p>
                                    <p style={{fontSize:"20px"}}>Итого к оплате: {props?.amount + deliverySum}</p>

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
                                <div className="CreateOrderDeliverySdek" >
                                    <DeliverySdek setAddress={setAddress} setPayment={setPayment} setDeliverySum={setDeliverySum} />
                                </div>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={onHideModal}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
})

export default CreateOrder
