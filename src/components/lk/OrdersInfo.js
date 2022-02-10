import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { getOrderForUser, setTaken } from '../../http/orderAPI'

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

    const onClickButtonConfirm = async (id) => {
        setLoading(true)
        await setTaken(id)
            .then(data => {
                if (data.error === undefined) {
                    oders.map(i => {
                        if (i.id === id) return {...i, state: "taken"}
                        return i
                    })
                    alert("Статус заказа изменён!")
                }
            })
            .finally(() => setLoading(false))
    }

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
                                {i?.state === "delivered" && 
                                <>
                                    <strong>прибыл на склад.</strong>
                                    &nbsp;
                                    <button
                                        style={{borderRadius:"5px",padding:"5px 10px"}}
                                        onClick={() => onClickButtonConfirm(i.id)}
                                    >
                                        Подтвердить получение
                                    </button>
                                </>}
                                {i?.state === "taken" && <><strong>получен.</strong><hr /></>} 
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
