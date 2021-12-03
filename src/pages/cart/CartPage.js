import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'

import { API_URL } from '../../utils/consts'
import { Container, Button } from '../../components/myBootstrap'
// eslint-disable-next-line
import Delivery from '../../components/delivery/Delivery'
// eslint-disable-next-line
import Payment from '../../components/payment/Payment'
import NullCart from './NullCart'

import './CartPage.css'
import Loading from '../../components/Loading'
import CreateOrder from '../../components/order/CreateOrder'
import Confirm from '../../components/myBootstrap/Confirm'


const Cart = () => {

    const [state, setState] = useState([])
    const [amount, setAmount] = useState(0)
    const [loading, setLoading] = useState(true)

    const [showConfirm, setShowConfirm] = useState(false)
    const [response, setResponse] = useState(null)
    const [item, setItem] = useState(null)

    let cart

    useEffect(() => {
        // eslint-disable-next-line
        cart = localStorage.getItem('cart')
        if (cart) {
            cart = JSON.parse(cart)
            setState(cart)
            let totalValue = 0
            cart.forEach(i => totalValue += i.total)
            setAmount(totalValue)
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        if (response && response === "yes" && item) {
            let cart = localStorage.getItem('cart')
            cart = JSON.parse(cart)
            if (cart.length === 1) {
                localStorage.removeItem('cart')
                setState(null)
                setAmount(0)
            }else {
                let totalValue = 0
                cart = cart.filter(i => {
                    if (i.id !== item.id) {
                        totalValue += i.total
                        return true
                    }
                    return false
                })
                setState(cart)
                setAmount(totalValue)
                localStorage.setItem('cart', JSON.stringify(cart))
            }
            setResponse(null)
            setItem(null)
        }else if (response && response === "no"){
            setResponse(null)
            setItem(null)
        }
    }, [response, item])

    const editValue = (action, item) => {
        cart = localStorage.getItem('cart')
        if (cart) {
            cart = JSON.parse(cart)
            let totalValue = 0
            cart = cart.map(i => {
                if (i.id === item.id) {
                    let newValue = 0
                    if (action === "plus") newValue = i.value + 1
                    else if (action === "minus") newValue = i.value - 1
                    if (newValue === 0) newValue = 1
                    let newTotal = newValue * i.price
                    totalValue += newTotal
                    return {...i, value: newValue, total: newTotal}
                }
                totalValue += i.total
                return i
            })
            setState(cart)
            setAmount(totalValue)
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }

    const onClickButtonPlus = (item) => {
        editValue("plus",item)
    }

    const onClickButtonMinus = (item) => {
        editValue("minus",item)
    }
    
    const onClickButtonDelete = (item) => {
        // let yes = window.confirm(`Вы уверены, что хотите удалить товар из корзины?`)
        setShowConfirm(true)
        setItem(item)
        
    }

    if (loading) return <Loading />

    if (!state || !Array.isArray(state) || state[0]?.id === undefined) return <NullCart /> 

    return (
        <Container 
            className="CartPage"
        >
            <Card 
                className="CartCard"
            >
                <Card.Title className="CardTitle">
                    <h4>Корзина / Оформление товара</h4>
                </Card.Title>

                <table className="CartTable">
                    <thead>
                        <tr>
                            <th>№:</th>
                            <th>Наим. товара:</th>
                            <th className="CartHide">Фото:</th>
                            <th>Цена:</th>
                            <th>Кол-во:</th>
                            <th>Итого:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state && Array.isArray(state) && state.map((i,index) => {
                            return (
                                <tr
                                    key={i.id}
                                >
                                    <th>
                                        <div
                                            className="CartThDivRow"
                                        >
                                            {index+1}
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            className="CartThDivRow"
                                        >
                                            {i.name}
                                        </div>
                                    </th>
                                    <th className="CartHide">
                                        <div
                                            className="CartThDivRow"
                                        >
                                            <img src={API_URL + i.img} width="50" alt={i.name} />
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            className="CartThDivRow"
                                        >
                                            {i.price}
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            className="d-flex flex-column align-items-center"
                                        >
                                            <div
                                                className="CartThDivRow"
                                            >
                                                <Button
                                                    className="CartButtonValue"
                                                    onClick={() => onClickButtonMinus(i)}
                                                >
                                                    -
                                                </Button>
                                                <div
                                                    className="CartValue"
                                                >
                                                    {i.value}
                                                </div>

                                                <Button
                                                    className="CartButtonValue"
                                                    onClick={() => onClickButtonPlus(i)}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                            <Button
                                                className="CartButtonDelete"
                                                onClick={() => onClickButtonDelete(i)}
                                                variant="danger"
                                            >
                                                Удалить
                                        </Button>
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            className="CartThDivRow"
                                        >
                                            {i.total}
                                        </div>
                                    </th>
                                </tr>
                            )
                        })}
                        <tr>
                            <th></th>
                            <th></th>
                            <th className="CartHide"></th>
                            <th></th>
                            <th>Итого:</th>
                            <th>
                                <div
                                    className="CartThDivRow"
                                >
                                    {amount}
                                </div>
                                
                            </th>
                        </tr>
                    </tbody>
                </table>
                
                {/* <Payment amount={amount} />  */}

                {/* <Delivery /> */}

                <br />
                <hr />

                <CreateOrder 
                    // amount={amount} 
                    setLoad={() => setLoading(true) } 
                /> 

            </Card>

            <Confirm 
                show={showConfirm} 
                onHide={() => setShowConfirm(false)} 
                setResponse={setResponse} 
                message={`Вы уверены, что хотите удалить товар из корзины?`}
            />

        </Container>
    )

}

export default Cart