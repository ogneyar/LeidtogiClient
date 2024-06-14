
import { useState } from "react"


const OneOrder = (props) => {

    let totalAll = 0

    return (
        <div
            className="OrderService_OneOrder"
        >
            <div>
                
                <button
                    className="btn btn-outline-success"
                    onClick={props.back}
                >
                    Назад
                </button>

                <br /><br />

                <table>
                    <tr>
                        <td>Номер заказа</td>
                        <td>{props.order.id}</td>
                    </tr>
                    <tr>
                        <td>Уникальный идентификатор</td>
                        <td>{props.order.uuid}</td>
                    </tr>
                    <tr>
                        <td>Корзина</td>
                        <td>
                            
                            {JSON.parse(props.order.cart).map(item => {
                                let priceRub = item.itemPrice / 100
                                let total = priceRub * item.quantity.value

                                totalAll += total
                                
                                return (<>
                                    {item.positionId}&nbsp;
                                    {item.name} <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Количество:&nbsp;{item.quantity.value}&nbsp;{item.quantity.measure}<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Артикул:&nbsp;{item.itemCode} <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Цена за ед.:&nbsp;{priceRub}&nbsp;р.<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Итого:&nbsp;{total}&nbsp;р.<br />                                    
                                </>)
                            })}
                            ИТОГО:&nbsp;{totalAll}
                        </td>
                    </tr>
                    <tr>
                        <td>Доставка</td>
                        <td>
                                {props.order.delivery == "pickup" 
                                ? "Самовывоз"
                                : props.order.delivery == "del" 
                                ? "Деловые линии"
                                : props.order.delivery == "boxberry" 
                                ? "Боксбери"
                                : props.order.delivery == "sdek" 
                                ? "СДЕК"
                                : props.order.delivery == "pr"  
                                ? "Почта России"
                                : props.order.delivery}
                            </td>
                    </tr>
                    <tr>
                        <td>Адрес</td>
                        <td>{props.order.address}</td>
                    </tr>
                    <tr>
                        <td>Создал</td>
                        <td>{props.order.role}</td>
                    </tr>
                    <tr>
                        <td>Статус</td>
                        <td>
                            {props.order.state == "forming" 
                            ? "Сформирован"
                            : props.order.state == "confirmed" 
                            ? "Подтверждён"
                            : props.order.state == "onway" 
                            ? "В пути"
                            : props.order.state == "delivered" 
                            ? "Доставлен"
                            : props.order.state == "taken"  
                            ? "Получен"
                            : props.order.state}
                        </td>
                    </tr>
                    <tr>
                        <td>Оплачено</td>
                        <td>{props.order.pay == 1 ? "Да" : "Нет"}</td>
                    </tr>
                    <tr>
                        <td>№ клиента в БД</td>
                        <td>{props.order.client}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{props.order.email}</td>
                    </tr>
                    <tr>
                        <td>Телефон</td>
                        <td>{props.order.phone}</td>
                    </tr>
                    <tr>
                        <td>Имя</td>
                        <td>{props.order.name}</td>
                    </tr>
                    <tr>
                        <td>ТрекНомер</td>
                        <td>{props.order.trackNumber}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}



export default OneOrder
