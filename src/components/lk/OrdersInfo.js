import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { getOrderForUser } from '../../http/orderAPI'

import { Context } from '../..'


const OrdersInfo = () => {
        
    const { user } = useContext(Context) 

    const [ oders, setOrders ] = useState(null)

    useEffect(() => {
        if (user?.user?.id) {
            getOrderForUser(user.user.id).then(data => {
                if (data[0] !== undefined) setOrders(data)
            })
        }
    }, [user?.user])

    return (
        <div
            style={{padding: "20px 0"}}
        >            
            {oders && Array.isArray(oders) 
            ? 
                <div>
                    <h2>Ваши заказы.</h2>
                    {oders.map(i => {
                        if (i?.pay) {
                            return (
                                <p>Номер: 000{i.id} - оплачен, статус: {i?.state === "forming" && "Формируется."}</p>
                            )
                        }else return null
                    })}
                </div>
            :
                <div>У Вас ещё нет заказов...</div>
            }
        </div>
    )
}

export default observer(OrdersInfo)
