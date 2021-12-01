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
                if (data[0] !== undefined) {
                    setOrders(data.filter(i => i?.pay))
                    // setOrders(data)
                }
            })
        }
    }, [user?.user])

    return (
        <div style={{padding: "20px 0"}} >
            {oders && Array.isArray(oders) && oders.length > 0
            ? 
                <div>
                    <h4 style={{marginBottom: "20px"}} >Ваши заказы:</h4>
                    {/* <br /> */}
                    {oders.map(i => 
                        <p style={{margin:"10px 0"}} >
                            Номер: {i.id} - 
                            {i?.pay 
                            ? 
                            <>
                                оплачен., статус:&nbsp;
                                {i?.state === "forming" && "формируется..."}
                            </>
                            : 
                                "не оплачен."
                            }
                        </p>
                    )}
                </div>
            :
                <div>У Вас ещё нет заказов...</div>
            }
        </div>
    )
}

export default observer(OrdersInfo)
