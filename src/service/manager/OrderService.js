
import { useEffect, useState } from 'react'

import { getAllOrders } from '../../http/orderAPI'
import OneOrder from './OneOrder'

import './OrderService.css'


const OrderService = (props) => {

    const [ orders, setOrders ] = useState([])
    const [ oneOrder, setOneOrder ] = useState(null)

    useEffect(() => {
        getAllOrders().then(data => {
            if (data && data[0]) setOrders(data.reverse())
        })
    }, [])


    return (
        <div
            className="OrderService"
        >
            <div>

                {oneOrder 
                ?
                    <OneOrder order={oneOrder} back={() => setOneOrder(null)} />
                :
                <>
                    <button
                        className="btn btn-outline-success"
                        onClick={props.back}
                    >
                        Назад
                    </button>

                    <br /><br />

                    <h3>Заказы</h3>

                    {orders && orders[0] &&
                    <table>
                        <tr>
                            <td>#</td>
                            {/* <td>uuid</td> */}
                            {/* <td>Корзина</td> */}
                            <td>Доставка</td>
                            {/* <td>Адрес</td> */}
                            <td>Создал</td>
                            <td>Статус</td>
                            <td>Оплачено</td>
                            {/* <td>Клиент</td> */}
                            <td>Email</td>
                            {/* <td>Телефон</td> */}
                            {/* <td>Имя</td> */}
                            {/* <td>ТрекНомер</td> */}
                            <td></td>
                        </tr>
                        {orders.map(order => 
                        <tr>
                            <td>{order.id}</td>
                            {/* <td>{order.uuid}</td> */}
                            {/* <td>{order.cart}</td> */}
                            <td>
                                {order.delivery == "pickup" 
                                ? "Самовывоз"
                                : order.delivery == "del" 
                                ? "Деловые линии"
                                : order.delivery == "boxberry" 
                                ? "Боксбери"
                                : order.delivery == "sdek" 
                                ? "СДЕК"
                                : order.delivery == "pr"  
                                ? "Почта России"
                                : order.delivery}
                            </td>
                            {/* <td>{order.address}</td> */}
                            <td>{order.role}</td>
                            <td>
                                {order.state == "forming" 
                                ? "Сформирован"
                                : order.state == "confirmed" 
                                ? "Подтверждён"
                                : order.state == "onway" 
                                ? "В пути"
                                : order.state == "delivered" 
                                ? "Доставлен"
                                : order.state == "taken"  
                                ? "Получен"
                                : order.state}
                            </td>
                            <td>
                                {order.pay == 1 ? "Да" : "Нет"}
                            </td>
                            {/* <td>{order.client}</td> */}
                            <td>{order.email}</td>
                            {/* <td>{order.phone}</td>
                            <td>{order.name}</td>
                            <td>{order.trackNumber}</td> */}
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setOneOrder(order)}
                                >
                                    Подробнее
                                </button>
                            </td>
                        </tr>)
                        }
                    </table>
                    }
                </>
                }
            </div>
        </div>
    )
}

export default OrderService
