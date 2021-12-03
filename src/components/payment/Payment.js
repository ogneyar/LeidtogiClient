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

    // const [ response, setResponse ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    
   
    useEffect(() => {

    // eslint-disable-next-line
    },[])

    const onClickButtonPay = async () => {
        props?.setMessage("")
        // запустить лоадер во внешнем компоненте
        if (props?.load !== undefined) props?.setLoad(true)
        // запустить лоадер в этом компоненте
        setLoading(true)
        // достаём корзину товаров из localStorage
        let cart = localStorage.getItem("cart")
        
        let order = {cart, email: props?.email, url: URL}
        if (props?.deliverySum) order = {...order, deliverySum: props?.deliverySum}
        if (props?.address) order = {...order, address: props?.address, delivery: "sdek"}
        if (props?.client) order = {...order, client: props?.client}
        
        let open = false
        await createOrder(order)
            .then(
                data => {
                    if (data?.error) {
                        // бывает ошибка в таком формате
                        if (data.error?.error) props?.setMessage(data.error.error)
                        // а бывает в таком
                        else props?.setMessage(data.error)
                    }else if (data?.errorCode) {
                        // в таком виде ошибка прилетает от банка
                        props?.setMessage(data?.errorMessage)
                    }else if (data?.formUrl) {

                        window.open(URL + 'pay?redirect_url=' + data.formUrl,'_self',false)
                        open = true

                    }else {
                        props?.setMessage("Не предвиденная ошибка! Error: " + data.toString())
                    }
                },
                error => {
                    console.log("error",error);
                    props?.setMessage(error.message)
                   
                })
            .finally(() => {
                if (!open) {
                    // остановить лоадер во внешнем компоненте
                    if (props?.load !== undefined) props?.setLoad(false)
                    // остановить лоадер в этом компоненте
                    setLoading(false)
                }
            })
    }

    return (
        <div className="Payment" id="Payment">

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
