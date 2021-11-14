// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
// import uuid from 'react-uuid'

// import Button from '../myBootstrap/Button'
import { createOrder } from '../../http/orderAPI'
import { URL } from '../../utils/consts'
import Loading from '../Loading'
import './Payment.css'


const Payment = (props) => {
    
    // eslint-disable-next-line
    // const [ uId, setUId ] = useState(uuid())

    const [ response, setResponse ] = useState(null)
    const [ loading, setLoading ] = useState(false)
   
    useEffect(() => {

    // eslint-disable-next-line
    },[])

    const onClickButtonPay = async () => {
        if (props?.load !== undefined) props?.setLoad(true)
        setLoading(true)
        let cart = localStorage.getItem("cart")

        let order = {cart, email: props?.email, url: URL}
        if (props?.deliverySum) order = {...order, deliverySum: props?.deliverySum}
        if (props?.address) order = {...order, address: props?.address, delivery: "sdek"}
        if (props?.client) order = {...order, client: props?.client}
        
        createOrder(order)
            .then(
                data => {
                    if (data?.error) {
                        if (data.error?.message) setResponse(data.error.message)
                        else setResponse(data.error)
                        if (props?.load !== undefined) props?.setLoad(false)
                        setLoading(false)
                    }else if (data.formUrl) {
                        window.open(data.formUrl,'_self',false);
                    }
                    else {
                        setResponse("Не предвиденная ошибка! Error: " + data.toString())
                        if (props?.load !== undefined) props?.setLoad(false)
                        setLoading(false)
                    }
                },
                error => {
                    setResponse(error.message)
                    if (props?.load !== undefined) props?.setLoad(false)
                    setLoading(false)
                }
            )
            // .finally(data => setLoading(false))
    }

    return (
        <div className="Payment" id="Payment">

            {response ? <label>{response}</label> : null}

            {loading
            ?
                <Loading />
            :
                <Button 
                    variant={props?.variant || "danger"}
                    size="lg"
                    onClick={onClickButtonPay}
                >
                    {props?.text ? props?.text : "Оплатить картой"}
                </Button>
            }
            

        </div>
    )
}

export default Payment
