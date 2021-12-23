import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { getOrderForUser } from '../../http/orderAPI'

import Loading from '../Loading'
import { ADDRESS } from '../../utils/consts'
import { Context } from '../..'
import './OrdersInfo.css'


const OrdersInfo = () => {
        
    const { user } = useContext(Context) 

    const [ oders, setOrders ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        if (user?.user?.id) {
            getOrderForUser(user.user.id)
                .then(data => {
                    if (data[0] !== undefined) {
                        setOrders(data.filter(i => i?.pay).reverse())
                    }
                })
                .finally(() => setLoading(false))
        }
    }, [user?.user])

    if (loading) return <Loading />

    return (
        <div
            className="OrdersInfo"
        >
            {oders && Array.isArray(oders) && oders.length > 0
            ? 
                <div>
                    <div className="OrdersInfo_Title">
                        <h4>Ваши заказы:</h4>
                    </div>
                    <div className="OrdersInfo_Body">
                        {oders.map(i => 
                            <p>
                                Номер:&nbsp;<strong>{i?.id}</strong> - оплачен.
                                <br />
                                Cтатус:&nbsp;
                                {i?.state === "forming" && <strong>формируется...</strong>} 
                                {i?.state === "onway" && <strong>в пути.</strong>} 
                                {i?.state === "delivered" && <strong>прибыл на склад.</strong>} 
                                {i?.state === "taken" && <strong>забран.</strong>} 
                                <br />
                                {i?.state !== "taken" && 
                                <>
                                    Доставка:&nbsp;
                                        {i?.delivery === "pickup" && <strong>самовывоз</strong>}
                                        {i?.delivery === "sdek" && <strong>СДЭК</strong>}
                                        {i?.delivery === "boxberry" && <strong>Боксбери</strong>}
                                        {i?.delivery === "dl" && <strong>Деловые Линии</strong>}
                                        {i?.delivery === "pek" && <strong>ПЭК</strong>}
                                        {i?.delivery === "pochta" && <strong>Почта России</strong>}
                                    <br />
                                    Адрес склада:&nbsp;
                                        {i?.delivery === "pickup" 
                                        ? <strong>{ADDRESS}</strong> 
                                        : <strong>{i?.address}</strong>} 
                                    {i?.state !== "forming" && i?.trackNumber !== null &&
                                    <>
                                        <br />
                                        Трек номер: {i?.trackNumber}
                                    </>
                                    }
                                    <hr />
                                </>}
                            </p>
                        )}
                    </div>
                </div>
            :
                <div>У Вас ещё нет заказов...</div>
            }
        </div>
    )
}

export default observer(OrdersInfo)
